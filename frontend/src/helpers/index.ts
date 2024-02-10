import moment from "moment";

export const getErrorMsg = (errors: any = [], keyName: string) => {
  const error = errors.find(
    (val: { param: string; message: string }) => val.param === keyName
  );
  return error?.message;
};

export const setAuthCookie = (token: any) => {
  if (token.length <= 0) return false;
  localStorage.setItem("auth", token);
  return true;
};

export const getAuthCookie = () => {
  return localStorage.getItem("auth");
};

export const setServiceHeaders = () => {
  const token = localStorage.getItem("auth");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserRole = () => {
  const user = localStorage.getItem('user');
  if(user){
    return JSON.parse(user).roles?.[0]?.type;
  }
  return false;
}

export const getTimeAgo = (time: any) => {
  return moment(time).fromNow();
};
