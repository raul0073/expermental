import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Footer() {
  const path = usePathname()
  const isEditorPage = path === '/editor'
  return (
    <footer className="w-full absolute bottom-0 bg-muted h-12 text-center font-semibold font-sans p-2 ">
				<div className='flex w-full justify-center gap-24 items-center'>
        <div>
         {!isEditorPage && (
           <Link href={'/editor'}>
           <Button variant={'link'}>
             Go to Editor Home
             <ArrowRight />
             </Button>
             </Link>
         )}
        </div>
        </div>
				</footer>
  )
}

export default Footer