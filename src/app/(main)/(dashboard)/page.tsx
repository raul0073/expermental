import DashboardSkeleton from "@/components/root/skeletons/PageSkeleton";
import { Suspense } from "react";
import DashboardPage from "./components/DashboardClientComp";

export default async function Page() {

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
}
