import React from 'react';
import {Chart, ArcElement} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);

const data = {
  labels: ['Progress', 'Remaining',
   'Red',
      'Blue'
      
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [80,50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
        
      ],
      hoverOffset: 4
    }]
  };

export default function Graph() {
  return (
    <div className='w-[200px] h-[200px]'>  <Doughnut data={data} ></Doughnut></div>
  
  )
}

