import "./index.scss";
import { useEffect, useState } from "react";
import InputSelector from "../InputSelector";
import Check from "../../images/Check.svg";
const HorizontalStepper = ({
  BatchOne,
  BatchTwo,
  Migration,
  migrationStepper,
}) => {
  const [stepperData, setData] = useState([]);
  const [showBatchOne, setBatch] = useState(true);
  const data = [
    {
      name: "Batch I",
      active: true,
      Page: BatchOne,
      complet: false,
    },
    {
      name: "Batch II",
      active: false,
      Page: BatchTwo,
      complet: false,
    },
    {
      name: "Data Migration",
      active: false,
      Page: Migration,
      complet: false,
    },
  ];
  //   const clickHandler = (index) => {
  //     let data = stepperData;
  //     for (var i = 0; i < data.length; i++) {
  //       if (i === index) {
  //         data[i] = { ...data[i], active: true, complet: false };
  //       } else {
  //         if (i < index) {
  //           data[i] = { ...data[i], active: false, complet: true };
  //         } else {
  //           data[i] = { ...data[i], active: false, complet: false };
  //         }
  //       }
  //     }
  //     console.log("ftftftftf", data);
  //     setData([...data]);
  //   };

  useEffect(() => {
    console.log("console", migrationStepper);
    let data = stepperData;
    for (var i = 0; i < data.length; i++) {
      if (i === migrationStepper) {
        data[i] = { ...data[i], active: true, complet: false };
      } else {
        if (i < migrationStepper) {
          data[i] = { ...data[i], active: false, complet: true };
        } else {
          data[i] = { ...data[i], active: false, complet: false };
        }
      }
    }
    setData([...data]);
  }, [migrationStepper]);
  useEffect(() => {
    setData([...data]);
  }, []);
  useEffect(() => {}, [stepperData]);

  return (
    <>
      <div className="horizontal-stepper">
        <div className="horizontal-stepper-container">
          {stepperData.map((item, i) => {
            return (
              <div className="stepper-content-wraper">
                <div
                  className={`${
                    item.active ? "active-stepper" : ""
                  } stepper-content`}
                >
                  <span
                    className={`${
                      item.active
                        ? "active-steper-seriol"
                        : item.complet
                        ? "completed"
                        : ""
                    } stepper-seriol`}
                  >
                    {item.complet ? (
                      <img src={Check} />
                    ) : item.active ? (
                      i + 1
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={`${
                      item.active ? "active-stepper-name" : ""
                    } stepper-name`}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="horizontal-stepper-pagecontainer">
          {stepperData.map((item, index) => {
            let Page = item.Page;
            return <div>{item.active === true && <Page />}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default HorizontalStepper;
