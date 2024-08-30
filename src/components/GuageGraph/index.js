import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import "./index.scss";

const settings = {
  width: 200,
  height: 200,
  value: 75,
  startAngle: 150,
  endAngle: 450,
};

const GaugeGraph = ({ config }) => {
  const tranformValue = ({ value }) => `${value}%`;
  return (
    <Gauge
      width={config?.width || settings.width}
      height={config?.height || settings.height}
      value={config?.value || settings.value}
      startAngle={config?.startAngle || settings.startAngle}
      endAngle={config?.endAngle || settings.endAngle}
      cornerRadius="0%"
      text={tranformValue(config || settings)}
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 26,
        },
        [`& .${gaugeClasses.valueText} text`]: {
          fill: "#18864b",
          fontWeight: "600",
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#2cc7c0",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: "#cccccc",
        },
      })}
    />
  );
};

export default GaugeGraph;
