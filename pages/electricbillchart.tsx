import React, { useEffect } from "react";
import functionPlot from "function-plot";

export default function ElectricBillChart() {
  useEffect(() => {
    functionPlot({
      target: "#electric-bill-chart",
      data: [
        {
          fn: "910 + 112.0 * x",
          range: [0, 200],
          closed: true,
        },
        {
          fn: "1_600 + 112.0 * 200 + 206.6 * (x - 200)",
          range: [200, 400],
          closed: true,
        },
        {
          fn: "7_300 + 112.0 * 200 + 206.6 * 200 + 299.3 * (x - 400)",
          range: [400, 600],
          closed: true,
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
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>전기요금 그래프</h1>
      <div id="electric-bill-chart"></div>
    </div>
  );
}
