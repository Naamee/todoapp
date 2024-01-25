import { defineStore } from 'pinia'
// import { useProjectStore } from './projectStore'

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
        defaultProject: [
            {id: 1, title: 'Go Gym', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false},
        ],

        MMA : [
            {id: 1, title: 'Go Gym', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false},
            {id: 2, title: 'Go Shopping', description: 'This is the second task. It requires going to the grocery store and buying essential items for the week.', dueDate: '2021/09/02', priority: 'Low Priority', status: true},
            {id: 3, title: 'Go Swimming', description: 'This is the third task. It involves going to the swimming pool and enjoying a refreshing swim to relax and unwind.', dueDate: '2021/09/03', priority: 'Medium Priority', status: false}, 
            {id: 4, title: 'Go Running', description: 'This is the fourth task. It requires going for a run in the park to improve cardiovascular fitness and endurance.', dueDate: '2021/09/04', priority: 'High Priority', status: true}, 
            {id: 5, title: 'Go Cycling', description: 'This is the eighth task. It involves going for a bike ride in the countryside to enjoy nature and get some fresh air.', dueDate: '2021/09/08', priority: 'Low Priority', status: true},
        ],
        Work : [
            {id: 1, title: 'Go Home', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false},
            {id: 2, title: 'Go Shopping', description: 'This is the second task. It requires going to the grocery store and buying essential items for the week.', dueDate: '2021/09/02', priority: 'Low Priority', status: true},
            {id: 3, title: 'Do Accounting', description: 'This is the third task. It involves going to the swimming pool and enjoying a refreshing swim to relax and unwind.', dueDate: '2021/09/03', priority: 'Medium Priority', status: false},
            {id: 4, title: 'Go Running', description: 'This is the fourth task. It requires going for a run in the park to improve cardiovascular fitness and endurance.', dueDate: '2021/09/04', priority: 'High Priority', status: true},
        ],
        Coding: [
            {id: 1, title: 'Go Gym', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false},
            {id: 2, title: 'Go Shopping', description: 'This is the second task. It requires going to the grocery store and buying essential items for the week.', dueDate: '2021/09/02', priority: 'Low Priority', status: true},
        ]
    }},
    actions: {
        getPendingTasks(project) {
            return this[project].filter(task => !task.status)
        },
        getCompletedTasks(project) {
            return this[project].filter(task => task.status)
        },
    },
})