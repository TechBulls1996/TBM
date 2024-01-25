import {
  faChartArea,
  faFileClipboard,
  faNetworkWired,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside className="app-sidebar">
        <nav className=" navbar-expand-md navbar-app">
          <div className="navbar-collapse collapse" id="app-navbar-nav">
            <div className="navbar-nav">
              <NavLink to={"/user/dashboard"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faChartArea} />
                </i>
                Dashboard
              </NavLink>
              
              <NavLink to={"/user/play"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faNetworkWired} />
                </i>
                Watch Ads
              </NavLink>
              <NavLink to={"/user/records"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faFileClipboard} />
                </i>
                My Records
              </NavLink>
              <NavLink to={"/user/profile"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                Profile
              </NavLink>

              <NavLink to={"/auth/logout"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </i>
                Logout
              </NavLink>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};
export default React.memo(Sidebar);
