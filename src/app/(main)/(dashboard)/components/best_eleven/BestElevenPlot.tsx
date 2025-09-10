import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Player } from '../../utils/types'
import { BEST_XI_HEADERS } from '@/lib/Types/LABELS'

type Props = { //eslint-disable-next-line
  plotImg: string, className?: string, subs: any[], type: "team" | "league" | "overall"
}
function BestElevenPlot({ plotImg, className, subs, type }: Props) {
  return (
    <Card className={cn("h-fit", className)}>
      <CardHeader className="p-2 md:p-6 min-h-[100px]">
        <CardTitle>{BEST_XI_HEADERS[type]} Best XI</CardTitle>
        <CardDescription>
          Ranking best eleven by mental score
        </CardDescription>
      </CardHeader>
      <CardContent className='p-1'>
        <div className='w-full h-full flex justify-center'>
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
        <ol type='1' className='pt-4'>
          {
            subs.map((p: Player, i: number) => {
              return <li key={p.name} className='text-sm'>{i + 1}. {p.name} <span className='text-xs text-muted-foreground'>({p.role})</span></li>
            })
          }
        </ol>
      </CardFooter>
    </Card>
  )
}

export default BestElevenPlot
