import { parseISO, format } from "date-fns";
import { ja } from "date-fns/locale";

export default function formattedDate(dateString: string): string {
  const d = parseISO(dateString);
  return format(d, "yyyy/MM/dd hh:mm", { locale: ja });
}
