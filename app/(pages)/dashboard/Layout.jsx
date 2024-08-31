// components/Layout.js
import React from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar will always be visible */}
      <div className="flex-1 p-8 mt-16"> {/* Adding margin to avoid touching the navbar */}
        {children} {/* Render the current page's content */}
      </div>
    </div>
  );
};

export default Layout;
