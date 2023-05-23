import { getDbConnection } from "./db";
import dayjs from "dayjs";

const getTransactionRank = async (
  limit: number,
  startDate?: string,
  endDate?: string,
) => {
  const cn = await getDbConnection();
  let cm = `select userName, sum(transactionAmount) as total from userPurchaseHistory where 1 = 1`;
  const param = [];

  if (startDate) {
    cm += `
      and str_to_date(transactionDate, '%Y-%m-%d') >= str_to_date(?, '%Y-%m-%d')`;
    param.push(startDate);
  }

  if (endDate) {
    cm += `
      and str_to_date(transactionDate, '%Y-%m-%d') <= str_to_date(?, '%Y-%m-%d')`;
    param.push(endDate);
  }

  cm += `
    group by userName
    order by total desc
    limit ${limit}`;

  const [result] = await cn.query(cm, param);
  return result;
};

export default { getTransactionRank };
