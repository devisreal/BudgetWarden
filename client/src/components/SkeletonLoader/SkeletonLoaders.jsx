import { Skeleton } from "../ui/skeleton";

export function DashboardSkeletonLoader() {
  return (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex space-y-3 gap-6 flex-wrap">
        <div className="space-y-3 w-full sm:w-auto">
          <Skeleton className="h-[140px]  rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="space-y-3 w-full sm:w-auto">
          <Skeleton className="h-[140px]  rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="space-y-3 w-full sm:w-auto">
          <Skeleton className="h-[140px]  rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="space-y-3 w-full sm:w-auto">
          <Skeleton className="h-[140px]  rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="space-y-3 w-full sm:w-auto">
          <Skeleton className="h-[140px]  rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      <Skeleton className="w-full h-[35vh] rounded-lg" />
    </div>
  );
}

export function BillsSkeletonLoader() {
  return (
    <ul>
      <li className="flex gap-4 p-4 w-full justify-between">
        <div className="flex gap-4 md:w-2/3">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="space-y-3 w-full">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <Skeleton className="h-10 w-20 hidden sm:inline rounded-lg" />
      </li>
      <li className="flex gap-4 p-4 w-full justify-between">
        <div className="flex gap-4 md:w-2/3">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="space-y-3 w-full">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
        <Skeleton className="h-10 w-20 hidden sm:inline rounded-lg" />
      </li>
    </ul>
  );
}
