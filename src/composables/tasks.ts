import { statusTask, task } from "../interfaces/task.interface";

export const useTasks = () => {
  const addNewTask = (Task: task) => {
    const actualTasks = getTasks();
    const newTask: statusTask = {
      ...Task,
      status: "Pendiente",
    };
    actualTasks.push(newTask);
    saveTasks(actualTasks);
  };

  const saveTasks = (listOfTasks: Array<statusTask>) => {
    localStorage.setItem("Tasks", JSON.stringify(listOfTasks));
  };

  const getTasks = () => {
    const allTask = localStorage.getItem("Tasks");
    if (allTask) {
      return JSON.parse(allTask);
    }
    return [];
  };
  const deleteTask = (index: number) => {
    const allTaks = getTasks();
    if (allTaks.length > 0) {
      allTaks.splice(index, 1);
      saveTasks(allTaks);
    }
    return allTaks;
  };
  const updateStatus = (index: number, newStatus: string) => {
    const allTaks = getTasks();
    allTaks[index].status = newStatus;
    saveTasks(allTaks);
    return allTaks;
  };
  const updateTask = (index: number, updatedTask: task) => {
    let allTaks = getTasks();
    allTaks[index].name = updatedTask.name;
    allTaks[index].description = updatedTask.description;
    saveTasks(allTaks);
  };

  return {
    saveTasks,
    getTasks,
    addNewTask,
    deleteTask,
    updateStatus,
    updateTask,
  };
};
