"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/root/footer/footer";
import Navbar from "@/components/root/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Fragment, ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<SidebarProvider>
				<Navbar />
				<AppSidebar />
				<main className="h-full w-full px-2 mt-12">
					<SidebarTrigger />
					{children}
				</main>
			</SidebarProvider>
			<Footer />
		</Fragment>
	);
}

export default Layout;
