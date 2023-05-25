import { getDbConnection } from "./db";

const search = async (searchTerm: string) => {
  const cn = await getDbConnection();
  const cm = `
    select a.pharmacyName, a.maskName, b.price, count(1) as sold  
    from userPurchaseHistory a
      join pharmacyMask b on 
        a.pharmacyName = b.pharmacyName
        and a.maskName = b.maskName 
    where a.pharmacyName like ? or a.maskName like ?
    group by pharmacyName, maskName
    order by sold desc, price asc`;

  const [result] = await cn.query(cm, [`%${searchTerm}%`, `%${searchTerm}%`]);
  return result;
};

export default { search };
