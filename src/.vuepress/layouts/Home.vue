<script setup lang="ts">
import {Layout} from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <template #heroBefore>
      <div class="hero-before-card">
        <iframe src="/form-create-3d-card.html" title="FormCreate 3D Card" loading="eager" scrolling="no"></iframe>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.hero-before-card {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.hero-before-card iframe {
  width: 100%;
  height: 500px;
  border: 0;
  display: block;
  overflow: hidden;
}
</style>
