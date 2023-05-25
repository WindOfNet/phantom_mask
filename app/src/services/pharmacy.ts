import { getDbConnection } from "./db";
import dayjs from "dayjs";

const listPharmacies = async (time: string, dayOfWeek?: number) => {
  const cn = await getDbConnection();
  let cm = `
    select pharmacyName, openTime, closeTime, dayOfWeek from pharmacyOpeningInfo
    where ( 
      str_to_date(?, '%Y-%m-%d %H:%i:%s') >= str_to_date(concat(?, ' ', openTime), '%Y-%m-%d %H:%i:%s')
      and
      str_to_date(?, '%Y-%m-%d %H:%i:%s') <= str_to_date(concat(IF(closeTime < openTime, date_add(?, interval 1 day), ?), ' ', closeTime), '%Y-%m-%d %H:%i:%s')
    )`;

  if (dayOfWeek) {
    cm += " and dayOfWeek = ?";
  }

  const today = dayjs();
  const todayString = today.format("YYYY-MM-DD");
  const queryTimeString = `${todayString} ${time}`;
  const [result] = await cn.query(cm, [
    queryTimeString,
    todayString,
    queryTimeString,
    todayString,
    todayString,
    dayOfWeek,
  ]);
  return result;
};

const listPharmacyMasks = async (
  pharmacyName: string,
  sortBy?: string,
  sortDirection?: string,
) => {
  const cn = await getDbConnection();
  let cm = `
    select maskName, price from pharmacyMask
    where pharmacyName = ?`;

  if (sortBy) {
    cm += `
      order by ?? ${sortDirection}`;
  }

  const [result] = await cn.query(cm, [pharmacyName, sortBy, sortDirection]);
  return result;
};

const listPharmaciesMasks = async (minPrice: number, maxPrice: number) => {
  const cn = await getDbConnection();
  let cm = `
    select * from pharmacyMask
    where price >= ? and price <= ?`;

  const [result] = await cn.query(cm, [minPrice, maxPrice]);
  return result;
};

export default { listPharmacies, listPharmacyMasks, listPharmaciesMasks };
