import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import './BalanceChart.css';
import { FaAngleDown } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const BalanceChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Balance',
        data: [10000, 15000, 20000, 25000, 22000, 55000, 23000, 27000, 30000, 32000, 25000, 27000],
        fill: false,
        borderColor: '#7367f0',
        backgroundColor: '#7367f0',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹ ${tooltipItem.formattedValue}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value / 1000}k`,
        },
        beginAtZero: true,
      },
    },

  };

  return (
    <div className="balance-chart">
      <div className="chart-header d-flex justify-content-between align-items-center">
        <h5>Total Balance</h5>
        <div className="dropdown">
          <button
            className="btn btn-light border  "
            type="button"
            id="timeframeDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Month <FaAngleDown />
            {/* Display "Month" instead of the selected option */}
          </button>
          <ul className="dropdown-menu text-secondary" aria-labelledby="timeframeDropdown">
            <div className="">
              <input type="radio" id="last-week" name="colors" value="Last-week" style={{ Color: 'fd6208' }} />
              <label className="ms-1" htmlFor="last-week">Last week</label>
            </div>
            <div className="">
              <input type="radio" id="last-month" name="colors" value="Last-month" />
              <label className="ms-1" htmlFor="last-month">Last month</label>
            </div>
            <div className="">
              <input type="radio" id="last-year" name="colors" value="Last-year" />
              <label className="ms-1" htmlFor="last-year">Last Year</label>
            </div>
          </ul>

        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default BalanceChart;


{/* <input type="radio" id="Red" name="colors" defaultValue="Red" value="High" />
<label className='ms-1' htmlFor="Red">High</label> */}