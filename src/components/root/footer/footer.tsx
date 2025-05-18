import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="w-full absolute bottom-0 bg-muted h-12 text-center font-semibold font-sans p-2 ">
				<div className='flex w-full justify-center gap-24 items-center'>
        <div>
          <Link href={'/editor'}>
          <Button variant={'link'}>
            Go to Editor
            <ArrowRight />
            </Button>
            </Link>
        </div>
        </div>
				</footer>
  )
}

export default Footer