"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";

const DashboardNavbar = () => {
  const handleClick = () => {
    console.log("Logged Out");
    localStorage.setItem("token", "");
    redirect("/login");
  };
  return (
    <div className="flex items-center justify-between w-full p-4 mr-6 mx-auto bg-gray-100 rounded-b-xl">
      <div className="text-2xl">Manage.</div>
      <Button onClick={handleClick}>Log out ➜</Button>
    </div>
  );
};

export default DashboardNavbar;
