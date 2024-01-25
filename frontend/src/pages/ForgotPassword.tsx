import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserLogin } from "../services/AuthServices";
import { getErrorMsg } from "../helpers";
import Alert, { InputErrorMessage } from "../components/common/Alert";

const ForgotPassword = () => {
  const [email, setEmail]: any = useState("");
  const [errors, setErrors]: any = useState([]);

  const onForgotPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserLogin({ email }).then((res) => {
      if (res?.status) {
        //success
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
          onSubmit={(e) => onForgotPassword(e)}
        >
          <div className="row">
            <div className="col-lg-4 mx-lg-auto bg-light shadow p-5 mt-7">
              <h3 className="text-center"> Forgot Password</h3>
              <p className="text-center">
               Please enter the Email Address.
              </p>

              <div className="form-row">
                <div className="form-group col-md-12">
                  {globalError?.length > 0 && (
                    <Alert message={globalError} alertType="danger" />
                  )}
                </div>
                <div className="form-group col-md-12">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    autoFocus
                  />

                  <InputErrorMessage
                    message={getErrorMsg(errors, "email")}
                    alertType="danger"
                  />
                </div>

                <div className="form-group col-sm-12 pt-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary px-6"
                  >
                    Submit{" "}
                  </button>
                </div>

                <div className="form-group col-sm-12 pt-3 text-center ">
                  <NavLink
                    to={"/auth/register"}
                    className="ml-2 font-bold text-primary"
                  >
                    Register Now
                  </NavLink>
                  |
                  <NavLink to={"/login"} className="ml-2 text-primary">
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

export default ForgotPassword;
