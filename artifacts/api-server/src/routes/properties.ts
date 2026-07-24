import { Router, type IRouter } from "express";
import { ilike, or, eq, gte, lte, and, SQL } from "drizzle-orm";
import { db, propertiesTable } from "@workspace/db";
import { CreatePropertyBody, ListPropertiesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

function safeProperty(p: typeof propertiesTable.$inferSelect) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    location: p.location,
    monthlyRentGhs: p.monthlyRentGhs,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    amenities: p.amenities,
    landlordName: p.landlordName,
    landlordContact: p.landlordContact,
    photoUrl: p.photoUrl ?? null,
    availableDate: p.availableDate,
    createdAt: p.createdAt.toISOString(),
  };
}

router.get("/properties", async (req, res): Promise<void> => {
  const { search, location, minPrice, maxPrice, bedrooms } = req.query as {
    search?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
  };

  const conditions: SQL[] = [];

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    conditions.push(
      or(
        ilike(propertiesTable.title, term),
        ilike(propertiesTable.description, term),
        ilike(propertiesTable.location, term),
        ilike(propertiesTable.landlordName, term),
      )!,
    );
  }

  if (location && location.trim()) {
    conditions.push(ilike(propertiesTable.location, `%${location.trim()}%`));
  }

  if (minPrice) {
    const min = parseInt(minPrice, 10);
    if (!isNaN(min)) conditions.push(gte(propertiesTable.monthlyRentGhs, min));
  }

  if (maxPrice) {
    const max = parseInt(maxPrice, 10);
    if (!isNaN(max)) conditions.push(lte(propertiesTable.monthlyRentGhs, max));
  }

  if (bedrooms) {
    const beds = parseInt(bedrooms, 10);
    if (!isNaN(beds)) conditions.push(eq(propertiesTable.bedrooms, beds));
  }

  const rows =
    conditions.length > 0
      ? await db
          .select()
          .from(propertiesTable)
          .where(conditions.length === 1 ? conditions[0] : and(...conditions))
          .orderBy(propertiesTable.createdAt)
      : await db.select().from(propertiesTable).orderBy(propertiesTable.createdAt);

  res.json(ListPropertiesResponse.parse({ properties: rows.map(safeProperty) }));
});

router.post("/properties", async (req, res): Promise<void> => {
  const parsed = CreatePropertyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [property] = await db
    .insert(propertiesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json({ property: safeProperty(property) });
});

export default router;
