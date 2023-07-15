import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraphData = ({ expense, income }) => {
  const data = {
    labels: ['Расходы', 'Доходы'],
    datasets: [
      {
        label: 'грн',
        data: [expense, income],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(14, 237, 73, 0.321)'],
        borderColor: ['rgba(255, 99, 132, 1)', '#065523'],
        borderWidth: 1,
      },
    ],
  };
  return <Pie width={400} height={200} options={{ maintainAspectRatio: false }} data={data} />;
};
