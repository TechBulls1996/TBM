import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const MyButton = ({
  type,
  text,
  onClick,
  afterText,
  extraClass,
  afterClass,
  extraStyle,
}: any) => {
  const [spin, setSpin] = useState(false);
  const [newText, setNewText] = useState(text);
  const [newClass, setNewClass] = useState(extraClass);

  const handleClick = () => {
    setSpin(true);
    setNewText("Loading");
    onClick().then(() => {
      setTimeout(() => {
        setSpin(false);
        setNewText(afterText);
        setNewClass(afterClass);
      }, 1000);
    });
  };
  return (
    <>
      <button
        type={type}
        className={newClass || "btn btn-primary "}
        onClick={handleClick}
        style={extraStyle}
      >
        {spin && <FontAwesomeIcon icon={faSpinner} className="fa-spin" />}
        <span className="mx-2">{newText}</span>
      </button>
    </>
  );
};
