import moment from 'moment';

export const RelativeTime = (date: string) => {
    const isoStr = date;
    const newDate = new Date(isoStr);
    const timestamp = newDate.getTime();
    const difference = new Date().getTime() - new Date(timestamp).getTime();
    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    if (daysDifference < 1) {
        return moment(timestamp).startOf('hour').fromNow();
    } else {
        return moment(timestamp).startOf('day').fromNow();
    }
}


