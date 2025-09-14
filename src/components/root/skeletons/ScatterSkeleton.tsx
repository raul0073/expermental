import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ScatterSkeleton() {
  return (
    <div className='w-full flex flex-col justify-center items-start p-24  space-y-3'> 
    {/* eslint-disable-next-line */}
      {Array.from({length: 7}).map((i: any) => {
        return <Skeleton key={i} className='w-full rounded-xl h-60' />
      })}
    </div>
  )
}

export default ScatterSkeleton
