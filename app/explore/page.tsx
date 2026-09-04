import { Suspense } from "react";
import { getAllOpportunities } from "@/lib/opportunities";
import ExploreClient from "./ExploreClient";

export const metadata = {
  title: "Explore Opportunities — SCOUT",
};

export default function ExplorePage() {
  const opportunities = getAllOpportunities();
  return (
    <Suspense fallback={null}>
      <ExploreClient opportunities={opportunities} />
    </Suspense>
  );
}
