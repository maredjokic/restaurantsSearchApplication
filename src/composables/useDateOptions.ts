export function useDateOptions(days = 7) {
  const dateOptions = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return { dateOptions };
}
