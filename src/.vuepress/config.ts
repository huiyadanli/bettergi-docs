import { defineUserConfig } from "vuepress";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "BetterGI·更好的原神",
  description: "BetterGI·更好的原神 - 文档",

  theme: theme,
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  // Enable it with pwa
  // shouldPrefetch: false,

  head: [
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
    googleAnalyticsPlugin({
      id: "G-MZ2XRRCKV2",
    }),
  ],
});
