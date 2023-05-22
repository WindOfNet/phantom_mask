const isValidTimeFormat = (timeString: string) => {
  const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeString);
};

export default isValidTimeFormat;
