// import React from 'react'

import DashboardCards from "./DashboardCards";
import Employees from "./Employees";

const ClientHome = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <DashboardCards />
      </div>
      <div className="hidden">
        <Employees />
      </div>
    </div>
  );
};

export default ClientHome;
