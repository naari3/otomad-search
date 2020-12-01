import fs from "fs";
import path from "path";
import remark from "remark";
import html from "remark-html";

const descriptionsDirectory = path.join(process.cwd(), "descriptions");

export async function getDescriptionData(locale: string) {
  const fullPath = path.join(descriptionsDirectory, `${locale}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const processedContent = await remark().use(html).process(fileContent);

  return processedContent.toString();
}
