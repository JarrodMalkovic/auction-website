const centsToDollars = (cents) => {
  const dollars = cents / 100;
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export { centsToDollars };
