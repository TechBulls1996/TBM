import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserLogin } from "../services/AuthServices";
import { getErrorMsg, setAuthCookie } from "../helpers";
import Alert, { InputErrorMessage } from "../components/common/Alert";

import { useDispatch } from "react-redux";
import { setAllState } from "../app/authActions";
import moment from "moment";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [rememberMe, setRememberMe]: any = useState(false);
  const [errors, setErrors]: any = useState([]);

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserLogin({ email, password })
      .then((res) => {
        if (res?.status) {
          const type = res?.user.roles[0].type;
          //success
          dispatch(
            setAllState({
              loginTime: moment().format('YYYY-MM-DD HH:mm:ss'),
              authStatus: true,
              user: res?.user,
              type: type,
            })
          );
          setAuthCookie(res?.token);
          if (rememberMe) localStorage.setItem("remeberMe", "true");
          navigate(`/${type}`);
        } else if (res && res.errors) {
          setErrors(res?.errors);
        } else {
          setErrors([
            {
              param: "global",
              message: "Something Wrong! Please check your connection.",
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors([
          {
            param: "global",
            message: "Something Wrong! Please check your connection.",
          },
        ]);
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
          onSubmit={(e) => onLogin(e)}
        >
          <div className="row">
            <div className="col-lg-5 mx-lg-auto bg-light shadow p-5 mt-7">
              <h3 className="text-center"> Login Yourself</h3>
              <p className="text-center">Please fill the form below</p>

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
                <div className="form-group col-md-12">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                  <InputErrorMessage
                    message={getErrorMsg(errors, "password")}
                    alertType="danger"
                  />
                </div>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="customCheck1"
                        value={rememberMe}
                        onChange={(e) => setRememberMe(!rememberMe)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remeber Me
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group col-sm-12 pt-4">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary px-6"
                  >
                    Login{" "}
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
                  <NavLink to={"/auth/forgot"} className="ml-2 text-primary">
                    Forgot Password
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

export default Login;
