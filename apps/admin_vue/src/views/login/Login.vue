<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();
</script>

<template>
  <h1 class="text-black">登录页面</h1>
</template>

<style scoped>
.text-black {
  color: black;
}
</style>
