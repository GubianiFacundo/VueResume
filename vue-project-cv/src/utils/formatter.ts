export const formatDate = (dateString: Date): string => {
  const date = new Date(`${dateString}T04:00:00Z`);
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
};