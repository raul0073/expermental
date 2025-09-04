import Navbar from "@/components/root/navbar/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { Fragment, ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<Navbar />
			<Toaster />
			<main className="h-full w-full mt-16">
				<ScrollArea className="h-[calc(100dvh-3rem)] w-full">

					{children}
				</ScrollArea>
			</main>
		</Fragment>
	);
}

export default Layout;
