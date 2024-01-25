import { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";

const Loader = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoader(false), 1000);
  }, []);

  return (
    <>
      <div
        className={loader ? "" : "d-none"}
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "#ffffffe1",
          height: "calc(100% - 0px)",
          zIndex: "99999",
        }}
      >
        <Dna
          visible={loader}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{
            position: "absolute",
            left: "calc(47%)",
            top: "calc(47%)",
          }}
          wrapperClass="dna-wrapper "
        />
      </div>
    </>
  );
};

export default Loader;
