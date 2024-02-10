import NavbarButton from "./common/NavbarToggle";
import Logo from "./common/Logo";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";


const OuterHeader = () => {
  
  return (
    <>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg border-radius-sm top-0 shadow blur z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-2">
              <div className="container-fluid px-1">
                <Logo />
                <NavbarButton />
                <div className="collapse navbar-collapse" id="navigation">   
                    <>
                      <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                          <NavLink
                            to={"/blogs"}
                            className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                          >
                            Blogs
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to={"/contact"}
                            className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                          >
                            Contact
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink
                            to={"/about"}
                            className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                          >
                            About
                          </NavLink>
                        </li>
                      </ul>

                      <ul className="navbar-nav d-lg-block d-none ">
                        <li className="nav-item ms-2">
                          <NavLink
                            to={"/login"}
                            className="btn btn-sm mb-0 bg-gradient-dark border-radius-sm"
                          >
                            Login <FontAwesomeIcon icon={faCoffee} />
                          </NavLink>
                        </li>
                      </ul>
                    </>
                 
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
export default OuterHeader;
