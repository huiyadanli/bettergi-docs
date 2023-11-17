import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "BetterGI·更好的原神",
  description: "BetterGI·更好的原神 - 文档",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
