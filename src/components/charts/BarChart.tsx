import type { Component } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Chart, registerables } from "chart.js";

const BarChart: Component<{
  title: string;
  labels: Array<string>;
  data: Array<number>;
}> = component$(({ labels, data, title }) => {
  const myChart = useSignal<HTMLCanvasElement>();

  useVisibleTask$(() => {
    if (myChart?.value) {
      Chart.register(...registerables);
      new Chart(myChart.value, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: title,
              data,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  });

  return <canvas ref={myChart} />;
});

export default BarChart;
