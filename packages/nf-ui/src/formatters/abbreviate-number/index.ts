const HUNDRED = 100;
const THOUSAND = 1000;
const HUNDRED_THOUSAND = THOUSAND * HUNDRED;
const ONE_MILLION = THOUSAND * THOUSAND;

export const abbreviateNumberWithScale = (shifted: number, suffix: string): string => {
  const numberOfDigits = Math.floor(Math.log10(shifted));
  return `${shifted.toPrecision(numberOfDigits + 2)}${suffix}`;
};

export const abbreviateCurrencyNumber = (num: number | string): string => {
  let normalizedValue;
  if (typeof num === 'string') {
    normalizedValue = parseInt(num, 10);
  } else {
    normalizedValue = num;
  }

  // truncate all whole millions (i.e. 2M) as well as millions/hundred thousand combinations (i.e. 2.3M)
  if (
    normalizedValue >= ONE_MILLION &&
    (normalizedValue % ONE_MILLION === 0 || normalizedValue % HUNDRED_THOUSAND === 0)
  ) {
    const shifted = normalizedValue / ONE_MILLION;
    const numberOfDigits = Math.floor(Math.log10(shifted));
    return `${shifted.toPrecision(numberOfDigits + 2)}M`;
  }

  // truncate all whole thousands (i.e. 30K) as well as thousand/hundred combinations (i.e. 2.3k)
  if (
    normalizedValue < ONE_MILLION &&
    normalizedValue >= THOUSAND &&
    (normalizedValue % THOUSAND === 0 || normalizedValue % HUNDRED === 0)
  ) {
    const shifted = normalizedValue / THOUSAND;
    const numberOfDigits = Math.floor(Math.log10(shifted));
    return `${shifted.toPrecision(numberOfDigits + 2)}k`;
  }

  // match expression if it is followed by a sequence of three number sets and a period
  // e.g. 1234 --> "1,234.00"
  // e.g. 12345.67 --> "12,345.67"
  return `${normalizedValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};
