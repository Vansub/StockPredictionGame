import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MovingAverageChart = ({ data, width, height }) => {
  if (!data || !data.dates || !data.prices) {
    return <div>No data available for chart</div>;
  }

  // Limit the data to the last 30 points for a more compact view
  const limitedDates = data.dates.slice(-30);
  const limitedPrices = data.prices.slice(-30);

  const chartData = {
    labels: limitedDates,
    datasets: [
      {
        label: 'Stock Price',
        data: limitedPrices,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 1, // Make points smaller
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows us to set a specific height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 10 // Smaller font for legend
          }
        }
      },
      title: {
        display: true,
        text: 'Stock Price Chart',
        font: {
          size: 14 // Smaller font for title
        }
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 8 // Smaller font for x-axis labels
          },
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        ticks: {
          font: {
            size: 8 // Smaller font for y-axis labels
          }
        }
      }
    }
  };

  return (
    <div style={{ width: width, height: height }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default MovingAverageChart;