import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setAuthState } from "../app/authActions";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    document.cookie = "";
    dispatch(setAuthState(false));
    navigate("/");
  }, [dispatch, navigate]);

  return <></>;
};

export default Logout;
