//total,min,max, avg
const calcTransaction = (arr) => {
  const tranArr = arr?.map((data) => data?.amount);

  //общая
  const sumTotal = arr
    ?.map((data) => data?.amount)
    .reduce((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0);

  //среднее
  const avg = sumTotal / 2;

  // мин
  const min = Math.min(...tranArr);

  // макс
  const max = Math.max(...tranArr);

  return {
    sumTotal,
    avg,
    min,
    max,
  };
};

export default calcTransaction;
