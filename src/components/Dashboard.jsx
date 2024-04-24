import React from "react";
import ManagerDash from "../pages/ManagerDash";
import TechDash from "../pages/TechDash";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";


function Dashboard(){
    const role = localStorage.getItem("role");


    switch(role){
        case "manager":
            return <ManagerDash />;
        case "technician":
            return <TechDash />;
        case "customer":
            return <DashboardPage />;
        default:
            return <LoginPage />;
    }
}


export default Dashboard;