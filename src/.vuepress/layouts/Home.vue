<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Layout } from "vuepress-theme-hope/client";

type TiltElement = HTMLElement & {
  vanillaTilt?: {
    destroy: () => void;
  };
};

const logoElement = ref<TiltElement | null>(null);

onMounted(async () => {
  const element = logoElement.value;

  if (!element) return;

  const VanillaTilt = (await import("vanilla-tilt")).default;

  VanillaTilt.init(element, {
    max: 20,
    speed: 300,
    scale: 1.05,
    perspective: 1100,
    glare: true,
    "max-glare": 0.6,
  });
});

onBeforeUnmount(() => {
  logoElement.value?.vanillaTilt?.destroy();
});
</script>

<template>
  <Layout>
    <template #heroLogo>
      <div ref="logoElement" class="hero-tilt-logo">
        <img
          src="https://img.alicdn.com/imgextra/i3/2042484851/O1CN01BafDLu1lhoP3xOqGQ_!!2042484851.png"
          alt="BetterGI Logo"
        >
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.hero-tilt-logo {
  width: min(52vw, 260px);
  border-radius: 16px;
  transform-style: preserve-3d;
}

.hero-tilt-logo img {
  display: block;
  width: 100%;
  height: auto;

}
</style>
