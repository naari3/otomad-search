import { format } from "date-fns";
import parseLimitedFloat from "./parseLimitedFloat";

export const parseQueryToString = (target: string | string[]): string | null => {
  const result = Array.isArray(target) ? target[0] : target;
  return result ? result : null;
};

export const parseQueryToInt = (target: string | string[]): number | null => {
  const result = parseInt(parseQueryToString(target));
  return Number.isNaN(result) ? null : result;
};

export const parseQueryToLimitedFloat = (target: string | string[]): number | null => {
  const result = parseLimitedFloat(parseQueryToString(target));
  return Number.isNaN(result) ? null : result;
};

export const roundNumber = (num: number): number => {
  if (num > 2147483647) return null;
  return num;
};

export const roundDate = (datestr: string): string => {
  const unixTime = Date.parse(datestr);
  if (Number.isNaN(unixTime)) return null;
  const date = new Date(unixTime);

  if (date.getFullYear() < 2007) {
    return null;
  }

  if (date.getFullYear() > new Date().getFullYear()) {
    return null;
  }

  return format(date, "yyyy-MM-dd'T'HH:mm");
};
