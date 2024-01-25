import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyAlert = (props: { message: string; alertType: string }): any => {
  return (
    <>
      <div className={`alert alert-${props?.alertType || "info"}`}>
        {props.message}
        {props?.alertType && props?.alertType === "success" && (
          <FontAwesomeIcon icon={faSmile} className="mx-2" />
        )}
      </div>
    </>
  );
};
export default MyAlert;

export const InputErrorMessage = (props: {
  message: string;
  alertType: string;
}): any => {
  return (
    <>
      <small className={` text-${props?.alertType || "info"}`}>
        {props.message}
      </small>
    </>
  );
};
