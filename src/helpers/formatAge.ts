// Formatting video age
export function formatAge(date: string): string {
  const pubDate = new Date(date);
  const today = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const diffInTime = today.getTime() - pubDate.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  const diffInWeeks = Math.round(diffInTime / oneWeek);
  const diffInYears = Math.round(diffInTime / oneYear);
  if (diffInDays == 1) {
    return '1 day ago';
  };
  if (diffInDays < 7) {
    return diffInDays + ' days ago';
  };
  if (diffInDays >= 7 && diffInDays < 14) {
    return '1 week ago';
  };
  if (diffInDays >= 14 && diffInDays < 365) {
    return diffInWeeks + ' weeks ago';
  };
  if (diffInDays >= 365 && diffInDays < 365 * 2) {
    return '1 year ago';
  };
  return diffInYears + ' years ago';
};
