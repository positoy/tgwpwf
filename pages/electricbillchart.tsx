import { FunctionPlotDatum } from "function-plot/dist/types";
import React, { useEffect, useState } from "react";

const chart: {
  [voltage: string]: {
    [season: string]: FunctionPlotDatum[];
  };
} = {
  low: {
    summer: [
      // 하계용 저압전기
      {
        fn: "910 + 112.0 * x",
        range: [0, 300],
        color: "blue",
      },
      {
        fn: "1600 + 112.0 * 300 + 206.6 * (x - 300)",
        range: [300, 450],
        color: "blue",
      },
      {
        fn: "7300 + 112.0 * 300 + 206.6 * 150 + 299.3 * (x - 450)",
        range: [450, 600],
        color: "blue",
      },
    ],
    nonsummer: [
      // 비하계용 저압전기
      {
        fn: "910 + 112.0 * x",
        range: [0, 200],
        color: "green",
      },
      {
        fn: "1600 + 112.0 * 200 + 206.6 * (x - 200)",
        range: [200, 400],
        color: "green",
      },
      {
        fn: "7300 + 112.0 * 200 + 206.6 * 200 + 299.3 * (x - 400)",
        range: [400, 600],
        color: "green",
      },
    ],
  },
  high: {
    summer: [
      // 하계용 고압전기
      {
        fn: "730 + 97.0 * x",
        range: [0, 300],
        color: "orange",
      },
      {
        fn: "1260 + 97.0 * 300 + 166.0 * (x - 300)",
        range: [300, 450],
        color: "orange",
      },
      {
        fn: "6060 + 97.0 * 300 + 166.0 * 150 + 234.3 * (x - 450)",
        range: [450, 600],
        color: "orange",
      },
    ],
    nonsummer: [
      // 비하계용 고압전기
      {
        fn: "730 + 97.0 * x",
        range: [0, 200],
        color: "purple",
      },
      {
        fn: "1260 + 97.0 * 200 + 166.0 * (x - 200)",
        range: [200, 400],
        color: "purple",
      },
      {
        fn: "6060 + 97.0 * 200 + 166.0 * 200 + 234.3 * (x - 400)",
        range: [400, 600],
        color: "purple",
      },
    ],
  },
};

export default function Home() {
  const [season, setSeason] = useState<"summer" | "nonsummer">("nonsummer");
  const [voltage, setVoltage] = useState<"low" | "high">("high");
  const [usage, setUsage] = useState<number>(0);

  useEffect(() => {
    import("function-plot").then((functionPlot) => {
      functionPlot.default({
        target: "#electric-bill-chart",
        data: chart[voltage][season],
        annotations: [
          {
            x: 123,
            y: 123,
            type: "point",
            color: "red",
            text: "hello world",
          },
        ],
        xAxis: {
          label: "전기 사용량 (kWh)",
          domain: [0, 600],
        },
        yAxis: {
          label: "전기 요금 (원)",
          domain: [0, 200000],
        },
        width: 800,
        height: 500,
      });
    });
  }, [season, voltage]);

  const handleVoltageChange = (event) => {
    setVoltage(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleUsageChange = (event) => {
    setUsage(event.target.value);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>전기요금 그래프</h1>
      <div id="electric-bill-chart"></div>
      <div>
        <label>
          <input
            type="radio"
            value="low"
            checked={voltage === "low"}
            onChange={handleVoltageChange}
          />
          저압전력
        </label>
        <label>
          <input
            type="radio"
            value="high"
            checked={voltage === "high"}
            onChange={handleVoltageChange}
          />
          고압전력
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="summer"
            checked={season === "summer"}
            onChange={handleSeasonChange}
          />
          하계
        </label>
        <label>
          <input
            type="radio"
            value="nonsummer"
            checked={season === "nonsummer"}
            onChange={handleSeasonChange}
          />
          동계
        </label>
      </div>
      <div>
        <input type="text" onChange={handleUsageChange}></input>
        kwh
      </div>
    </div>
  );
}
