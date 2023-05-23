import { CustomValidator } from "express-validator";
import dayjs from "dayjs";

const isValidDateFormat: CustomValidator = (dateString: string) => {
  return dayjs(dateString, "YYYYMMDD").isValid();
};

export default isValidDateFormat;
