import { differenceInBusinessDays } from "date-fns";
import { JSDOM } from "jsdom";

export default function stripTag(description: string): string {
  const div = new JSDOM("").window.document.createElement("div");
  div.innerHTML = description;
  return div.textContent || div.innerText || "";
}
