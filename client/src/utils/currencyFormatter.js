const currencyFormatter = (symbol, amount) => {
  return new Intl.NumberFormat('ua', {
    style: 'currency',
    currency: symbol,
  }).format(amount);
};

export default currencyFormatter;
