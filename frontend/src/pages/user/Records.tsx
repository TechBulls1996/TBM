import Sidebar from "../../components/user/Sidebar";
import { MedicalRecordCards } from "../../components/user/UserCards";
import SearchBar from "../../components/common/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

const Records = () => {
  return (
    <>
      <section className="container container-fluid benefits-section pt-7 pb-7 px-0 ">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 p-0">
              <Sidebar />
            </div>
            <div className="col-sm-9 pt-4">
              <header className=" d-flex align-items-center">
                <h3 className="title-md">My Records</h3>
              </header>
              <div className="detailcheck-sec">
                <div className="row">
                  <div className="col-sm-12">
                    <label className="form-label">Showing:</label>
                  </div>
                  <div className="col-md-8 mb-4 d-flex">
                    <div className="btn-checkbox form-check">
                      <input
                        name="filter"
                        type="checkbox"
                        id="All-Posts"
                        className="form-check-input"
                        value="All"
                      />
                      <label
                        title=""
                        htmlFor="All-Posts"
                        className="form-check-label"
                      >
                        All
                      </label>
                    </div>
                    <div className="btn-checkbox form-check">
                      <input
                        name="filter"
                        type="checkbox"
                        id="Announcements"
                        className="form-check-input"
                        value="Funding Deal Announcement"
                      />
                      <label
                        title=""
                        htmlFor="Announcements"
                        className="form-check-label"
                      >
                        Recently Added
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <SearchBar placeholder="Search Records..." />
                  </div>
                </div>
              </div>
             
              <div className="row vital-row">
                <div className="col-sm-12 mt-2">
                  <div className="card">
                    
                      <div className="table-wrap w-100">
                        <table className="table table-responsive">
                          <thead>
                            <tr>
                              <td className="head">Record</td>
                              <td className="head">First</td>
                              <td className="head">Last</td>
                              <td className="head">Handle</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Mark</td>
                              <td>Otto</td>
                              <td>@mdo</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Jacob</td>
                              <td>Thornton</td>
                              <td>@fat</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td colSpan={2}>Larry the Bird</td>
                              <td>@twitter</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Records;