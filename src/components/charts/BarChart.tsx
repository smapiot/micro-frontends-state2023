import type { Component } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Chart, registerables } from "chart.js";
import { backgroundColor, borderColor } from "./colors";

const BarChart: Component<{
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
        type: "bar",
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
        options: {
          indexAxis: labels.length > 5 ? "y" : "x",
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  });

  return (
    <div style={`margin: auto; max-width: 800px; padding: 0 2rem;`}>
      <canvas ref={myChart} />
    </div>
  );
});

export default BarChart;
