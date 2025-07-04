// import React from 'react'

import DashboardCards from "./DashboardCards";
import Employees from "./Employees";

const ClientHome = () => {
  return (
    <div className="w-full">
      <div>
        <DashboardCards />
      </div>
      <div className="mt-10">
        <Employees />
      </div>
    </div>
  );
};

export default ClientHome;
