import DashboardCards from "../../components/clientHirer/DashboardCards";
import Employees from "../../components/clientHirer/Employees";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-10 mt-20">
      <div className="">
        <DashboardCards />
      </div>
      <div className="">
        <Employees />
      </div>
    </div>
  );
};

export default DashboardPage;
