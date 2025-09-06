import { Skeleton } from "@/components/ui/skeleton";

export function LeaguePageSkeleton() {
   return (
    <div className='w-full h-screen flex flex-col px-4 py-6'>
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <div className='flex flex-col items-start mb-6'>
        <Skeleton className='w-1/3 h-12 rounded-md mb-2' />
        <Skeleton className='w-1/2 h-6 rounded-md' />
      </div>
      <div className="flex gap-3">
        <Skeleton className='w-12 h-12 rounded-md' />
        <Skeleton className='w-12 h-12 rounded-md' />
        <Skeleton className='w-12 h-12 rounded-md' />
        <Skeleton className='w-12 h-12 rounded-md' />
        <Skeleton className='w-12 h-12 rounded-md' />

      </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 flex-1 h-screen">
        {/* Team Mental Table */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Skeleton className='w-full h-96 rounded-md' />
        </div>

        {/* Best Eleven Plot */}
        <div className="col-span-1 md:col-span-6 lg:col-span-1">
          <Skeleton className='w-full h-96 rounded-md' />
        </div>

        {/* Player Mental Table */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Skeleton className='w-full h-96 rounded-md' />
        </div>

        {/* Teams Scatter Dashboard */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Skeleton className='w-full h-64 rounded-md' />
        </div>

        {/* Teams Radar Scatter */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <Skeleton className='w-full h-64 rounded-md' />
        </div>

        {/* Teams Stats Table */}
        <div className="col-span-1 md:col-span-2 lg:col-span-5">
          <Skeleton className='w-full h-64 rounded-md' />
        </div>
      </div>
    </div>
  )
}
