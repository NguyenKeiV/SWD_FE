// File: src/layouts/AdminLayout.jsx
import { useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  LayoutDashboardIcon,
} from "lucide-react";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboardIcon />,
    path: "/admin/dashboard",
  },
  { name: "Manage Users", icon: <UsersIcon />, path: "/admin/users" },
  {
    name: "Manage Admissions",
    icon: <FileTextIcon />,
    path: "/admin/admissions",
  },
];

export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  if (location.pathname === "/admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-orange-500 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 h-16">
          <h1 className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>
            Admin
          </h1>
          <button onClick={() => setCollapsed(!collapsed)}>
            <span className="text-white">☰</span>
          </button>
        </div>
        <nav className="flex-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-orange-600 ${
                location.pathname === item.path ? "bg-orange-600" : ""
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto bg-white rounded-l-2xl shadow-xl">
        <Outlet />
      </div>
    </div>
  );
}
