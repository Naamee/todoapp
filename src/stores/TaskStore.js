import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
    state: () => { return { 
        newTask: {
            id: 0,
            title: '',
            description: '',
            dueDate: null,
            priority: '',
            status: false,
        },
        allTasks: [
            {id: 1, title: 'Go Gym', description: 'This is the first task', dueDate: '2021/09/01', priority: 'High', status: false},  
        ],
    }},
    actions: {
        addTask() {
            this.allTasks.push({ ...this.newTask });
            this.clearTask();
        },
        clearTask() {
            this.newTask = {
                title: '',
                description: '',
                dueDate: '',
                priority: '',
            }
        }
    }
})