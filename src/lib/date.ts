export const toEpoch = (date: Date | string) => {
  return Math.floor(new Date(date).getTime() / 1000);
};

const date = { toEpoch };

export default date;
