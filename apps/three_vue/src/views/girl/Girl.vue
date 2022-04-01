<script setup lang="ts">
import { onMounted, ref } from "vue"
import Base3d from "@/utils/Base3d"

const scene = ref({})
onMounted(() => {
  scene.value = new Base3d('#scene')
})

const msg = ref('你好 three')
</script>

<template>
  <div id="scene"></div>
</template>

<style>
</style>
