export const formatTimeStringAddColon = (time: string): string => {
  if (!/^\d{4}$/.test(time)) return time;
  return `${time.substring(0, 2)}:${time.substring(2)}`;
};
