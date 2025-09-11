import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";
import { Suspense } from "react";
import DashboardPage from "./components/DashboardClientComp";
import { generateMetadata } from "./utils/metadata";

export default async function Page() {
generateMetadata({ type: "dashboard" });
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
}
