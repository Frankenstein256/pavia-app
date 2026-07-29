import { Router, type IRouter, type Request, type Response } from "express";
import { eq, and, count } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import {
  db,
  coursesTable,
  lessonsTable,
  quizQuestionsTable,
  userCourseProgressTable,
} from "@workspace/db";

const router: IRouter = Router();

/* ── helpers ─────────────────────────────────────────────────────────── */
function requireAuth(req: Request, res: Response): number | null {
  const userId = (req.session as { userId?: number }).userId;
  if (!userId) {
    res.status(401).json({ error: "Not authenticated." });
    return null;
  }
  return userId;
}

/* ── GET /courses ────────────────────────────────────────────────────── */
router.get("/courses", async (_req, res): Promise<void> => {
  const courses = await db.select().from(coursesTable).orderBy(coursesTable.createdAt);

  // get lesson counts
  const counts = await db
    .select({ courseId: lessonsTable.courseId, cnt: count() })
    .from(lessonsTable)
    .groupBy(lessonsTable.courseId);
  const countMap = Object.fromEntries(counts.map((r) => [r.courseId, r.cnt]));

  res.json({
    courses: courses.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      level: c.level,
      durationHours: c.durationHours,
      instructor: c.instructor,
      coverImageUrl: c.coverImageUrl ?? null,
      certificatePriceGhs: c.certificatePriceGhs,
      lessonCount: countMap[c.id] ?? 0,
      createdAt: c.createdAt.toISOString(),
    })),
  });
});

/* ── GET /courses/:id ────────────────────────────────────────────────── */
router.get("/courses/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id." }); return; }

  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, id));
  if (!course) { res.status(404).json({ error: "Course not found." }); return; }

  const lessons = await db
    .select()
    .from(lessonsTable)
    .where(eq(lessonsTable.courseId, id))
    .orderBy(lessonsTable.orderNum);

  // quiz questions without correctOption
  const rawQuestions = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.courseId, id))
    .orderBy(quizQuestionsTable.orderNum);

  const quizQuestions = rawQuestions.map(({ correctOption: _co, ...q }) => q);

  res.json({
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      durationHours: course.durationHours,
      instructor: course.instructor,
      coverImageUrl: course.coverImageUrl ?? null,
      certificatePriceGhs: course.certificatePriceGhs,
      lessonCount: lessons.length,
      createdAt: course.createdAt.toISOString(),
      lessons: lessons.map((l) => ({
        id: l.id,
        courseId: l.courseId,
        orderNum: l.orderNum,
        title: l.title,
        content: l.content,
        createdAt: l.createdAt.toISOString(),
      })),
      quizQuestions,
    },
  });
});

/* ── GET /courses/:id/progress ───────────────────────────────────────── */
router.get("/courses/:id/progress", async (req, res): Promise<void> => {
  const userId = requireAuth(req, res);
  if (!userId) return;
  const courseId = parseInt(req.params.id, 10);
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid id." }); return; }

  const [row] = await db
    .select()
    .from(userCourseProgressTable)
    .where(
      and(
        eq(userCourseProgressTable.userId, userId),
        eq(userCourseProgressTable.courseId, courseId),
      ),
    );

  res.json({ progress: row ? safeProgress(row) : null });
});

/* ── POST /courses/:id/progress ──────────────────────────────────────── */
router.post("/courses/:id/progress", async (req, res): Promise<void> => {
  const userId = requireAuth(req, res);
  if (!userId) return;
  const courseId = parseInt(req.params.id, 10);
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid id." }); return; }

  const { completedLessonIds } = req.body as { completedLessonIds?: string };
  if (typeof completedLessonIds !== "string") {
    res.status(400).json({ error: "completedLessonIds is required." });
    return;
  }

  const [existing] = await db
    .select()
    .from(userCourseProgressTable)
    .where(
      and(
        eq(userCourseProgressTable.userId, userId),
        eq(userCourseProgressTable.courseId, courseId),
      ),
    );

  let row;
  if (existing) {
    [row] = await db
      .update(userCourseProgressTable)
      .set({ completedLessonIds, updatedAt: new Date() })
      .where(eq(userCourseProgressTable.id, existing.id))
      .returning();
  } else {
    [row] = await db
      .insert(userCourseProgressTable)
      .values({ userId, courseId, completedLessonIds })
      .returning();
  }

  res.json({ progress: safeProgress(row) });
});

