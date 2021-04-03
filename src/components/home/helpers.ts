import { Ifavorite } from './models';
export function capitalize(str: string) {
  str = str.toLowerCase();
  return str[0].toUpperCase() + str.substr(1);
}

export function checkInArray(id: number, list: Array<Ifavorite>) {
  if (list.length == 0) return false;
  const findId = list.find(f => {
    return f.id == id;
  });
  return findId ? true : false;
}
