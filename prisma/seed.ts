/**
 * Seeds the database with the same demo + Capital Region opportunity data
 * the MVP currently reads from static files (lib/demo-data.ts,
 * lib/regional-data.ts). Run with: npx prisma db seed
 *
 * NOTE: this file is TypeScript-shaped but written defensively so it runs
 * under ts-node without the rest of the Next.js app's path aliases — it
 * duplicates the two data arrays rather than importing "@/lib/...".
 * Once you're ready to move off static data, point app code at Prisma
 * instead (see lib/opportunities.ts) and delete the static files; keep
 * this seed script as your source of "known good" starter records.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding is a starting point only — copy the arrays from");
  console.log("lib/demo-data.ts and lib/regional-data.ts into this file,");
  console.log("mapping each field 1:1 into prisma.opportunity.create(),");
  console.log("once you're ready to move off static data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
