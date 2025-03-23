import { Button } from "./ui/button";

const DashboardNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 mr-6 mx-auto bg-gray-100 rounded-b-xl">
      <div className="text-2xl">Manage.</div>
      <Button>Log in</Button>
    </div>
  );
};

export default DashboardNavbar;
