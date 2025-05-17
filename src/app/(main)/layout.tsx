"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/root/footer/footer";
import Navbar from "@/components/root/navbar/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Fragment, ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<SidebarProvider>
				<Navbar />
				<AppSidebar />
				<Toaster />
				<ScrollArea className="h-screen w-full">

				<main className="h-full min-h-screen w-full px-2 mt-8 pb-24">
					<SidebarTrigger />
					{children}
				</main>
				</ScrollArea>
			</SidebarProvider>
			<Footer />
		</Fragment>
	);
}

export default Layout;
