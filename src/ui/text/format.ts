const FormatQuantity = (n: number): string => {
  let a = '';

  if (n >= 1_000_000_000_000_000_000) {
    n = n / 1_000_000_000_000_000_000;
    a = 'E';
  } else if (n >= 1_000_000_000_000_000) {
    n = n / 1_000_000_000_000_000;
    a = 'P';
  } else if (n >= 1_000_000_000_000) {
    n = n / 1_000_000_000_000;
    a = 'T';
  } else if (n >= 1_000_000_000) {
    n = n / 1_000_000_000;
    a = 'G';
  } else if (n >= 1_000_000) {
    n = n / 1_000_000;
    a = 'M';
  }

  let str = (Math.floor(n * 10) / 10).toString();

  return str + a;
};

export { FormatQuantity };
