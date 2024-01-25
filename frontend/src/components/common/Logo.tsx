import { NavLink } from "react-router-dom";
import LogoImg from '../../assets/images/TDB_Logo_Black.png';
const Logo = () => {
  return (
    <>
      <NavLink
        to={"/"}
        className="navbar-brand font-weight-bolder ms-lg-0 text-lg"
      >
        {/* <span className="text-primary">True</span>Digital Broadcast */}
        <img src={LogoImg} className="img"/>
      </NavLink>
    </>
  );
};

export default Logo;
