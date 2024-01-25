import Sidebar from "../../components/user/Sidebar";
import { DashboardCards } from "../../components/user/UserCards";

const Dashboard = () => {
  return (
    <>
      <section className="container container-fluid benefits-section pt-7 pb-7 px-0 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 p-0">
              <Sidebar />
            </div>
            <div className="col-sm-9 pt-3">
              <header className=" d-flex align-items-center pb-2">
                <h3 className="title-md">Dashboard</h3>
              </header>

              {/* start listing */}
              <div className="row">
                <DashboardCards />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
