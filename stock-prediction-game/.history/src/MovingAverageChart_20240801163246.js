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
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
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
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Stock Price Chart',
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM dd'
          }
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        ticks: {
          font: {
            size: 10
          }
        },
        beginAtZero: false
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