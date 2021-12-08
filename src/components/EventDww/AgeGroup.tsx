import { DateTime } from "luxon";

export const AgeGroup = (eventDate: string, birthDate?: string) => {
  if (birthDate) {
    const ageAtEvent = Math.floor(
      DateTime.fromISO(eventDate)
        .diff(DateTime.fromISO(birthDate), 'years')
        .years);
    if (ageAtEvent <= 8) { return "baby" };
    if (ageAtEvent <= 12) { return "kids" };
    if (ageAtEvent <= 17) { return "juniors" };
    if (ageAtEvent <= 39) { return "adults" };
    return "seniors";
  }
};