<script setup lang="ts">
import { onMounted, ref } from "vue"
import Cube3d from "@/utils/Cube3d"

const scene = ref({})

onMounted(() => {
  scene.value = new Cube3d('#scene')
})

</script>

<template>
  <div id="scene"></div>
</template>

<style>
</style>
