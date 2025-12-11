import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar with popup menu button */}
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area - Full width, no sidebar */}
          <div className="flex-grow overflow-y-auto p-5 bg-gray-50 w-full">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
