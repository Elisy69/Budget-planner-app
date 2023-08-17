export function getDecimalFixedNumber(num: string) {
  if (Number(num) === 0) return 0;
  return Number(num).toFixed(2);
}
