import moment from 'moment';

const FORMAT = [{value: 60, title: 'phút'}, {value: 24, title: 'giờ'}];

class TimeUtils {
  static durationFormat = (difference:any) => {
    let duration = [];
    difference = Math.floor(difference / 60);
    for (const item of FORMAT) {
      const result = difference % item.value;
      difference = Math.floor(difference / item.value);
      if (result !== 0) {
        duration.unshift(`${result} ${item.title}`);
      }
      if (difference === 0) {
        break;
      }
    }
    if (difference !== 0) {
      duration.unshift(`${difference} ngày`);
    }
    return duration.join(' ');
  };

  static getNextDays = (start:any, days: Number) => {
    let nextDays = [];
    for (let index : any = 1; index < days; index++) {
      nextDays.push(moment(start).add(index, 'days'));
    }
    return nextDays;
  };

  static isSameDay(currentMessage: any, diffMessage:any) {
    if (!diffMessage || !diffMessage.createdTime) {
      return false;
    }
    const currentCreatedAt = moment(currentMessage.createdTime);
    const diffCreatedAt = moment(diffMessage.createdTime);
    if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
      return false;
    }
    return currentCreatedAt.isSame(diffCreatedAt, 'day');
  }
}

export default TimeUtils;
