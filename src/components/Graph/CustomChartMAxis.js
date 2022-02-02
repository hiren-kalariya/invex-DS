import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CustomChartMAxis = ({chartLables, dataSets}) => {

  const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Invex Chart',
      },
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',

            grid: {
                drawOnChartArea: false,
            },
        },
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 0
            }
        },
    }
  };

  // console.log(chartLables);
  // console.log(dataSets);

  const data = {
    labels:chartLables,
    datasets: dataSets,
  };

  return (
    <div style={{justifyContent:"space-around"}} className=' card d-flex flex-row flex-wrap align-items-center w-100 p-4 mt-4 mb-2'>
      <Line options={options} data={data} />
    </div>
  );
};

export default CustomChartMAxis;
