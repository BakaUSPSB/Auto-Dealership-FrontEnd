import React from "react";
import ManagerDash from "../pages/ManagerDash";
import TechDash from "../pages/TechDash";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDash";

function Dashboard() {
  const role = localStorage.getItem("role");

  switch (role) {
    case "manager":
      return <ManagerDash />;
    case "technician":
      return <TechDash />;
    case "customer":
      return <DashboardPage />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <LoginPage />;
  }
}

export default Dashboard;
