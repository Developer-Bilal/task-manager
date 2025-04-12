"use client";

import { Button } from "./ui/button";
import { useContext } from "react";
import { authContext } from "@/context/authContext";

const DashboardNavbar = () => {
  const { logout } = useContext(authContext);

  const handleClick = () => {
    // logs out deletes token
    logout();
  };

  return (
    <div className="flex items-center justify-between w-full p-4 mr-6 mx-auto bg-gray-100 rounded-b-xl">
      <div className="text-2xl">Manage.</div>
      <Button onClick={handleClick} className="cursor-pointer">
        Log out ➜
      </Button>
    </div>
  );
};

export default DashboardNavbar;
