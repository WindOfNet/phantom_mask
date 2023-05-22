import { getDbConnection } from "./db";
import dayjs from "dayjs";

const listPharmacy = async (time: string, dayOfWeek?: number) => {
  const cn = await getDbConnection();
  let queryStr = `
    select * from pharmacyOpeningInfo
    where ( 
      str_to_date(?, '%Y-%m-%d %H:%i:%s') >= str_to_date(concat(?, ' ', openTime), '%Y-%m-%d %H:%i:%s')
      and
      str_to_date(?, '%Y-%m-%d %H:%i:%s') <= str_to_date(concat(IF(closeTime < openTime, date_add(?, interval 1 day), ?), ' ', closeTime), '%Y-%m-%d %H:%i:%s')
    )`;

  if (dayOfWeek) {
    queryStr += " and dayOfWeek = ?";
  }

  const today = dayjs();
  const todayString = today.format("YYYY-MM-DD");
  const queryTimeString = `${todayString} ${time}`;
  const [result] = await cn.query(queryStr, [
    queryTimeString,
    todayString,
    queryTimeString,
    todayString,
    todayString,
    dayOfWeek,
  ]);
  return result;
};

export default { listPharmacy };
