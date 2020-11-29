export const MAX_OFFSET = 1600;

export const maxPageNumber = (per: number): number => {
  return Math.ceil(MAX_OFFSET / per) + 1;
};

export const calcPageNumber = (per: number, count: number) => {
  if (count === 0) {
    return 0;
  }
  return Math.ceil(count / per);
};

export const actualMaxPageNumber = (per: number, count: number) =>
  Math.min(maxPageNumber(per), calcPageNumber(per, count));
