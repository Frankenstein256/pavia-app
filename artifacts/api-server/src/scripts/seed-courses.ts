import { db, coursesTable, lessonsTable, quizQuestionsTable } from "@workspace/db";

const COURSES = [
  {
    title: "Personal Finance & Savings Mastery",
    description: "Build a strong financial foundation — learn budgeting, smart saving, emergency funds, and the basics of investing for young Ghanaians.",
    category: "Finance",
    level: "Beginner",
    durationHours: 3,
    instructor: "Abena Frimpong",
    coverImageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    certificatePriceGhs: 75,
    lessons: [
      {
        orderNum: 1,
        title: "Understanding Money and Budgeting",
        content: `Money is a tool — and like any tool, it works best when you know how to use it. A budget is simply a plan for your money. Without one, it's easy to reach the end of the month wondering where it all went.

The 50/30/20 rule is a simple starting point: allocate 50% of your take-home income to needs (rent, food, transport, utilities), 30% to wants (entertainment, dining out, subscriptions), and 20% to savings and debt repayment. For many Ghanaians living in cities like Accra or Kumasi, the cost of basic needs can be higher — so adjust the ratios to fit your reality, but always protect that savings slice.

Start by tracking every cedi you spend for 30 days. Use a notebook, a spreadsheet, or a free app. You'll quickly see patterns — often the small daily purchases (waakye, mobile data top-ups, impulse buys) add up to surprising amounts. Awareness is the first step to control.

Your budget should be written, reviewed monthly, and adjusted as your income or expenses change. A budget isn't a restriction — it's permission to spend on what matters to you without guilt.`,
      },
      {
        orderNum: 2,
        title: "Smart Saving Habits for Young Ghanaians",
        content: `The most powerful savings habit is simple: pay yourself first. Before you pay any bill or spend any cedi, transfer your savings amount the moment you receive income. If you wait until the end of the month to save "what's left," there's usually nothing left.

Automate where possible. Most Ghanaian banks allow standing orders — set one up to move a fixed amount to a savings account on payday. Out of sight, out of temptation.

For those with variable income — freelancers, traders, susu collectors — use a percentage rule instead of a fixed amount. Save 15% of every payment received, no matter how small. Consistency over time beats occasional large deposits.

Susu schemes (informal savings clubs) are a powerful cultural tool. If you participate, treat your weekly or monthly contribution as a non-negotiable expense. Better yet, combine susu savings with a formal bank account to get the discipline of the group and the security of the institution.

Set specific savings goals with amounts and deadlines. "Save GHS 5,000 for a laptop by December" is far more motivating than "save more money." Named, goal-based accounts help — many banks and mobile money platforms let you label savings pots.`,
      },
      {
        orderNum: 3,
        title: "Emergency Funds and Financial Safety Nets",
        content: `An emergency fund is money set aside exclusively for unexpected, unavoidable expenses — a medical emergency, sudden job loss, urgent car or home repair. It is not for holidays, sales, or "great opportunities." It is your financial shock absorber.

The target: 3 to 6 months of living expenses. If your monthly costs total GHS 3,000, aim for GHS 9,000–18,000 in liquid savings (accessible within 24–48 hours). This sounds large, but you build it gradually — starting with GHS 500 is infinitely better than nothing.

Keep your emergency fund in a separate account — ideally one that earns interest (a fixed-deposit or money-market account) but that you can still access quickly. The separation prevents you from raiding it for non-emergencies.

In Ghana, family obligations can function as informal safety nets, but relying solely on relatives creates stress for everyone. Having your own emergency fund protects both you and those you would otherwise turn to. It also gives you the confidence to say no to bad financial decisions made under pressure.

Once your emergency fund is fully funded, redirect those monthly contributions toward investment. The emergency fund is the foundation — everything else gets built on top of it.`,
      },
      {
        orderNum: 4,
        title: "Introduction to Investments",
        content: `Saving keeps your money safe. Investing makes it grow. Once you have an emergency fund in place, the next step is putting your money to work through investments that beat inflation.

Inflation in Ghana has historically run higher than savings account interest rates, meaning money sitting in a standard savings account is actually losing purchasing power over time. Investments aim to outpace inflation and build real wealth.

Common investment options for Ghanaians include: Treasury Bills (T-Bills) — safe government-backed instruments with predictable returns; unit trusts and mutual funds — pooled investments managed by professionals (accessible from as little as GHS 100 with providers like Databank, FirstBanc, or CalBank); and the Ghana Stock Exchange — buying shares in listed Ghanaian companies.

The golden rule of investing is diversification: don't put all your money in one place. Spread across asset types and don't invest money you might need within the next 12 months.

Start small and learn as you go. Many people delay investing because they feel they don't have "enough" money. The reality is that starting with GHS 200/month in a unit trust, consistently, for 10 years is far more powerful than waiting until you have GHS 10,000 to invest all at once. Time in the market beats timing the market.`,
      },
    ],
    quiz: [
      { orderNum: 1, question: "What percentage of income does the 50/30/20 rule recommend for savings?", optionA: "5%", optionB: "10%", optionC: "20%", optionD: "30%", correctOption: "c" },
      { orderNum: 2, question: "What is an emergency fund primarily for?", optionA: "Vacations and travel", optionB: "Unexpected, unavoidable expenses", optionC: "Buying luxury items", optionD: "Stock market investments", correctOption: "b" },
      { orderNum: 3, question: "What does 'pay yourself first' mean?", optionA: "Buy what you want before paying bills", optionB: "Save your money before spending on anything else", optionC: "Pay your salary before taxes", optionD: "Treat yourself to something nice monthly", correctOption: "b" },
      { orderNum: 4, question: "How many months of expenses should an emergency fund cover?", optionA: "1 month", optionB: "2 months", optionC: "3 to 6 months", optionD: "12 months", correctOption: "c" },
      { orderNum: 5, question: "Which of the following is a safe government-backed investment in Ghana?", optionA: "Susu scheme", optionB: "Savings account", optionC: "Treasury Bills (T-Bills)", optionD: "Foreign currency", correctOption: "c" },
    ],
  },
  {
    title: "Digital Marketing for Entrepreneurs",
    description: "Master online marketing to grow your business — from social media strategy and content creation to paid ads and measuring results.",
    category: "Marketing",
    level: "Intermediate",
    durationHours: 4,
    instructor: "Kweku Darko",
    coverImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    certificatePriceGhs: 100,
    lessons: [
      {
        orderNum: 1,
        title: "Building Your Online Presence",
        content: `Before you run a single ad or post a piece of content, you need a solid online foundation. Your online presence is the sum of everything people can find about you and your business when they search online — your website, social media profiles, Google listing, reviews, and content.

Start with a Google Business Profile (free). If you have a physical location or serve local customers, this is the most powerful first step. A verified Google listing means you appear in maps and local search results when people look for businesses like yours in your area.

Your social media profiles should be complete, consistent, and professional. Use the same logo, business name, and contact details across every platform. Incomplete profiles (missing bio, no profile photo, empty "about" section) signal untrustworthiness to potential customers.

Choose 1–2 platforms to focus on first rather than trying to maintain everywhere at once. For most Ghanaian businesses, Facebook and Instagram are the highest-return platforms because of audience size and the visual nature of commerce. WhatsApp Business is also essential for direct customer communication.

Your profile bio should answer three questions instantly: What do you do? Who do you serve? What should someone do next (your call to action)? Every word counts — you have seconds to make an impression.`,
      },
      {
        orderNum: 2,
        title: "Social Media Marketing Strategies",
        content: `Posting randomly and hoping for sales is not a strategy. Effective social media marketing requires a content plan, consistency, and a clear understanding of who you're talking to.

Start by defining your target audience in detail: age range, location, interests, problems they face, where they spend time online. The more specific you are, the better your content will perform. "Young professionals in Accra aged 25–35 who want to save money" is a target audience. "Everyone" is not.

Content types that consistently perform well: educational posts (tips and how-tos relevant to your audience), behind-the-scenes content (showing your process, team, workspace — builds trust), testimonials and reviews (social proof is powerful), and entertaining content (relatable humour or stories that align with your brand).

The algorithm rewards consistency. Posting 3 times a week every week outperforms posting 20 times in one week and then going silent. Create a simple content calendar — even a weekly WhatsApp reminder to post works. Batch-create content when you have energy and schedule it.

Engagement matters more than follower count. Respond to every comment and direct message, especially in your early days. Algorithms surface content with high engagement, and real conversations build the loyal community that eventually becomes loyal customers.`,
      },
      {
        orderNum: 3,
        title: "Email Marketing and Customer Retention",
        content: `Your email list is the only online audience you truly own. Social media platforms can change their algorithm, delete your account, or shut down — and your followers are gone. An email list stays with you.

Start collecting emails from day one. Offer something valuable in exchange — a discount, a useful PDF guide, early access to products, a free consultation. Your website contact form, WhatsApp broadcast list export, and checkout process are all collection points.

A simple email marketing structure for small businesses: a welcome email immediately after someone subscribes (introduce yourself and deliver the promised value), a monthly newsletter (useful content + business updates), and promotional emails for launches and sales (no more than once or twice a month).

Write emails like a human being writing to one person, not a corporation broadcasting to thousands. Use their first name. Tell a relevant story. Be clear about what you want them to do next (the call to action — click, buy, reply, share).

Customer retention is more profitable than acquisition. It costs 5–7× more to win a new customer than to keep an existing one. Use email to stay top-of-mind with past customers through check-ins, exclusive offers for returning customers, and genuinely helpful content that makes their lives better.`,
      },
      {
        orderNum: 4,
        title: "Paid Advertising and Measuring Success",
        content: `Organic (free) content builds long-term trust and community. Paid advertising accelerates reach and drives immediate action. The two work best together — don't try to use paid ads to replace good content.

Facebook and Instagram ads offer the most powerful targeting available to small businesses: demographics, interests, behaviours, location down to a specific city or radius, and "lookalike audiences" that find people similar to your best customers. Start with a small budget — GHS 50–100/week is enough to learn what works before scaling.

The most important principle in paid advertising: test, measure, optimise. Never run one ad and give up if it doesn't work. Test different images, different headlines, different audiences — run them simultaneously and let data tell you what performs.

Key metrics to track: Click-Through Rate (CTR) — what percentage of people who saw your ad clicked it; Cost Per Click (CPC) — how much you pay each time someone clicks; Conversion Rate — of people who clicked, how many completed the goal (purchase, sign-up); Return on Ad Spend (ROAS) — for every GHS spent, how many GHS in revenue did you generate.

Use Google Analytics (free) on your website and Facebook Pixel on your site to track what happens after people click your ads. Without tracking, you're flying blind. With tracking, you can continuously improve results and grow profitably.`,
      },
      {
        orderNum: 5,
        title: "Search Engine Optimisation (SEO) Basics",
        content: `SEO is the practice of making your website appear higher in search results when people search for terms related to your business. Unlike paid ads, SEO generates ongoing free traffic — but it takes time (typically 3–6 months to see significant results).

Search engines like Google rank content based on relevance and authority. Relevance means your content closely matches what the searcher is looking for. Authority means other reputable websites link to yours, signalling that your content is trustworthy.

For local businesses, local SEO is the highest priority. Optimise your Google Business Profile, gather positive reviews, ensure your name/address/phone number (NAP) is identical everywhere online, and create content that mentions your local area (e.g., "best graphic designer in Accra").

On-page SEO basics: every page should have a clear title tag (the headline shown in search results) containing your main keyword, a meta description (the summary shown below the title), and headings that naturally include relevant terms. Your content should answer real questions your customers ask.

Content marketing fuels SEO. A blog that answers the questions your customers search for brings people to your website before they even know your brand exists. "How to save for a house in Ghana," "What does a brand designer charge in Accra?" — articles like these can rank on Google and drive targeted visitors to your business for years.`,
      },
    ],
    quiz: [
      { orderNum: 1, question: "What does SEO stand for?", optionA: "Social Engagement Operations", optionB: "Search Engine Optimisation", optionC: "Sales and Email Outreach", optionD: "Site Engagement Overview", correctOption: "b" },
      { orderNum: 2, question: "What is the advantage of an email list over social media followers?", optionA: "It's cheaper to grow", optionB: "You own and control it — it can't be taken away by algorithm changes", optionC: "It reaches more people", optionD: "It costs nothing to send emails", correctOption: "b" },
      { orderNum: 3, question: "What does CTA stand for in marketing?", optionA: "Cost to Acquire", optionB: "Customer Target Analysis", optionC: "Call to Action", optionD: "Content Traffic Analytics", correctOption: "c" },
      { orderNum: 4, question: "Which metric tells you how much revenue you generate for every GHS spent on ads?", optionA: "CTR", optionB: "CPC", optionC: "Conversion Rate", optionD: "ROAS", correctOption: "d" },
      { orderNum: 5, question: "Why is customer retention important?", optionA: "It's cheaper than acquiring new customers", optionB: "New customers are too difficult to find", optionC: "Social media algorithms favour returning visitors", optionD: "It's required by Ghanaian law", correctOption: "a" },
    ],
  },
  {
    title: "Business Fundamentals for Startups",
    description: "Everything you need to start and run a successful business in Ghana — from writing a business plan to managing cash flow and building a team.",
    category: "Business",
    level: "Beginner",
    durationHours: 3,
    instructor: "Adwoa Sarpong",
    coverImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    certificatePriceGhs: 75,
    lessons: [
      {
        orderNum: 1,
        title: "Writing a Business Plan That Works",
        content: `A business plan is a written document that describes your business, its goals, how it will operate, and how it will make money. It doesn't need to be 50 pages long — a focused 5–10 page plan is more useful than a bloated document no one reads.

The essential sections: Executive Summary (a one-page overview of your entire business — write this last); Business Description (what you do, your mission, your legal structure, your location); Market Analysis (who your customers are, how big the market is, who your competitors are); Products and Services (what you sell and why customers will buy it from you); Marketing Plan (how you'll reach and convert customers); Operations Plan (how you'll deliver your product or service day to day); Financial Projections (your expected revenue, costs, and profit for the next 12–24 months).

The most valuable part of writing a business plan is not the document itself — it's the thinking process. When you're forced to write down your assumptions about customers, costs, and revenue, you discover the gaps in your thinking before they become expensive mistakes.

Revisit and update your business plan at least annually, or whenever something significant changes — a new competitor enters the market, your target customer shifts, or you pivot your product. A plan is a living document, not a one-time school assignment.

Your financial projections should be realistic and evidence-based, not aspirational. Use actual data wherever possible: supplier quotes, competitor pricing, industry benchmarks. Investors and lenders can smell wishful thinking immediately.`,
      },
      {
        orderNum: 2,
        title: "Understanding Your Market and Customers",
        content: `The graveyard of failed businesses is full of products that people didn't want. Market research is how you find out what people actually want before you invest your money in building it.

Primary research means going directly to potential customers: surveys, interviews, observation. Spend 10 hours talking to 15–20 people who represent your target customer. Ask about their problems, what they currently use, what they wish existed, and how much they'd pay. Listen more than you talk.

Secondary research uses existing data: government statistics, industry reports, competitor websites, social media listening. In Ghana, the Ghana Statistical Service, the Association of Ghana Industries, and sector-specific bodies publish useful data.

Define your target market with precision. Demographics (age, gender, income, location), psychographics (values, lifestyle, interests), and behaviours (how they currently solve this problem, where they shop) all matter. Trying to serve everyone means serving no one well.

Competitive analysis is not about copying competitors — it's about understanding the landscape so you can position your business distinctly. For every competitor, identify: What do they do well? Where do they fall short? What gap exists that you could fill? "Better" is not a differentiation strategy. "Better at X for Y customers" is.

Validate your assumptions with small experiments before big investments. Sell 10 units before you manufacture 1,000. Run a waitlist before you build the product. Real customer behaviour is more reliable than any survey.`,
      },
      {
        orderNum: 3,
        title: "Managing Business Finances",
        content: `The number-one reason small businesses fail in Ghana — and everywhere — is cash flow problems. Not lack of profit, but running out of cash while waiting for money to come in. Understanding the difference between profit and cash flow is fundamental.

Profit is what's left after revenue minus costs. Cash flow is the movement of money in and out of your business in real time. A business can be "profitable" on paper but still unable to pay its suppliers because customers are slow to pay.

Separate your business finances from your personal finances from day one. Open a dedicated business bank account. This isn't just good practice — it's essential for understanding how your business is actually performing, for tax purposes, and for credibility with banks and investors.

Track every business income and expense. At minimum, maintain a simple spreadsheet: date, description, amount in, amount out, running balance. Review it weekly. Know your numbers at all times.

Three financial statements every business owner should understand: the Profit & Loss (P&L) statement shows revenue and expenses over a period; the Balance Sheet shows what you own, what you owe, and net worth at a point in time; the Cash Flow Statement shows money flowing in and out over time. Most accounting software (including free options like Wave) generates these automatically.

Price your products and services properly. Cost-plus pricing (materials + labour + overhead + profit margin) is the foundation. Also check competitor pricing and assess what customers are willing to pay. Underpricing is more dangerous than most entrepreneurs realise — it creates unsustainable businesses and devalues the entire market.`,
      },
      {
        orderNum: 4,
        title: "Building and Leading a Team",
        content: `You cannot scale a business alone. At some point, growth requires hiring people — and how you hire, manage, and retain them will determine whether your business thrives or stagnates.

Hire for attitude and cultural fit as much as skill. Skills can be taught; work ethic, integrity, and alignment with your values are much harder to instil. In early-stage businesses especially, a highly skilled person with poor attitude can destroy what you've built.

Write a clear job description before every hire. What are the core responsibilities? What outcomes will define success in this role? What skills and experience are required vs. nice-to-have? Clarity in the job description leads to better candidates and fewer hiring mistakes.

Onboarding matters. Don't hire someone and immediately leave them to figure things out. Invest time in the first 30–90 days: clear expectations, regular check-ins, training on your processes. The investment pays off in faster productivity and lower turnover.

Build a culture intentionally. Culture is not perks or a fun office — it's how decisions get made when you're not in the room. Define your values, live them visibly, reward behaviour that exemplifies them, and address quickly when they're violated.

In Ghana's business environment, consider starting with contractors or part-time staff before full-time hires. This lets you test fit and manage cash flow more flexibly. Always formalise working relationships in writing — even simple employment letters protect both sides.`,
      },
    ],
    quiz: [
      { orderNum: 1, question: "What is an MVP in the context of startups?", optionA: "Most Valuable Professional", optionB: "Maximum Viable Plan", optionC: "Minimum Viable Product", optionD: "Market Value Proposition", correctOption: "c" },
      { orderNum: 2, question: "What is the main difference between profit and cash flow?", optionA: "Profit is always higher than cash flow", optionB: "Profit is revenue minus costs; cash flow is actual money moving in and out of the business", optionC: "Cash flow is the same as profit but monthly", optionD: "There is no difference", correctOption: "b" },
      { orderNum: 3, question: "Why should you separate business and personal bank accounts?", optionA: "Banks require it by law", optionB: "To understand business performance, simplify taxes, and build credibility", optionC: "To avoid paying income tax", optionD: "Personal accounts charge higher fees", correctOption: "b" },
      { orderNum: 4, question: "When writing a business plan, which section should you write LAST?", optionA: "Market Analysis", optionB: "Financial Projections", optionC: "Executive Summary", optionD: "Operations Plan", correctOption: "c" },
      { orderNum: 5, question: "Which is NOT a key financial statement for business owners?", optionA: "Profit & Loss (P&L) statement", optionB: "Balance Sheet", optionC: "Personal Tax Return", optionD: "Cash Flow Statement", correctOption: "c" },
    ],
  },
];

async function seed() {
  const existing = await db.select().from(coursesTable);
  if (existing.length > 0) {
    console.log(`Skipping seed — ${existing.length} courses already in database.`);
    process.exit(0);
  }

  for (const courseData of COURSES) {
    const { lessons, quiz, ...courseFields } = courseData;

    const [course] = await db.insert(coursesTable).values(courseFields).returning();
    console.log(`Created course: ${course.title} (id: ${course.id})`);

    for (const lesson of lessons) {
      await db.insert(lessonsTable).values({ ...lesson, courseId: course.id });
    }
    console.log(`  → ${lessons.length} lessons`);

    for (const q of quiz) {
      await db.insert(quizQuestionsTable).values({ ...q, courseId: course.id });
    }
    console.log(`  → ${quiz.length} quiz questions`);
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
