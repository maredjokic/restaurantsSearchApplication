export function useTimeOptions() {
  const timeOptions = Array.from({ length: 9 }, (_, i) => {
    const hour = 12 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return { timeOptions };
}
