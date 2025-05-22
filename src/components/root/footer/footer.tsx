import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Footer() {
  const path = usePathname()
  const isEditorPage = path === '/editor'
  const isAnalysisBtnShow = path === '/editor/player' || path === '/editor/zone'
  return (
    <footer className="w-full absolute bottom-0 bg-muted h-12 text-center font-semibold font-sans p-2 ">
				<div className='flex w-full justify-center gap-24 items-center'>
        <div>
         {!isEditorPage && (
           <Link href={'/editor'}>
           <Button variant={'link'}>
            {`${isAnalysisBtnShow ? 'Back to editor home' : ' Go to editor home'}`}
            {isAnalysisBtnShow ?  <span><ArrowLeft /></span> : <span><ArrowRight /></span>}
            
             </Button>
             </Link>
         )}
        {/* { isAnalysisBtnShow && <AnalyzeTeamDialogComp />} */}
        </div>
        </div>
				</footer>
  )
}

export default Footer