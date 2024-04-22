import React from "react";
import ManagerDash from "../pages/ManagerDash";
import TechDash from "../pages/TechDash";
import DashboardPage from "../pages/DashboardPage";


function Dashboard(){
    const role = localStorage.getItem("role");


    switch(role){
        case "manager":
            return <ManagerDash />;
        case "technician":
            return <TechDash />;
        default:
            return <DashboardPage />;
    }
}


export default Dashboard;