import type { Component } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Chart, registerables } from "chart.js";

const PieChart: Component<{
  title: string;
  labels: Array<string>;
  data: Array<number>;
}> = component$(({ labels, data, title }) => {
  const myChart = useSignal<HTMLCanvasElement>();

  useVisibleTask$(() => {
    if (myChart?.value) {
      Chart.register(...registerables);
      new Chart(myChart.value, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              label: title,
              data,
            },
          ],
        },
      });
    }
  });

  return <canvas ref={myChart} />;
});

export default PieChart;
