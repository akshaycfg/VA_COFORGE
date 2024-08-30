import React, { useEffect } from "react";
import "./index.scss";

const Stepper = () => {
  useEffect(() => {
    const circularProgress = document.querySelectorAll(".circular-progress");

    Array.from(circularProgress).forEach((progressBar) => {
      const progressValue = progressBar.querySelector(".percentage");
      const innerCircle = progressBar.querySelector(".inner-circle");
      let startValue = 0,
        endValue = Number(progressBar.getAttribute("data-percentage")),
        speed = 50,
        progressColor = progressBar.getAttribute("data-progress-color");

      const progress = setInterval(() => {
        startValue++;
        progressValue.textContent = `${startValue}`;
        progressValue.style.color = `${progressColor}`;

        innerCircle.style.backgroundColor = `${progressBar.getAttribute(
          "data-inner-circle-color"
        )}`;

        progressBar.style.background = `conic-gradient(${progressColor} ${
          startValue * 3.6
        }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
        if (startValue === endValue) {
          clearInterval(progress);
        }
      }, speed);
    });
  }, []);

  return (
    <div className="stepper-div">
      <div className="circular-progress1">
        <div
          className="circular-progress"
          data-inner-circle-color="white"
          data-percentage="80"
          data-progress-color="#2185d0"
          data-bg-color="white"
        >
          <div className="inner-circle"></div>
          <p className="percentage">0</p>
        </div>
        <div className="line"></div>
      </div>
      <div>Projectz.</div>
    </div>
  );
};

export default Stepper;
