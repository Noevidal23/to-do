<template>
    <div class="flex flex-col items-center">
        <div class="flex justify-end w-10/12 pb-5">
            <button
                class="rounded-lg bg-cyan-700 text-white flex justify-center items-center font-semibold text-sm relative py-1 px-2"
                @click="newTask">Nueva Tarea</button>
        </div>
        <TaskTable />
    </div>
</template>

<script setup lang="ts">
import TaskTable from '../components/TaskTable.vue'
import router from "../routes";
const newTask = () => {
    router.push({
        name: "task",
        query: {
            mode: "new"
        }
    })
}
</script>

<style scoped></style>