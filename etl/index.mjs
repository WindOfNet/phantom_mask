import dotenv from "dotenv";
import mysql from "mysql2/promise.js";
import pharmacyData from "../data/pharmacies.json" assert { type: "json" };
import userData from "../data/users.json" assert { type: "json" };

dotenv.config();

(async () => {
  const connection = await mysql.createConnection({
    host: process.env["DB_HOST"],
    user: process.env["DB_USER"],
    password: process.env["DB_PWD"],
    database: process.env["DB_DATABASE"],
  });

  await connection.beginTransaction();

  for (const { name, cashBalance, openingHours, masks } of pharmacyData) {
    await connection.query(`insert into pharmacy values (?, ?);`, [
      name,
      cashBalance,
    ]);

    const daysOfWeekMap = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thur: 4,
      Fri: 5,
      Sat: 6,
      Sun: 7,
    };

    openingHours.split(" / ").forEach((openingData) => {
      const openingTime = /(\d{2}:\d{2} - \d{2}:\d{2})/.exec(openingData)[0];
      const daysStr = openingData.replace(openingTime, "").trim();
      const days = [];
      if (daysStr.includes(" - ")) {
        const r = daysStr.split(" - ");
        const start = daysOfWeekMap[r[0]];
        const end = daysOfWeekMap[r[1]];
        days.push(...[...Array(end + 1 - start).keys()].map((n) => n + start));
      } else {
        days.push(...daysStr.split(", ").map((x) => daysOfWeekMap[x]));
      }

      days.forEach(async (day) => {
        await connection.query(
          `insert into pharmacyOpeningInfo values (?, ?, ?, ?);`,
          [
            name,
            day,
            openingTime.split(" - ")[0].replace(":", ""),
            openingTime.split(" - ")[1].replace(":", ""),
          ],
        );
      });
    });

    for (const { name: maskName, price } of masks) {
      await connection.query(`insert into pharmacyMask values (?, ?, ?)`, [
        name,
        maskName,
        price,
      ]);
    }
  }

  for (const { name, cashBalance, purchaseHistories } of userData) {
    await connection.query(`insert into user values(?, ?)`, [
      name,
      cashBalance,
    ]);

    for (const {
      pharmacyName,
      maskName,
      transactionAmount,
      transactionDate,
    } of purchaseHistories)
      await connection.query(
        `insert into userPurchaseHistory values(?, ?, ?, ?, ?)`,
        [name, pharmacyName, maskName, transactionAmount, transactionDate],
      );
  }

  await connection.commit();
  await connection.end();
})();
