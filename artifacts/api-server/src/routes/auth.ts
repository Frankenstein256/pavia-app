import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import {
  SignupBody,
  LoginBody,
  LoginResponse,
  GetMeResponse,
  LogoutResponse,
} from "@workspace/api-zod";
import { hashPassword, verifyPassword } from "../lib/password";

const router: IRouter = Router();

function safeUser(user: typeof usersTable.$inferSelect) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt.toISOString(),
  };
}

router.post("/auth/signup", async (req, res): Promise<void> => {
  const parsed = SignupBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, email, phone, password } = parsed.data;

  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()));

  if (existing.length > 0) {
    res.status(409).json({ error: "An account with that email already exists." });
    return;
  }

  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(usersTable)
    .values({ fullName, email: email.toLowerCase(), phone, passwordHash })
    .returning();

  req.session.userId = user.id;

  res.status(201).json(LoginResponse.parse({ user: safeUser(user) }));
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase()));

  if (!user) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  req.session.userId = user.id;

  res.json(LoginResponse.parse({ user: safeUser(user) }));
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const userId = req.session.userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated." });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  if (!user) {
    req.session.destroy(() => {});
    res.status(401).json({ error: "Not authenticated." });
    return;
  }

  res.json(GetMeResponse.parse({ user: safeUser(user) }));
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Failed to log out." });
      return;
    }
    res.clearCookie("connect.sid");
    res.json(LogoutResponse.parse({ message: "Logged out." }));
  });
});

export default router;
