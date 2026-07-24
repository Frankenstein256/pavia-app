import { db, propertiesTable } from "@workspace/db";

const SEED_PROPERTIES = [
  {
    title: "Modern 2-Bedroom Apartment in East Legon",
    description:
      "Bright, newly renovated apartment in a quiet residential estate. Open-plan living area, fitted kitchen, and secure parking. Walking distance to East Legon shops and restaurants.",
    location: "East Legon, Accra",
    monthlyRentGhs: 3200,
    bedrooms: 2,
    bathrooms: 2,
    amenities: "WiFi,Air Conditioning,Parking,Security,Water Heater",
    landlordName: "Kwame Boateng",
    landlordContact: "0244123456",
    photoUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    availableDate: "2026-08-01",
  },
  {
    title: "Spacious 3-Bedroom House in Tema Community 25",
    description:
      "Family home with a large compound, covered veranda, and separate boys' quarters. Close to Tema Market and major roads. Ideal for families seeking space and community.",
    location: "Tema, Accra",
    monthlyRentGhs: 2800,
    bedrooms: 3,
    bathrooms: 2,
    amenities: "Parking,Security,Compound,Boys Quarters,Generator",
    landlordName: "Akosua Mensah",
    landlordContact: "0201987654",
    photoUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    availableDate: "2026-08-15",
  },
  {
    title: "Cosy Studio in Cantonments",
    description:
      "Compact and fully furnished studio perfect for young professionals. Gated compound, 24-hour security, and reliable water supply. 10 minutes from the Airport City business district.",
    location: "Cantonments, Accra",
    monthlyRentGhs: 1800,
    bedrooms: 1,
    bathrooms: 1,
    amenities: "Furnished,WiFi,Security,Water,Air Conditioning",
    landlordName: "Yaw Tetteh",
    landlordContact: "0271345678",
    photoUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    availableDate: "2026-07-25",
  },
];

async function seed() {
  const existing = await db.select().from(propertiesTable);
  if (existing.length > 0) {
    console.log(`Skipping seed — ${existing.length} properties already in database.`);
    process.exit(0);
  }
  await db.insert(propertiesTable).values(SEED_PROPERTIES);
  console.log(`Seeded ${SEED_PROPERTIES.length} properties.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
