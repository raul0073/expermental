import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/root/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Fragment, ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<Fragment>
		
			<SidebarProvider>
			<header className="px-2">
				<Navbar />
			</header>
				<AppSidebar />
			
				<main className="h-full w-full px-2 mt-16">
					
				<SidebarTrigger />
					{children}</main>
			</SidebarProvider>

			<footer className="w-full fixed z-50 bottom-0 bg-muted h-12 text-center font-semibold font-sans p-2 ">
				ExperiMental
			</footer>
		</Fragment>
	);
}

export default Layout;
