import dummyImg from "../../assets/images/dummy.png";
import { NavLink } from "react-router-dom";
import dummyLogoImg from "../../assets/images/hospital_dummy_logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faDollarSign,
  faRightLong,
  faTint,
} from "@fortawesome/free-solid-svg-icons";

const UserCards = (props: any) => {
  return (
    <>
      <div className="col-sm-12 mb-5 network-row">
        {[1, 2, 3, 4, 5].map((ind) => {
          return (
            <div className="user-card mt-3" key={ind} {...props}>
              <a href="/UserProfile/629449f183201e1dcc1407f4">
                <figure className="figure">
                  <img src={dummyImg} className="figure-img img-fluid" alt="" />
                </figure>
              </a>
              <div className="contect-sec">
                <a href="/UserProfile/629449f183201e1dcc1407f4/">
                  <h3 className="title-xxs">Sagar Kumar </h3>
                </a>

                <small className="subhead">
                  Looking for AB+ in New Delhi, Delhi
                </small>

                <small className="timeago text-muted">10 months ago</small>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const DashboardCards = () => {
  return (
    <>
      <div className="col-sm-12 mb-5 vital-row">
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="text-outer">
                <h4>Today</h4>
                <h2>
                  $53, 000 <span>+55%</span>
                </h2>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="text-outer">
                <h4>This Week</h4>
                <h2>
                  $53, 000 <span>+55%</span>
                </h2>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="text-outer">
                <h4>This Month</h4>
                <h2>
                  $53, 000 <span>+55%</span>
                </h2>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mt-5">
            <div className="card">
              <div className="head w-100">
                <h4>History</h4>
                <p>
                  <FontAwesomeIcon
                    icon={faRightLong}
                    className="text-success"
                  />{" "}
                  Last 30 Day's Records
                </p>

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
    </>
  );
};

export const HistoryCard = () => {
  return (
    <>
      <div className="col-sm-12 mb-5 vital-row">
        <div id="tracking">
          <div className="text-center tracking-status-intransit">
            <p className="tracking-status text-tight">My History</p>
          </div>
          <div className="tracking-list">
            <div className="tracking-item">
              <div className="tracking-icon status-intransit">
                <FontAwesomeIcon icon={faTint} className="fa-2x" />
              </div>
              <div className="tracking-date">19 Mar, 2023 01:39PM</div>
              <div className="tracking-content text-capitalize">
                You had Requested blood.
                <span className="text-capitalize">
                  raj rishi chatterjee , India , Delhi
                  <br /> South Delhi , New Delhi
                </span>
              </div>
            </div>
            <div className="tracking-item status-donate">
              <div className="tracking-icon status-donate ">
                <FontAwesomeIcon icon={faTint} className="fa-2x" />
              </div>
              <div className="tracking-date">19 Mar, 2023 01:39PM</div>
              <div className="tracking-content text-capitalize">
                You had donated blood.
                <span className="text-capitalize">
                  raj rishi chatterjee , India , Delhi
                  <br /> South Delhi , New Delhi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DoctorCards = () => {
  return (
    <>
      <div className="wfc-pointer col-md-12">
        <div className="doctorslist column-card w-100">
          <div className="fundingheader">
            <figure className="figure">
              <span className="circleimg logo-circle">
                <img
                  alt=""
                  src={dummyLogoImg}
                  className="figure-img img-fluid"
                />
              </span>
              <figcaption className="figure-caption">
                Dr. Rakesh Kumar
                <br />
                <NavLink to={"/doctor/12"} className="text-black ">
                  <span>MBBS, MS - Atlast Hospital</span>
                </NavLink>
              </figcaption>
            </figure>
            <div className="interested-sec text-center">
              <span className="doc-live">Top Rated</span>
            </div>
          </div>
          <div className="totalinvs">
            <div className="item">
              <span className="head-sec">Location</span>
              <span className="amount-sec ">New Delhi</span>
            </div>
            <div className="item">
              <span className="head-sec">Experience</span>
              <span className="amount-sec">8 Yrs</span>
            </div>
            <div className="item">
              <span className="head-sec">Time</span>
              <span className="amount-sec ">10AM-8PM</span>
            </div>
            <div className="item">
              <span className="head-sec">Specialist</span>
              <span className="amount-sec ">Heart, Eye, Ear</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MedicalRecordCards = () => {
  return (
    <>
      <div className="wfc-pointer col-md-12">
        <div className="doctorslist column-card w-100">
          <div className="fundingheader">
            <figure className="figure">
              <span className="circleimg icon-circle">
                <FontAwesomeIcon icon={faBriefcase} className="fa-2x" />
              </span>
              <figcaption className="figure-caption text-capitalize">
                Diabetes Report
                <br />
                <NavLink to={"/doctor/12"} className="text-black ">
                  <span>Dr. Rakesh Kumar, Atlast Hospital</span>
                </NavLink>
              </figcaption>
            </figure>
            <div className="interested-sec text-center">
              <span className=" doc-live">2 Mar, 2022</span>
            </div>
          </div>
          <div className="totalinvs">
            <div className="item">
              <span className="head-sec">Location</span>
              <span className="amount-sec ">New Delhi</span>
            </div>
            <div className="item">
              <span className="head-sec">Next Visit</span>
              <span className="amount-sec">2 July, 2023 10:00AM</span>
            </div>

            <div className="item">
              <span className="head-sec">Specialist</span>
              <span className="amount-sec ">Heart, Eye, Ear</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCards;
