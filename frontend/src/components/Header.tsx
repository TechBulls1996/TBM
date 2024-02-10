import NavbarButton from "./common/NavbarToggle";
import Logo from "./common/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import dummyImg from "../assets/images/dummy.png";

import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./common/Search";
import { setAllState } from "../app/authActions";

const Header = () => {
  const authState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);
  const handleDropdown = (e: any) => {
    e.preventDefault();
    popup ? setPopup(false) : setPopup(true);
  };

  useEffect(() => {
    const updateState = (authState: any) => {
      if (
        (!authState.user.name || !authState.user.email) &&
        authState.authStatus
      ) {
        const userStr = localStorage.getItem("user");
        if (!userStr || userStr.length <= 0) {
          navigate("/auth/logout");
        }
        const res = JSON.parse(userStr || "{}");
        dispatch(
          setAllState({
            loginTime: res?.loginTime,
            authStatus: true,
            user: res,
          })
        );
      }
    };
    updateState(authState);
  }, [dispatch, navigate]);

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
                  {!authState.authStatus && (
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
                  )}
                  {authState.authStatus && (
                    <>
                      <ul
                        className="navbar-nav ms-auto"
                        style={{ paddingTop: "14px" }}
                      >
                        <li className="nav-item">
                          <SearchBar
                            extraStyle={{
                              width: "300px",
                            }}
                            placeholder="Search Here..."
                            extraClass="mx-2"
                          />
                        </li>
                        <li className="nav-item">
                          <FontAwesomeIcon
                            icon={faBell}
                            className="icon p-2  mx-2 bg-light"
                          />
                        </li>
                      </ul>
                      <ul className="navbar-nav d-lg-block d-none user-sec">
                        <li className="nav-item dropdown">
                          <NavLink
                            to="/login"
                            onClick={(e) => handleDropdown(e)}
                            className="nav-link text-dark dropdown-toggle font-weight-bold d-flex align-items-center me-2"
                          >
                            <span className="user-pic ">
                              <img
                                alt={authState?.user.name}
                                id="user-pic"
                                src={authState?.user.image || dummyImg}
                              />
                            </span>
                            <span>
                              {authState?.user.name} <br />
                              <span>User</span>
                            </span>
                          </NavLink>

                          <ul
                            className={
                              popup ? " dropdown-menu show" : "dropdown-menu"
                            }
                            aria-labelledby="pagesExample"
                          >
                            <li>
                              <NavLink
                                to="/user/community"
                                className="dropdown-item"
                              >
                                Community
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/user/profile"
                                className="dropdown-item"
                              >
                                Profile
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/user/settings"
                                className="dropdown-item"
                              >
                                Settings
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/auth/logout"
                                className="dropdown-item"
                              >
                                Logout
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
