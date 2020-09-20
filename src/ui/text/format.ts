const FormatQuantity = (n: number): string => {
  let a = '';

  if (n > 1_000_000) {
    n = n / 1_000_000;
    a = 'M';
  } else if (n > 1_000_000_000) {
    n = n / 1_000_000_000;
    a = 'G';
  } else if (n > 1_000_000_000_000) {
    n = n / 1_000_000_000_000;
    a = 'T';
  }

  n = Math.floor(n);

  let str = n.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });

  return str + a;
};

export { FormatQuantity };
