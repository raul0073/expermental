import About from "@/components/root/about/About";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Page() {
	return (
		<section className="editor-home pt-12">
      <div className="w-full flex justify-center gap-12">
				<Link href={'/editor/player'} className="flex items-center ">
        <Button variant={'outline'} className="py-8 px-12">Player Config Editor
        <ArrowRight />
       
           </Button>
       
        </Link>
        <Link href={'/editor/zone'} className="flex items-center ">
				<Button variant={'outline'} className="py-8 px-12">Zones Config Editor
        <ArrowRight />
           </Button>
       
        </Link>
			</div>
			<About />
		</section>
	);
}

export default Page;
