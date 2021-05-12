import moment from 'moment';

export function setDateLocal(date: Date) {
  return moment(date).local().toDate();
}
