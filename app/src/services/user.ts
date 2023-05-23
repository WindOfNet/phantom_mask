import { getDbConnection } from "./db";

const getTransactionRank = async (
  limit: number,
  startDate: string,
  endDate: string,
) => {
  const cn = await getDbConnection();
  let cm = `
    select userName, sum(transactionAmount) as total from userPurchaseHistory 
    where transactionDate >= str_to_date(?, '%Y-%m-%d') and transactionDate <= str_to_date(?, '%Y-%m-%d')`;

  cm += `
    group by userName
    order by total desc
    limit ${limit}`;

  const [result] = await cn.query(cm, [startDate, endDate]);
  return result;
};

export default { getTransactionRank };
