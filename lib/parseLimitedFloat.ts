import { parse } from "path";

const parseLimitedFloat = (target: any) => {
  if (!target) {
    return null;
  }
  let [big, small] = target.split(".");
  if (small === undefined) small = "0";
  return parseFloat([big, small[0]].join("."));
};
export default parseLimitedFloat;
