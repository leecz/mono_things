<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue"
import Cube3d2 from "@/utils/Cube3d2"

const scene = ref<Cube3d2>()

onMounted(() => {
  scene.value = new Cube3d2('#scene')
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
