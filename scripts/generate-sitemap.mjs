import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "src");
const publicRoot = path.join(sourceRoot, ".vuepress", "public");
const siteUrl = "https://bettergi.com";

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".vuepress" || entry.name === "node_modules") continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(absolutePath));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(absolutePath);
  }

  return files;
}

function pageUrl(file) {
  const relativePath = path.relative(sourceRoot, file).split(path.sep).join("/");
  const parts = relativePath.split("/");
  const filename = parts.pop();

  if (filename === "README.md") {
    return parts.length ? `/${parts.join("/")}/` : "/";
  }

  parts.push(filename.slice(0, -3));
  return `/${parts.join("/")}.html`;
}

const urls = (await markdownFiles(sourceRoot))
  .map(pageUrl)
  .sort((a, b) => a.localeCompare(b));

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${escapeXml(`${siteUrl}${url}`)}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

await mkdir(publicRoot, { recursive: true });
await writeFile(path.join(publicRoot, "sitemap.xml"), xml, "utf8");
