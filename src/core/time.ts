export function isoToStandard(value: string): string {
  try {
    const date = new Date(value);
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateTimeFormat.format(date);
  } catch (error) {
    console.error("isoToStandard: ", error);
    return "[ERROR]";
  }
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthName(value: string): string {
  const date = new Date(value);
  return monthNames[date.getMonth() + 1];
}
