import {
  faChartArea,
  faFileClipboard,
  faNetworkWired,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <aside className="app-sidebar">
        <nav className=" navbar-expand-md navbar-app">
          <div className="navbar-collapse collapse" id="app-navbar-nav">
            <div className="navbar-nav">
              <NavLink to={"/admin/dashboard"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faChartArea} />
                </i>
                Dashboard
              </NavLink>
              
              <NavLink to={"/admin/ads"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faNetworkWired} />
                </i>
                Create Ads
              </NavLink>
              <NavLink to={"/admin/clients"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faFileClipboard} />
                </i>
                Clients
              </NavLink>
              <NavLink to={"/admin/users"} className="nav-link">
                <i className="network-ico ico">
                  <FontAwesomeIcon icon={faUsers} />
                </i>
                Users
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
export default React.memo(AdminSidebar);
