import FindImg from "../assets/images/find.png";
import NotifyImg from "../assets/images/notify.png";
import SmsileImg from "../assets/images/smiley.png";
import redNoiseImg from "../assets/images/red-noise.jpeg";
import AstroImg from "../assets/images/astro.png";
import { NavLink } from "react-router-dom";
import HomeBannerImg from "../assets/images/home-banner.png";
import BlogCard from "../components/BlogCard";

import DoctorImg from "../assets/images/forClinics.webp";

const Home = () => {
  const backgroundRedImg = {
    backgroundImage: "url(" + redNoiseImg + ")",
    backgroundPosition: "center center",
  };

  const background: any = {
    backgroundImage: "url('images/gradient.svg')",
  };

  return (
    <>
      <header>
        <div className="page-header pt-7">
          <div className="oblique position-absolute top-0 end-0 h-100 d-md-block d-none">
            <div
              className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n12"
              style={background}
            ></div>
          </div>
          <div className="container">
            <div className="row text-sm-start text-center">
              <div className="col-lg-6 col-md-7 mt-md-8 mb-lg-8 mb-3 mt-md-0">
                <h6 className="text-uppercase text-sm">
                  True Digital Broadcasting
                </h6>
                <h1 className="text-dark display-5 font-weight-black mt-3">
                  The perfect starting point to{" "}
                  <span className="text-primary"> Become a Partner.</span>
                </h1>
                <p className="text-lg me-sm-5">
                At True Digital Broadcasting, we specialize in delivering dynamic advertising solutions using LED technology, amplifying client ads across marketplaces for maximum visibility and impact.
                </p>

                <NavLink to={"login"} className="btn btn-dark mt-4">
                  Get Started
                </NavLink>
                <NavLink
                  to={"auth/register"}
                  className="btn btn-primary mt-4 ms-2"
                >
                  Register with us
                </NavLink>
              </div>
              <div className="col-lg-6 col-md-7 mt-md-8 mb-lg-8 mb-3 mt-md-0">
                <img
                  src={HomeBannerImg}
                  alt="Broadcasting Public Ads"
                  className="position-absolute ms-md-0 d-none d-md-flex mt-12 mt-lg-0 circle-img img-thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <section id="about" className="about-section text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {/* <img src={HeadImg} className="img-fluid" alt="" /> */}
              <h2 className="text-uppercase font-weight-bold"><span className="text-primary">Why</span> Join Us</h2>
            </div>
            <div className="row align-items-center no-gutters mt-5 mb-4 mb-lg-5">
              <div className="col-xl-4 col-lg-4 text-center pl-3 pr-3">
                <div className="featured-text">
                  <img src={FindImg} className="img-fluid mb-3 mt-3" alt="" />
                  <h5 className="text-xl mt-3 mb-1 font-weight-black">
                    Register with Us
                  </h5>
                  <p className="text-black-50 mb-0 text-center">
                    Create a simple account, complete KYC and than start earning with us by doing broadcasting for our clients.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 text-center pl-3 pr-3">
                <div className="featured-text">
                  <img src={NotifyImg} className="img-fluid mb-3 mt-3" alt="" />

                  <h5 className="text-xl mt-3 mb-1 font-weight-black">
                    Track Your Data
                  </h5>
                  <p className="text-black-50 mb-0 text-center">
                    Get notifications on real-time basis. Be informed about the
                    latest developments and events.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 text-center pl-3 pr-3 ">
                <div className="featured-text">
                  <img src={SmsileImg} className="img-fluid mb-3 mt-3" alt="" />
                  <h5 className="text-xl mt-3 mb-1 font-weight-black">
                    Completly Free
                  </h5>
                  <p className="text-black-50 mb-0 text-center">
                    Get notifications on real-time basis. Be informed about the
                    latest developments and events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-3 my-7">
        <div className="container">
          <div className="row position-relative mb-2">
            <div className="col-12">
              <div
                className="card position-relative shadow-lg"
                style={backgroundRedImg}
              >
                <div className="card-body p-md-5 p-4">
                  <span className="text-white text-lg font-weight-bold">
                    For Everyone
                  </span>
                  <h4 className="my-2 text-white text-4xl font-weight-black col-md-6">
                    Let's join forces for a better world!
                  </h4>
                  <p className="text-white w-lg-50">
                  Empower your earnings with our innovative platform! Watch ads on your device and turn your time into profit as a valued vendor in our rewarding ecosystem.
                  </p>

                  <NavLink
                    to={"login"}
                    className="btn btn-sm btn-outline-white text-white btn-blur mb-0 mt-2"
                  >
                    Get Started
                  </NavLink>
                </div>
              </div>
              <img
                src={AstroImg}
                className="position-absolute w-30 end-3 top-0 mt-sm-n6 d-md-block d-none"
                alt="github"
              />
            </div>
          </div>
        </div>
      </section>

     
      <section className=" pb-5  position-relative" id="section-tools">
        <div className="container">
          <div className="row position-relative overflow-hidden mb-2">
            <div className="col-md-5">
              <span className="text-primary font-weight-bold">
                Want to Earn with us,
              </span>
              <h2 className="mt-2 display-6 font-weight-black">
                For Everyone
              </h2>
              <p>You can start with us, We can Help more Brands together.</p>

              <div className="investors-column pt-4">
                <header className="entry-title">
                  <h4 className="title-head">
                    <strong className="text-primary">Want to Reach</strong> new
                    Limits.
                  </h4>
                  <p>
                  Empower your earnings with our innovative platform! Watch ads on your device and turn your time into profit as a valued vendor in our rewarding ecosystem.
                  </p>
                </header>
                <div className="investors-desc">
                  <ul className="list-group">
                    <li className="list-group-item">Get Unlimited Ads</li>
                    <li className="list-group-item">Earn Good Money</li>
                    <li className="list-group-item">Easy Record Maintance</li>
                  </ul>
                </div>
                <div className="mt-4 mb-4">
                  <NavLink
                    to="/auth/register/hopital"
                    className="btn btn-primary mr-3"
                  >
                    Register As Vendor
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    className="btn btn-outline-primary mx-4"
                  >
                    Join as Client
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-sm-7">
              <img
                src={DoctorImg}
                alt="For Hospitals/Clinics"
                className="img img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pt-3 pb-5 mt-5 position-relative" id="section-tools">
        <div className="container">
          <div className="row position-relative overflow-hidden mb-2">
            <div className="col-md-7">
              <span className="text-primary font-weight-bold">
                Get inspired By,
              </span>
              <h2 className="mt-2 display-6 font-weight-black">
                Our Latest Blogs
              </h2>
              <p>
                You can start reading our fully motivated blogs, if you want to
                get inspired.
              </p>
            </div>
          </div>
          <div className="row">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
