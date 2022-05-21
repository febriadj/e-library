import Chart from 'chart.js/auto';

export default ({
  datasets,
  ctx,
  payload,
}) => {
  const chartData = [...payload.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))];

  const chartStatus = Chart.getChart(ctx);

  if (chartStatus) {
    chartStatus.destroy();
  }

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.map((item) => item[datasets.label]),
      datasets: [
        {
          label: 'Most Stock',
          backgroundColor: [
            '#434d5cbb', '#434d5c80',
          ],
          maxBarThickness: 40,
          data: chartData.map((item) => item[datasets.data]),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            display: false,
          },
        },
      },
    },
  });

  return chart;
}
