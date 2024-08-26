<template>
    <div class="w-9/12 border-2 border-gray-100 rounded-md shadow-lg px-12 py-16 mt-10">
        <h2 class="text-center font-semibold text-xl">Nueva Tarea</h2>
        <div class="flex flex-col gap-2 mt-2">
            <label for="task" class="text-gray-800 font-medium text-sm">Nombre de la tarea</label>
            <input type="text" id="task" placeholder="Escribe el nombre de tu tarea"
                class="w-auto border-2 py-1 px-2 rounded-md text-sm outline-cyan-600" v-model="Task.name">
            <label for="task" class="text-gray-800 font-medium text-sm mt-5">Descripción de la tarea</label>
            <input type="text" id="task" placeholder="Describe las caracteristicas de la tarea"
                class="w-auto border-2 py-1 px-2 rounded-md text-sm outline-cyan-600" v-model="Task.description">
        </div>
        <div class="flex gap-5 mt-3">
            <button class="bg-green-600 px-4 py-2 shadow-md rounded-md  text-white" @click="newTask"
                v-if="mode">Añadir</button>
            <button class="bg-yellow-400 px-4 py-2 shadow-md rounded-md" v-if="!mode"
                @click="clickUpdateTask">Actualizar</button>
            <button class="bg-red-500 px-4 py-2 shadow-md rounded-md text-white" @click="goHome">Cancelar</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { statusTask, task, } from "../interfaces/task.interface";
import type { Ref } from 'vue'
import router from "../routes";
import { ref, onMounted } from "vue";
import { useTasks } from '../composables/tasks'
import { useRoute } from "vue-router";
const indexTask = ref(-1)
const route = useRoute()
const mode = ref(true)
const { addNewTask, getTasks, updateTask } = useTasks()
const Task: Ref<task> = ref({
    name: "",
    description: "",
})
const newTask = () => {
    addNewTask(Task.value)
    goHome()
}

const clickUpdateTask = () => {
    console.log(indexTask.value);
    updateTask(indexTask.value, Task.value)
    goHome()
}
onMounted(() => {
    if (route.query.mode === "new") {
        mode.value = true
    }
    else {
        mode.value = false
        asignTaskToEdit()
    }
})
const goHome = () => {
    router.push({ name: "Home" })
}
const asignTaskToEdit = () => {
    const updateTask: Array<statusTask> = getTasks()
    if (route.query.index) {
        if (typeof (route.query.index) === "string") {
            indexTask.value = parseInt(route.query.index)
        }
        Task.value.name = updateTask[indexTask.value].name
        Task.value.description = updateTask[indexTask.value].description
    }
}
</script>