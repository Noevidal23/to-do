<template>
    <div class="w-10/12 grid grid-cols-4 border-2 border-gray-300 rounded-t-md ">
        <div class="text-center border-r-2 font-semibold text-gray-800 text-lg">Tarea</div>
        <div class="text-center border-r-2 font-semibold text-gray-800 text-lg">Descripción</div>
        <div class="text-center border-r-2 font-semibold text-gray-800 text-lg">Status</div>
        <div class="text-center  font-semibold text-gray-800 text-lg">Opciones</div>
    </div>
    <div class="w-10/12 grid grid-cols-4 border-2 border-t-0 border-gray-300" v-if="existTask"
        v-for="(task, index) in   listOfTask  " :key="index">
        <div class="text-center border-r-2">
            <p class="my-1 text-gray-700">
                {{ task.name }}
            </p>
        </div>
        <div class="text-center border-r-2">
            <p class="my-1 text-gray-700">
                {{ task.description }}
            </p>
        </div>
        <div class="text-center border-r-2 flex justify-center gap-3 items-center">
            <p class="my-1 text-green-600 font-medium" :class="{ 'text-red-600': taskColorStatus[index] }">
                {{ task.status }}
            </p>
            <img src="../assets/switch.svg" alt="Pencil_edit" class="w-4 h-4 cursor-pointer my-1"
                @click="changeStatus(index)">
        </div>
        <div class="text-center flex justify-center gap-5">
            <img src="../assets/edit.svg" alt="Pencil_edit" class="w-6 h-6 cursor-pointer my-1"
                @click="editTask(index)">
            <img src="../assets/delete.svg" alt="trash_delete" class="w-6 h-6 cursor-pointer my-1"
                @click="deleteTask(index)">
        </div>
    </div>
    <div class="w-10/12 border-2 border-t-0 border-gray-300 " v-if="!existTask">
        <p class="text-gray-700 text-center my-1 italic">No hay tareas</p>
    </div>


</template>

<script setup lang="ts">
import { useTasks } from "../composables/tasks";
import type { Ref } from 'vue'
import { ref, onMounted } from "vue";
import router from "../routes";
const existTask = ref(false)
const useTask = useTasks()
const listOfTask = ref(useTask.getTasks())
const taskColorStatus: Ref<boolean[]> = ref([])
const editTask = (index: number) => {
    router.push({
        name: "task",
        query: {
            mode: "edit",
            index
        }
    })

}
const deleteTask = (index: number) => {
    listOfTask.value = useTask.deleteTask(index)
}
const changeStatus = (index: number) => {
    const newStatus = listOfTask.value[index].status != "Pendiente" ? "Pendiente" : "Atendida"
    taskColorStatus.value[index] = newStatus === "Pendiente"
    listOfTask.value = useTask.updateStatus(index, newStatus)
}
const getTasks = () => {
    listOfTask.value = useTask.getTasks()
    if (listOfTask.value.length > 0) {
        existTask.value = true
    }
}
const loadColorStatus = () => {
    for (let i = 0; i < listOfTask.value.length; i++) {
        taskColorStatus.value[i] = listOfTask.value[i].status === "Pendiente"
    }
}
onMounted(() => {
    getTasks()
    loadColorStatus()
})
</script>

<style scoped></style>