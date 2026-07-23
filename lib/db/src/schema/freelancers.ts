import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const freelancersTable = pgTable("freelancers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  skillCategory: text("skill_category").notNull(),
  location: text("location").notNull(),
  rateGhs: integer("rate_ghs").notNull(),
  bio: text("bio").notNull(),
  portfolioImageUrl: text("portfolio_image_url"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertFreelancerSchema = createInsertSchema(freelancersTable).omit({
  id: true,
  createdAt: true,
});
export type InsertFreelancer = z.infer<typeof insertFreelancerSchema>;
export type Freelancer = typeof freelancersTable.$inferSelect;
