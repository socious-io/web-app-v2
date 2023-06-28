export function getFlooredFixed(value: number, toFixed: number) {
  return Number((Math.floor(value * Math.pow(10, toFixed)) / Math.pow(10, toFixed)).toFixed(toFixed));
}
