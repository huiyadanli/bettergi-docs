import {defineUserConfig} from "vuepress";
import {googleAnalyticsPlugin} from "@vuepress/plugin-google-analytics";
import theme from "./theme.js";

export default defineUserConfig({
    base: "/",

    lang: "zh-CN",
    title: "BetterGI·更好的原神",
    description: "BetterGI·更好的原神 - 文档",

    theme,

    // Enable it with pwa
    // shouldPrefetch: false,

    plugins: [
        googleAnalyticsPlugin({
            id: "G-MZ2XRRCKV2",
        })
    ]
});
