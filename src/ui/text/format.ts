const FormatNumber = (n: number): string => {
  // For some reasons I don't have time
  // to investigate, this solves some issues.
  n = Number(n);

  let str = n.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });

  return str;
};

const ShortenNumber = (n: number): string => {
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

  n = Math.floor(n * 10) / 10;

  let str = n.toLocaleString('en-US', {
    maximumFractionDigits: 1,
  });

  return str + a;
};

const FormatMoney = (n: number): string => {
  // For some reasons I don't have time
  // to investigate, this solves some issues.
  n = Number(n);

  let str = n.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return str;
};

const FormatPrice = (n: number): string => {
  // For some reasons I don't have time
  // to investigate, this solves some issues.
  n = Number(n);

  let str = n.toLocaleString('en-US', {
    maximumFractionDigits: 8,
  });

  return str;
};

export { FormatNumber, ShortenNumber, FormatMoney, FormatPrice };
