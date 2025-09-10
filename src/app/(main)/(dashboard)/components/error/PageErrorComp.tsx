'use client'
import errorFlag from '@/../public/images/error/icons8-offside-flag-100.png';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoReload } from "react-icons/io5";
interface PageErrorCompProps {
  page?: "dashboard" | "league" | "team" | "player";
}

const PAGE_ERROR_MESSAGES: Record<string, string> = {
  dashboard: "Failed to load the global mental dashboard. Please try again.",
  league: "Failed to load league data. Please refresh the page.",
  team: "Failed to load team data. Please refresh the page.",
  player: "Failed to load player data. Please try again.",
};

export default function PageErrorComp({ page = "dashboard" }: PageErrorCompProps) {
  const msg = PAGE_ERROR_MESSAGES[page] || "Something went wrong.";
  const router = useRouter()
  return (
    <div className="mt-6 px-4 w-[90%] md:w-2/3 mx-auto flex flex-col items-center justify-center min-h-[60dvh] h-[90%] p-6 text-center bg-destructive-foreground/10 rounded-md border border-destructive-foreground/30">
     
     <div className="flex-col flex md:flex-row items-center gap-3">
        <Image src={errorFlag} alt="error_flag" width={100} height={100} className="w-24 h-auto" />
        <header className="flex flex-col items-start">
         <h2 className="text-2xl font-bold text-destructive uppercase "> {`Your'e Caught Offside.`}</h2> 
        <p className="text-muted-foreground">{msg}</p>
     </header>
     </div>
      <Button
      variant={'link'}
       onClick={() => router.refresh()}
        className="mt-4 px-4 py-2 bg-destructive rounded hover:bg-red-700 transition"
      >
        Retry  <IoReload />
      </Button>
    </div>
  );
}
