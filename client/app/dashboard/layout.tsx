"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardNavbar from "@/components/Navbar";
//
import { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { authContext } from "@/context/authContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // using context
  const { token } = useContext(authContext);

  // if (!token) {
  //   redirect("/login");
  // }
  // using use Effect
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      redirect("/login");
    }
  }, []);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="relative w-32 h-32">
            <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#111212] border-b-[#111212] animate-spin"></div>

            <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#111212] animate-spin"></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-[#111212]/10 via-transparent to-[#111212]/5 animate-pulse rounded-full blur-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="flex">
            <SidebarTrigger className="size-8" />
            <DashboardNavbar />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
