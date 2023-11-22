import React, { useEffect, useState } from 'react';
import { Chart, DoughnutController, ArcElement, Legend, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the required controllers and elements
Chart.register(DoughnutController, ArcElement, Legend, Title, Tooltip);

const Graph = ({ updateList }) => {
  const [progressData, setProgressData] = useState({
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const completedCount = updateList.filter((update) => update.completed).length;
    const remainingCount = updateList.length - completedCount;

    setProgressData({
      labels: ['Completed', 'Remaining'],
      datasets: [
        {
          data: [completedCount, remainingCount],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          hoverOffset: 4,
        },
      ],
    });
  }, [updateList]);

  return (
    <div className="w-[200px] h-[200px]">
      <Doughnut data={progressData} />
    </div>
  );
};

export default Graph;
