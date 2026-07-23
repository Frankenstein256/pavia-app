import { db, freelancersTable } from "@workspace/db";

const SEED_FREELANCERS = [
  {
    name: "Abena Owusu",
    skillCategory: "Brand Identity",
    location: "Accra",
    rateGhs: 350,
    bio: "I craft brand identities that stick. 6+ years working with startups and established businesses across Ghana.",
    portfolioImageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    email: "abena.owusu@example.com",
    phone: "0201234567",
  },
  {
    name: "Kweku Asante",
    skillCategory: "Motion & Video",
    location: "Accra",
    rateGhs: 480,
    bio: "Award-winning motion designer. I turn ideas into scroll-stopping visuals for brands, music artists, and agencies.",
    portfolioImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    email: "kweku.asante@example.com",
    phone: "0551234567",
  },
  {
    name: "Efua Mensah",
    skillCategory: "Illustration",
    location: "Kumasi",
    rateGhs: 280,
    bio: "Afrocentric illustrations for publishing, packaging, and digital media. My work celebrates African stories.",
    portfolioImageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80",
    email: "efua.mensah@example.com",
    phone: "0241234567",
  },
  {
    name: "Nana Kofi Boateng",
    skillCategory: "UI / UX",
    location: "Accra",
    rateGhs: 420,
    bio: "Product designer for mobile and web. I have shipped apps used by 50,000+ Ghanaians. Clean, purposeful design.",
    portfolioImageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80",
    email: "nana.boateng@example.com",
    phone: "0271234567",
  },
  {
    name: "Adwoa Darko",
    skillCategory: "Photography",
    location: "Accra",
    rateGhs: 600,
    bio: "Commercial photographer specialising in lifestyle, product, and portrait work for brands across West Africa.",
    portfolioImageUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80",
    email: "adwoa.darko@example.com",
    phone: "0231234567",
  },
  {
    name: "Yaw Amponsah",
    skillCategory: "Graphic Design",
    location: "Tema",
    rateGhs: 220,
    bio: "Fast, reliable, detail-obsessed. From flyers to full brand kits — I deliver quality work on tight deadlines.",
    portfolioImageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    email: "yaw.amponsah@example.com",
    phone: "0261234567",
  },
];

async function seed() {
  const existing = await db.select().from(freelancersTable);
  if (existing.length > 0) {
    console.log(`Skipping seed — ${existing.length} freelancers already in database.`);
    process.exit(0);
  }

  await db.insert(freelancersTable).values(SEED_FREELANCERS);
  console.log(`Seeded ${SEED_FREELANCERS.length} freelancers.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
