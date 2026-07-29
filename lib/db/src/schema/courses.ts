import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const coursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  durationHours: integer("duration_hours").notNull(),
  instructor: text("instructor").notNull(),
  coverImageUrl: text("cover_image_url"),
  certificatePriceGhs: integer("certificate_price_ghs").notNull().default(75),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const lessonsTable = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  orderNum: integer("order_num").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const quizQuestionsTable = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  orderNum: integer("order_num").notNull().default(0),
  question: text("question").notNull(),
  optionA: text("option_a").notNull(),
  optionB: text("option_b").notNull(),
  optionC: text("option_c").notNull(),
  optionD: text("option_d").notNull(),
  correctOption: text("correct_option").notNull(), // 'a' | 'b' | 'c' | 'd'
});

export const userCourseProgressTable = pgTable("user_course_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  completedLessonIds: text("completed_lesson_ids").notNull().default(""),
  quizScore: integer("quiz_score"),
  quizPassed: boolean("quiz_passed").notNull().default(false),
  certificatePurchased: boolean("certificate_purchased").notNull().default(false),
  certificateName: text("certificate_name"),
  certificateId: text("certificate_id"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Course = typeof coursesTable.$inferSelect;
export type Lesson = typeof lessonsTable.$inferSelect;
export type QuizQuestion = typeof quizQuestionsTable.$inferSelect;
export type UserCourseProgress = typeof userCourseProgressTable.$inferSelect;
