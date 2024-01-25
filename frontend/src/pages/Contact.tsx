import { NavLink } from "react-router-dom";
import BreadCrumb from "../components/common/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkedAlt,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import BgHeader from "../components/BgHeader";

const Contact = () => {
  return (
    <>
      <BgHeader />
      <BreadCrumb pages={["Contact us"]} />

      <div className="aboutus-secktion pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <h4>Contact Us</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam repellendus maiores ab provident rem illo ea, assumenda praesentium itaque aliquid necessitatibus tempora est! Delectus maxime sed possimus quos reprehenderit animi?
              </p>
            </div>
            <div className="container contact-section pb-5">
              <div className="row">
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card py-4 h-100">
                    <div className="card-body text-center">
                      <FontAwesomeIcon
                        icon={faMapMarkedAlt}
                        className="text-primary mb-2"
                      />
                      <h4 className="text-uppercase m-0">Address</h4>
                      <hr className="my-4" />
                      <div className="small text-black-50">
                        New Delhi, India
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card py-4 h-100">
                    <div className="card-body text-center">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-primary mb-2"
                      />

                      <h4 className="text-uppercase m-0">Email</h4>
                      <hr className="my-4" />
                      <div className="small text-black-50">
                        <NavLink to={"mailto:contact@medimapping.com"}>
                          contact@example.com
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="card py-4 h-100">
                    <div className="card-body text-center">
                      <FontAwesomeIcon
                        icon={faMobileAlt}
                        className="text-primary mb-2"
                      />
                      <h4 className="text-uppercase m-0">Phone</h4>
                      <hr className="my-4" />
                      <div className="small text-black-50">+91 999876544</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>

      </div>
    </>
  );
};

export default Contact;
