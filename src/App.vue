<template>

  <div class="w-full flex flex-col items-center p-5">
    <h1 class="text-center font-semibold text-2xl"> {{ title }}</h1>
  </div>
  <router-view></router-view>

</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("Lista de tareas")
</script>
