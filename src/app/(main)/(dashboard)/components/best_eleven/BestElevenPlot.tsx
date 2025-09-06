import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Player } from '../../utils/types'
//eslint-disable-next-line
function BestElevenPlot({plotImg, className, subs}: {plotImg: string, className?:string, subs:any[]}) {
  return (
   <Card className={cn("h-fit", className)}>
      <CardHeader className="p-1 md:p-6 h-[100px]">
        <CardTitle>Top 5 Leagues Best XI</CardTitle>
            <CardDescription>
                Ranking best eleven by mental score
            </CardDescription>
        </CardHeader>
        <CardContent className='p-1'>
            <div className='w-full h-full   p-4'>
      <Image
  src={`data:image/png;base64,${plotImg}`} 
  alt="Best XI formation" 
  width={400} 
  height={600} 
  className='object-contain h-auto w-fit'
/>
    </div>
        </CardContent>
        <CardFooter>
            <ol type='1'>
              {
                subs.map((p: Player, i:number) => {
                  return <li key={p.name} className='text-sm'>{i+1}. {p.name} <span className='text-xs text-muted-foreground'>({p.role})</span></li>
                })
              }
            </ol>
        </CardFooter>
    </Card>
  )
}

export default BestElevenPlot
