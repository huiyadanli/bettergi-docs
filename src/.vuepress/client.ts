import { defineClientConfig } from "vuepress/client";
import Home from "./layouts/Home.vue";

export default defineClientConfig({
  layouts: {
    Layout: Home,
  },
});
