const parseLimitedFloat = (target: any): number => {
  if (!target) {
    return null;
  }
  let [big, small] = target.split(".");
  if (small === undefined) small = "0";
  if (big === undefined) big = "0";
  return parseFloat([big, small].join("."));
};
export default parseLimitedFloat;
