import { Router, type IRouter } from "express";
import { ilike, or, eq, and } from "drizzle-orm";
import { db, freelancersTable } from "@workspace/db";
import {
  CreateFreelancerBody,
  ListFreelancersResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function safeFreelancer(f: typeof freelancersTable.$inferSelect) {
  return {
    id: f.id,
    name: f.name,
    skillCategory: f.skillCategory,
    location: f.location,
    rateGhs: f.rateGhs,
    bio: f.bio,
    portfolioImageUrl: f.portfolioImageUrl ?? null,
    email: f.email,
    phone: f.phone,
    createdAt: f.createdAt.toISOString(),
  };
}

router.get("/freelancers", async (req, res): Promise<void> => {
  const { search, category } = req.query as { search?: string; category?: string };

  const conditions = [];

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    conditions.push(
      or(
        ilike(freelancersTable.name, term),
        ilike(freelancersTable.skillCategory, term),
        ilike(freelancersTable.location, term),
        ilike(freelancersTable.bio, term),
      ),
    );
  }

  if (category && category !== "All Skills") {
    conditions.push(eq(freelancersTable.skillCategory, category));
  }

  const rows =
    conditions.length > 0
      ? await db
          .select()
          .from(freelancersTable)
          .where(conditions.length === 1 ? conditions[0] : and(...conditions))
          .orderBy(freelancersTable.createdAt)
      : await db
          .select()
          .from(freelancersTable)
          .orderBy(freelancersTable.createdAt);

  res.json(ListFreelancersResponse.parse({ freelancers: rows.map(safeFreelancer) }));
});

router.post("/freelancers", async (req, res): Promise<void> => {
  const parsed = CreateFreelancerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [freelancer] = await db
    .insert(freelancersTable)
    .values(parsed.data)
    .returning();

  res.status(201).json({ freelancer: safeFreelancer(freelancer) });
});

export default router;
