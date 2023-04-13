import moment from 'moment';

export const toRelativeTime = (date: string) => {
  const isoStr = date;
  const newDate = new Date(isoStr);
  const timestamp = newDate.getTime();
  const difference = new Date().getTime() - new Date(timestamp).getTime();
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  const minutesDifference = Math.floor(difference / 1000 / 60);
  const secondsDifference = Math.floor(difference / 1000);

  if (daysDifference < 1) {
    if (minutesDifference < 60) {
      if (secondsDifference < 60) {
        return moment(timestamp).startOf('second').fromNow();
      }
      return moment(timestamp).startOf('minute').fromNow();
    }
    return moment(timestamp).startOf('hour').fromNow();
  } else {
    return moment(timestamp).startOf('day').fromNow();
  }
};
