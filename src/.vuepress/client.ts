import { nextTick } from "vue";
import { defineClientConfig } from "vuepress/client";
import Home from "./layouts/Home.vue";

const siteUrl = "https://bettergi.com";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function updatePageSeo(path: string) {
  if (typeof document === "undefined" || !document.head) return;

  try {
    updatePageSeoUnsafe(path);
  } catch (error) {
    // SEO metadata must never prevent the page from rendering.
    console.warn("Failed to update page SEO metadata.", error);
  }
}

function updatePageSeoUnsafe(path: string) {
  const urlObject = new URL(path, siteUrl);
  urlObject.search = "";
  urlObject.hash = "";
  const url = urlObject.href;
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = url;
  setMeta("property", "og:url", url);
  setMeta("property", "og:title", document.title);

  const description = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content;
  if (description) {
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:description", description);
  }
}

export default defineClientConfig({
  enhance({ router }) {
    const update = () => updatePageSeo(router.currentRoute.value.fullPath);

    router.afterEach(() => {
      void nextTick(update);
    });

    if (typeof window !== "undefined") {
      void nextTick(update);
    }
  },
  layouts: {
    Layout: Home,
  },
});
