import { getDbConnection } from "./db";
import { RowDataPacket } from "mysql2";

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

const purchase = async (user: string, pharmacy: string, mask: string) => {
  const cn = await getDbConnection();
  const [userCashResult] = await cn.query<RowDataPacket[]>(
    `select cashBalance from user where name = ?`,
    [user],
  );

  if (userCashResult.length === 0) {
    return { isSuccess: false, payload: { message: "user not exists" } };
  }

  const [maskResult] = await cn.query<RowDataPacket[]>(
    `select price from pharmacyMask where pharmacyName = ? and maskName = ?`,
    [pharmacy, mask],
  );

  if (maskResult.length === 0) {
    return { isSuccess: false, payload: { message: "mask not exists" } };
  }

  const userCash: number = userCashResult[0]["cashBalance"];
  const maskPrice: number = maskResult[0]["price"];
  if (userCash < maskPrice) {
    return {
      isSuccess: false,
      payload: {
        message: "user cash insufficient",
        payload: { cashBalance: userCash, maskPrice },
      },
    };
  }

  await cn.beginTransaction();
  await cn.query(
    `update user set cashBalance = cashBalance - ${maskPrice} where name = ?`,
    [user],
  );
  await cn.query(
    `update pharmacy set cashBalance = cashBalance + ${maskPrice} where name = ?`,
    [pharmacy],
  );
  await cn.query(
    `insert into userPurchaseHistory values(?, ?, ?, ${maskPrice}, now())`,
    [user, pharmacy, mask],
  );
  await cn.commit();

  return {
    isSuccess: true,
  };
};

export default { getTransactionRank, purchase };
