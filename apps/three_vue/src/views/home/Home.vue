<script setup lang="ts">
import { onMounted, ref } from "vue"

onMounted(() => {
})

const msg = ref('你好 three')
</script>

<template>
  <div class="grid grid-flow-col auto-cols-max gap-4">
    <router-link to="/girl">女孩模型</router-link>
    <router-link to="/cube">立方体模型</router-link>
  </div>
</template>

<style>
</style>
