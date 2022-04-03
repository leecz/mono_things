<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue"
import Geo3d from "@/utils/Geo3d"

const scene = ref<Geo3d>()

onMounted(() => {
  scene.value = new Geo3d('#scene')
})

onBeforeUnmount(() => {
  scene.value!.destroy()
})

</script>

<template>
  <div id="scene"></div>
</template>

<style scoped>
#scene {
  width: 100vw;
  height: 100vh;
}
/**
 * 这样无法改变canvas大小
 */
/* #scene canvas {
  width: 100%;
  height: 100%;
} */
</style>
