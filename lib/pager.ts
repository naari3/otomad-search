export const MAX_OFFSET = 1600;
export const MAX_SS_OFFSET = 100000;

export const maxPageNumber = (
  per: number,
  max_offset: number = MAX_OFFSET
): number => {
  return Math.ceil(max_offset / per) + 1;
};

export const calcPageNumber = (per: number, count: number): number => {
  if (count === 0) {
    return 0;
  }
  return Math.ceil(count / per);
};

export const actualMaxPageNumber = (
  per: number,
  count: number,
  max_offset: number = MAX_OFFSET
): number =>
  Math.min(maxPageNumber(per, max_offset), calcPageNumber(per, count));
