import React from 'react';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="flex">
      <div className="h-screen w-72 duration-300 bg-indigo-200 fixed z-40 p-3">
        Sidebar
      </div>

      <div className="ml-72 w-full bg-accent min-h-screen p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
