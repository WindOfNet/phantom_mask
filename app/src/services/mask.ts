import { getDbConnection } from "./db";

const getTransactions = async (startDate?: string, endDate?: string) => {
  const cn = await getDbConnection();
  let cm = `
    select maskName, count(1), sum(transactionAmount) from userPurchaseHistory
    where transactionDate >= str_to_date(?, '%Y-%m-%d') and transactionDate <= str_to_date(?, '%Y-%m-%d')
    group by maskName`;

  const [result] = await cn.query(cm, [startDate, endDate]);
  return result;
};

export default { getTransactions };
