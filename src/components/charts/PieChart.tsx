import type { Component } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Chart, registerables } from "chart.js";
import { backgroundColor, borderColor } from "./colors";

const PieChart: Component<{
  title: string;
  labels: Array<string>;
  data: Array<number>;
}> = component$(({ labels, data, title }) => {
  const myChart = useSignal<HTMLCanvasElement>();

  useVisibleTask$(() => {
    if (myChart?.value) {
      Chart.register(...registerables);
      Chart.defaults.color = "#fff";
      new Chart(myChart.value, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              label: title,
              data,
              backgroundColor,
              borderColor,
              borderWidth: 1,
            },
          ],
        },
      });
    }
  });

  return (
    <div style="margin: auto; max-width: 600px; padding: 0 2rem;">
      <canvas ref={myChart} />
    </div>
  );
});

export default PieChart;
