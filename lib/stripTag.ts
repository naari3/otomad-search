import { differenceInBusinessDays } from "date-fns";
// import { JSDOM } from "jsdom";

// だいぶ弱い気がするけど、JSDOMを使わない方法として有力(一番上に出てきた)のでこれを使う
export default function stripTag(description: string): string {
  if (!description) return "";
  return description.replace(/(<([^>]+)>)/gi, "");
  // const div = new JSDOM("").window.document.createElement("div");
  // div.innerHTML = description;
  // return div.textContent || div.innerText || "";
}
