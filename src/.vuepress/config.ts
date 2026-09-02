import { defineUserConfig } from "vuepress";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

const siteUrl = "https://bettergi.com";
const siteDescription =
  "BetterGI（BGI）是一款开源免费的原神自动化工具，基于计算机视觉与 AI，提供自动采集、自动战斗、钓鱼、七圣召唤、键鼠脚本等功能。";
const socialImage =
  "https://img.alicdn.com/imgextra/i3/2042484851/O1CN01BafDLu1lhoP3xOqGQ_!!2042484851.png";
const isDevelopment = process.env.NODE_ENV === "development";
const fixSlimsearchWorkerPath = {
  name: "fix-slimsearch-worker-dev-path",
  enforce: "post" as const,
  transform(code: string, id: string) {
    const normalizedId = id.replaceAll("\\", "/");
    if (!isDevelopment || !normalizedId.includes("@vuepress/plugin-slimsearch") || !normalizedId.includes("/dist/search-")) {
      return;
    }

    const fixedCode = code
      .replace(/new URL\(`worker\.js`,import\.meta\.url\)/g, "new URL(`client/worker.js`,import.meta.url)")
      .replace(/\/dist\/worker\.js/g, "/dist/client/worker.js");

    return fixedCode === code ? undefined : { code: fixedCode, map: null };
  },
};

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "BetterGI · 更好的原神",
      alternateName: "BGI",
      description: siteDescription,
      inLanguage: "zh-CN",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#application`,
      name: "BetterGI",
      alternateName: "BGI",
      url: siteUrl,
      description: siteDescription,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Windows",
      isAccessibleForFree: true,
      softwareHelp: { "@id": `${siteUrl}/doc.html` },
      downloadUrl: `${siteUrl}/download.html`,
      license: "https://opensource.org/licenses/MIT",
    },
  ],
});

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "BetterGI·更好的原神",
  description: siteDescription,

  theme: theme,
  bundler: viteBundler({
    viteOptions: {
      plugins: [fixSlimsearchWorkerPath],
    },
    vuePluginOptions: {},
  }),
  // Enable it with pwa
  // shouldPrefetch: false,

  head: [
    ["meta", { name: "keywords", content: "BetterGI, BGI, 原神自动化, 原神辅助, 原神脚本, 原神工具, Genshin Impact, OCR, 自动采集, 自动战斗" }],
    ["meta", { name: "author", content: "BetterGI 开源社区" }],
    ["meta", { name: "robots", content: "index,follow,max-image-preview:large" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "BetterGI · 更好的原神" }],
    ["meta", { property: "og:title", content: "BetterGI · 更好的原神" }],
    ["meta", { property: "og:description", content: siteDescription }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:image", content: socialImage }],
    ["meta", { property: "og:image:alt", content: "BetterGI 标志" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "BetterGI · 更好的原神" }],
    ["meta", { name: "twitter:description", content: siteDescription }],
    ["meta", { name: "twitter:image", content: socialImage }],
    ["script", { type: "application/ld+json" }, structuredData],
    [
      'script',
      {
        type: 'text/javascript',
        charset: 'UTF-8',
        src: 'https://cdn.adwork.net/js/makemoney.js',
        async: true
      }
    ]
  ],

  plugins: [
    ...(!isDevelopment
      ? [
          googleAnalyticsPlugin({
            id: "G-MZ2XRRCKV2",
          }),
        ]
      : []),
  ],
});
