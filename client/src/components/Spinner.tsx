import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  const [timer, setTimer] = useState(40);
  useEffect(() => {
    const clock = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => {
      clearInterval(clock);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
      }}
      className="flex flex-col justify-center items-center"
    >
      <RotatingLines
        visible={true}
        // height={96}
        width="96"
        // color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
      <p className="text-2xl text-center">
        This Site is Free Hosted so Performance maybe Poor Please Wait {timer}
        ....
      </p>
    </div>
  );
};

export default Spinner;
