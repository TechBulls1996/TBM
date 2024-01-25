import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getErrorMsg, setAuthCookie } from "../helpers";

import { useDispatch } from "react-redux";
import { setAllState } from "../app/authActions";
import { UserRegister } from "../services/AuthServices";
import Alert, { InputErrorMessage } from "../components/common/Alert";
import CountrySelect, {
  CitySelect,
  StateSelect,
} from "../components/common/AdvanceSelect";
import moment from "moment";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [fullName, setFullName]: any = useState("");
  const [confirmPass, setConfirmPass]: any = useState("");
  const [phone, setPhone]: any = useState("");

  const [dob, setDob]: any = useState("");
  const [gender, setGender]: any = useState("");
  const [bloodGroup, setBloodGroup]: any = useState("");
  const [country, setCountry]: any = useState({
    code: "IN",
    label: "India",
    value: "India",
  });
  const [state, setState]: any = useState("");
  const [city, setCity]: any = useState("");
  const [address, setAddress]: any = useState("");
  const [pinCode, setPinCode]: any = useState("");
  const [terms, setTerms]: any = useState(true);

  const [errors, setErrors]: any = useState([]);

  const onRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!terms) {
      setErrors([
        { param: "terms", message: "Terms and Condtions are Required." },
      ]);
      return false;
    }

    UserRegister({
      email,
      password,
      confirmPass,
      fullName,
      phone,
      dob,
      gender,
      bloodGroup,
      country,
      state,
      city,
      address,
      pinCode,
    }).then((res) => {
      if (res?.status) {
        //success
        dispatch(
          setAllState({
            loginTime: moment(),
            authStatus: true,
            user: res?.user,
          })
        );
        setAuthCookie(res?.token);
        navigate("/user");
      } else {
        setErrors(res?.errors);
      }
    });
  };

  const globalError = getErrorMsg(errors, "global");

  return (
    <>
      <div className="conatiner mb-7">
        <form
          id="login-form"
          method="post"
          className="p-5 col-lg mx-lg-auto"
          onSubmit={(e) => onRegister(e)}
        >
          <div className="row">
            <div className="col-lg-8 mx-lg-auto bg-light shadow p-5 mt-7">
              <h3 className="text-center"> Register Yourself</h3>
              <p className="text-center">Please fill the form below</p>

              <div className="row">
                <div className="col-sm-12 mb-3">Personal Details</div>
                <div className="form-group col-md-12">
                  {globalError?.length > 0 && (
                    <Alert message={globalError} alertType="danger" />
                  )}
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "fullName")}
                    alertType="danger"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "email")}
                    alertType="danger"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "password")}
                    alertType="danger"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "confirmPass")}
                    alertType="danger"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "phone")}
                    alertType="danger"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    placeholder="Date Of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "dob")}
                    alertType="danger"
                  />
                </div>

                <div className="form-group col-md-6">
                  <select
                    className="form-control"
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled={true}>
                      Select Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <InputErrorMessage
                    message={getErrorMsg(errors, "gender")}
                    alertType="danger"
                  />
                </div>
                <div className="form-group col-md-6">
                  <select
                    className="form-control"
                    name="bloodGroup"
                    id="bloodGroup"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="" disabled={true}>
                      Select Blood Group
                    </option>
                    <option>O+</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>A-</option>
                    <option>B-</option>
                    <option>AB-</option>
                    <option>AB+</option>
                    <option>Don't Know</option>
                  </select>

                  <InputErrorMessage
                    message={getErrorMsg(errors, "bloodGroup")}
                    alertType="danger"
                  />
                </div>

                <div className="col-sm-12 mb-3">Address Details</div>
                <div className="form-group col-md-4">
                  <CountrySelect
                    name="country"
                    id="country"
                    defaultValue={country}
                    onChange={(e: any) => setCountry(e)}
                    placeholder="Select Country"
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "country")}
                    alertType="danger"
                  />
                </div>

                <div className="form-group col-md-4">
                  <StateSelect
                    name="state"
                    id="state"
                    country={country}
                    defaultValue={state}
                    onChange={(e: any) => setState(e)}
                    placeholder="Select State"
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "state")}
                    alertType="danger"
                  />
                </div>

                <div className="form-group col-md-4">
                  <CitySelect
                    name="state"
                    id="state"
                    state={state}
                    defaultValue={city}
                    onChange={(e: any) => setCity(e)}
                    placeholder="Select City"
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "city")}
                    alertType="danger"
                  />
                </div>

                <div className="form-group col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Local Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "address")}
                    alertType="danger"
                  />
                </div>
                <div className="form-group col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    placeholder="Pin Code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "pincode")}
                    alertType="danger"
                  />
                </div>
                <div className="col-sm-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="customCheck1"
                      defaultChecked={terms}
                      value={terms}
                      onChange={(e) => setTerms(!terms)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      I Accept{" "}
                      <NavLink
                        to={"/terms_conditions"}
                        className="ml-2 font-bold text-primary"
                      >
                        Terms & Conditions
                      </NavLink>
                    </label>
                  </div>
                  {!terms && (
                    <InputErrorMessage
                      message={getErrorMsg(errors, "terms")}
                      alertType="danger"
                    />
                  )}
                </div>

                <div className="form-group col-sm-12 pt-4">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary px-6"
                  >
                    Register
                  </button>
                </div>

                <div className="form-group col-sm-12 pt-3 text-center ">
                  Already have an account?{" "}
                  <NavLink
                    to={"/login"}
                    className="ml-2 font-bold text-primary"
                  >
                    Login Now
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
