import DashboardCards from "./DashboardCards";
// import Employees from "./Employees";

const ClientHome = () => {
  return (
    <div className="flex flex-col gap-10 ">
      <div className="">
        <DashboardCards />
      </div>
      {/* <div className="">
        <Employees />
      </div> */}
    </div>
  );
};

export default ClientHome;
