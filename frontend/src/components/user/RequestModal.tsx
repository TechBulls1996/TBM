import { FormEvent, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import CountrySelect, {
  CitySelect,
  StateSelect,
} from "../common/AdvanceSelect";
import MyAlert, { InputErrorMessage } from "../common/Alert";
import { getErrorMsg } from "../../helpers";
import { NavLink } from "react-router-dom";
import { SendRequest } from "../../services/RequestServices";

import { useSelector } from "react-redux";

const RequestModal = ({ modalStatus, setModalStatus }: any) => {
  const authState = useSelector((state: any) => state.auth?.user || state.auth);
  const [show, setShow] = useState(false);

  const [urgency, setUrgency]: any = useState(false);
  const [time, setTime] = useState(0);
  const [country, setCountry]: any = useState(
    authState?.country || {
      code: "IN",
      label: "India",
      value: "India",
    }
  );
  const [state, setState]: any = useState(authState?.state);
  const [city, setCity]: any = useState(authState?.city);
  const [hospital, setHospital]: any = useState("");
  const [hospitalAddress, setHospitalAddress]: any = useState("");
  const [pinCode, setPinCode]: any = useState(authState?.pinCode);
  const [age, setAge]: any = useState(18);
  const [phone, setPhone]: any = useState(authState?.mobile);
  const [desc, setDesc]: any = useState("");
  const [ytUrl, setYtUrl]: any = useState("");
  const [bloodType, setBloodType]: any = useState("");
  const [bloodGroup, setBloodGroup]: any = useState("");
  const [bloodUnit, setBloodUnit]: any = useState("");
  const [email, setEmail]: any = useState(authState?.email);
  const [name, setName]: any = useState(authState?.name);

  const [terms, setTerms]: any = useState(true);
  const [errors, setErrors]: any = useState([]);
  const [successMsg, setSuccessMsg]: any = useState(false);

  const handleClose = () => {
    setShow(false);
    setModalStatus(false);
  };

  const onRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg(false);

    if (!terms) {
      setErrors([
        { param: "terms", message: "Terms and Condtions are Required." },
      ]);
      return false;
    }

    SendRequest({
      urgency,
      email,
      name,
      phone,
      age,
      desc,
      country,
      state,
      city,
      hospital,
      hospitalAddress,
      pinCode,
      ytUrl,
      bloodType,
      bloodGroup,
      bloodUnit,
      time,
    }).then((res) => {
      if (res?.status) {
        //success
        setSuccessMsg(
          "Your Request Has Been successfully created, Lets hope for Best."
        );
        setTimeout(handleClose, 3000);
        return true;
      } else {
        setErrors(res?.errors);
        return false;
      }
    });
  };

  useEffect(() => {
    setShow(modalStatus);
  }, [modalStatus]);

  const globalError = getErrorMsg(errors, "global");
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <h4 className="text-center text-uppercase mb-0">
            Create your Request{" "}
          </h4>
        </Modal.Header>
        <Modal.Body>
          <form
            encType="multipart/form-data"
            className="contact-form"
            onSubmit={(e) => onRequest(e)}
          >
            <div className="row">
              <div className="form-group col-md">
                <select
                  className="form-control"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                >
                  <option value="">Select Blood Type</option>
                  <option>Covid Positive Plasma</option>
                  <option>Blood</option>
                  <option>Platelets</option>
                  <option>Plasma</option>
                  <option>Double Red Cell</option>
                  <option>Cord Blood</option>
                  <option>I Don`t Know</option>
                </select>
                <InputErrorMessage
                  message={getErrorMsg(errors, "bloodType")}
                  alertType="danger"
                />
              </div>
              <div className="form-group col-md">
                <label className="sr-only" htmlFor="blood_group">
                  Blood Group
                </label>
                <select
                  className="form-control "
                  id="blood_group"
                  name="blood_group"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option>Select Blood Group</option>
                  <option>Any</option>
                  <option>O-</option>
                  <option>O+</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B-</option>
                  <option>B+</option>
                  <option>AB-</option>
                  <option>AB+</option>
                </select>
                <InputErrorMessage
                  message={getErrorMsg(errors, "bloodGroup")}
                  alertType="danger"
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="blood_required"
                  placeholder="Blood Required In Unit"
                  value={bloodUnit}
                  onChange={(e) => setBloodUnit(e.target.value)}
                />
                <InputErrorMessage
                  message={getErrorMsg(errors, "bloodUnit")}
                  alertType="danger"
                />
              </div>
              <div
                className="form-group col-md"
                style={{ position: "relative" }}
              >
                <select
                  className="form-control "
                  id="time"
                  value={time}
                  onChange={(e: any) => {
                    setTime(e.target?.value);
                    const urgentStr =
                      e.target?.value <= 6 ? "Urgent" : "Moderate";
                    setUrgency(urgentStr);
                  }}
                >
                  <option>Select Time</option>
                  <option value={1}>With in 1 hours</option>
                  <option value={2}>With in 2 hours</option>
                  <option value={3}>With in 3 hours</option>
                  <option value={6}>With in 6 hours</option>
                  <option value={12}>With in 12 hours</option>
                  <option value={24}>With in 24 hours</option>
                  <option value={48}>With in 48 hours</option>
                  <option value={96}>With in 96 hours</option>
                </select>
                <InputErrorMessage
                  message={getErrorMsg(errors, "time")}
                  alertType="danger"
                />

                {urgency && (
                  <Badge
                    pill
                    bg={urgency === "Urgent" ? "danger" : "warning"}
                    className="mx-2"
                    style={{
                      marginTop: "-20px",
                      position: "absolute",
                      top: "10px",
                      right: "5px",
                    }}
                  >
                    {urgency}
                  </Badge>
                )}
              </div>
            </div>
            <div className="mb-3">hospital Details</div>
            <div className="row">
              <div className="form-group col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="hospital_name"
                  name="hospital_name"
                  placeholder="Hospital Name"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
                <InputErrorMessage
                  message={getErrorMsg(errors, "hospital")}
                  alertType="danger"
                />
              </div>
              <div className="form-group col-md-8">
                <input
                  type="text"
                  className="form-control"
                  id="local_address"
                  name="local_address"
                  placeholder="Hospital Address"
                  value={hospitalAddress}
                  onChange={(e) => setHospitalAddress(e.target.value)}
                />
                <InputErrorMessage
                  message={getErrorMsg(errors, "hospitalAddress")}
                  alertType="danger"
                />
              </div>

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

              <div className="form-group col-md-4">
                <label className="sr-only" htmlFor="pincode">
                  pincode
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pin_code"
                  name="pin_code"
                  placeholder="Pin Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <InputErrorMessage
                  message={getErrorMsg(errors, "pinCode")}
                  alertType="danger"
                />
              </div>
            </div>
            <div className="mb-3">Contact Details</div>
            <div className="row">
              <div className="form-group col-md-3">
                <label className="sr-only" htmlFor="fname">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  placeholder="Patient Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputErrorMessage
                  message={getErrorMsg(errors, "name")}
                  alertType="danger"
                />
              </div>
              <div className="form-group col-md-4">
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputErrorMessage
                  message={getErrorMsg(errors, "email")}
                  alertType="danger"
                />
              </div>

              <div className="form-group col-md-2">
                <label className="sr-only" htmlFor="age">
                  age
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  name="age"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <InputErrorMessage
                  message={getErrorMsg(errors, "age")}
                  alertType="danger"
                />
              </div>

              <div className="form-group col-md-3">
                <label className="sr-only" htmlFor="Phone">
                  Phone
                </label>
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

              <div className="form-group col-md-12">
                <label className="sr-only" htmlFor="discription">
                  Description
                </label>
                <textarea
                  name="discription"
                  id="discription"
                  className="form-control"
                  placeholder="Breif about your Request."
                  rows={5}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <InputErrorMessage
                  message={getErrorMsg(errors, "desc")}
                  alertType="danger"
                />
              </div>

              <div className="col-md-12 form-group">
                <p className="mb-3">Add Youtube Video </p>
                <div className="input-group col">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-gray-100"
                      id="basic-addon1"
                    >
                      URL
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control px-2"
                    id="yturl"
                    name="yturl"
                    placeholder="https://www.youtube.com/Myx1Abu"
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "ytUrl")}
                    alertType="danger"
                  />
                </div>
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
            </div>
            {globalError?.length > 0 && (
              <MyAlert message={globalError} alertType="danger" />
            )}
            {successMsg?.length > 0 && (
              <MyAlert message={successMsg} alertType="success" />
            )}
            <div className="form-row">
              <div className="form-group col-md-2 mt-4">
                <button
                  id="submit"
                  type="submit"
                  className="btn btn-block btn-primary py-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequestModal;