/* ── POST /courses/:id/quiz ──────────────────────────────────────────── */
router.post("/courses/:id/quiz", async (req, res): Promise<void> => {
  const userId = requireAuth(req, res);
  if (!userId) return;
  const courseId = parseInt(req.params.id, 10);
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid id." }); return; }

  const { answers } = req.body as {
    answers?: { questionId: number; answer: string }[];
  };
  if (!Array.isArray(answers)) {
    res.status(400).json({ error: "answers array is required." });
    return;
  }

  const questions = await db
    .select()
    .from(quizQuestionsTable)
    .where(eq(quizQuestionsTable.courseId, courseId));

  let correct = 0;
  for (const a of answers) {
    const q = questions.find((q) => q.id === a.questionId);
    if (q && q.correctOption === a.answer) correct++;
  }

  const total = questions.length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = score >= 70;

  // upsert progress with quiz result
  const [existing] = await db
    .select()
    .from(userCourseProgressTable)
    .where(
      and(
        eq(userCourseProgressTable.userId, userId),
        eq(userCourseProgressTable.courseId, courseId),
      ),
    );

  if (existing) {
    await db
      .update(userCourseProgressTable)
      .set({ quizScore: score, quizPassed: passed, updatedAt: new Date() })
      .where(eq(userCourseProgressTable.id, existing.id));
  } else {
    await db
      .insert(userCourseProgressTable)
      .values({ userId, courseId, completedLessonIds: "", quizScore: score, quizPassed: passed });
  }

  res.json({ result: { score: correct, total, passed } });
});

/* ── POST /courses/:id/certificate ──────────────────────────────────── */
router.post("/courses/:id/certificate", async (req, res): Promise<void> => {
  const userId = requireAuth(req, res);
  if (!userId) return;
  const courseId = parseInt(req.params.id, 10);
  if (isNaN(courseId)) { res.status(400).json({ error: "Invalid id." }); return; }

  const { name, paymentReference } = req.body as { name?: string; paymentReference?: string };
  if (!name || !paymentReference) {
    res.status(400).json({ error: "name and paymentReference are required." });
    return;
  }

  const [progress] = await db
    .select()
    .from(userCourseProgressTable)
    .where(
      and(
        eq(userCourseProgressTable.userId, userId),
        eq(userCourseProgressTable.courseId, courseId),
      ),
    );

  if (!progress?.quizPassed) {
    res.status(400).json({ error: "You must pass the quiz before claiming a certificate." });
    return;
  }

  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId));
  if (!course) { res.status(404).json({ error: "Course not found." }); return; }

  const certificateId = progress.certificateId ?? randomUUID().toUpperCase().slice(0, 16);
  const issuedAt = new Date().toISOString();

  await db
    .update(userCourseProgressTable)
    .set({
      certificatePurchased: true,
      certificateName: name.trim(),
      certificateId,
      updatedAt: new Date(),
    })
    .where(eq(userCourseProgressTable.id, progress.id));

  res.json({
    certificate: {
      certificateId,
      courseTitle: course.title,
      recipientName: name.trim(),
      instructor: course.instructor,
      issuedAt,
    },
  });
});

/* ── util ────────────────────────────────────────────────────────────── */
function safeProgress(p: typeof userCourseProgressTable.$inferSelect) {
  return {
    id: p.id,
    userId: p.userId,
    courseId: p.courseId,
    completedLessonIds: p.completedLessonIds,
    quizScore: p.quizScore ?? null,
    quizPassed: p.quizPassed,
    certificatePurchased: p.certificatePurchased,
    certificateName: p.certificateName ?? null,
    certificateId: p.certificateId ?? null,
    updatedAt: p.updatedAt.toISOString(),
  };
}

export default router;
