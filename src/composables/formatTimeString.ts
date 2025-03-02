export const formatTimeStringAddColon = (time: string): string => {
  // If the time doesn't match the expected format (4 digits), return the original string
  if (!/^\d{4}$/.test(time)) return time;
  return `${time.substring(0, 2)}:${time.substring(2)}`;
};
