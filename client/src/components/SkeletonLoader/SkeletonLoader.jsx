import { Skeleton } from "../ui/skeleton";

export default function SkeletonLoader() {
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
