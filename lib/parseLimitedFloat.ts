import { parse } from "path";

const parseLimitedFloat = (target: any) => {
  if (!target) {
    return null;
  }
  const [big, small] = target.split(".");
  return parseFloat([big, small[0]].join("."));
};
export default parseLimitedFloat;
