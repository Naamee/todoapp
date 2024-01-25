import { defineStore } from 'pinia'

export const useProjectStore = defineStore('projects', {
    state: () => {
        return {
            project: {
                projectName: '',
                projectTasks: [],
            },
            allProjects: [
                {
                    projectName: 'Default Project',
                    projectTasks: [
                        { id: 1, title: 'Go Gym', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false },
                        { id: 2, title: 'Go Shopping', description: 'This is the second task. It requires going to the grocery store and buying essential items for the week.', dueDate: '2021/09/02', priority: 'Low Priority', status: true },
                    ]
                },
                {
                    projectName: 'MMA',
                    projectTasks: [
                        {id: 1, title: 'Go Gym', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false},
                        {id: 2, title: 'Go Shopping', description: 'This is the second task. It requires going to the grocery store and buying essential items for the week.', dueDate: '2021/09/02', priority: 'Low Priority', status: true},
                        {id: 3, title: 'Go Swimming', description: 'This is the third task. It involves going to the swimming pool and enjoying a refreshing swim to relax and unwind.', dueDate: '2021/09/03', priority: 'Medium Priority', status: false}, 
                        {id: 4, title: 'Go Running', description: 'This is the fourth task. It requires going for a run in the park to improve cardiovascular fitness and endurance.', dueDate: '2021/09/04', priority: 'High Priority', status: true}, 
                        {id: 5, title: 'Go Cycling', description: 'This is the eighth task. It involves going for a bike ride in the countryside to enjoy nature and get some fresh air.', dueDate: '2021/09/08', priority: 'Low Priority', status: true},
                    ]
                },
                {
                    projectName: 'Work',
                    projectTasks: [
                        {id: 1, title: 'Go Home', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false},
                        {id: 2, title: 'Go Shopping', description: 'This is the second task. It requires going to the grocery store and buying essential items for the week.', dueDate: '2021/09/02', priority: 'Low Priority', status: true},
                        {id: 3, title: 'Do Accounting', description: 'This is the third task. It involves going to the swimming pool and enjoying a refreshing swim to relax and unwind.', dueDate: '2021/09/03', priority: 'Medium Priority', status: false},
                        {id: 4, title: 'Go Running', description: 'This is the fourth task. It requires going for a run in the park to improve cardiovascular fitness and endurance.', dueDate: '2021/09/04', priority: 'High Priority', status: true},
                    ]
                },
                {
                    projectName: 'Coding',
                    projectTasks: [
                        { id: 1, title: 'Go Gym', description: 'This is the first task. It involves going to the gym and working out for an hour to stay fit and healthy.', dueDate: '2021/09/01', priority: 'High Priority', status: false },
                        { id: 2, title: 'Go Shopping', description: 'This is the second task. It requires going to the grocery store and buying essential items for the week.', dueDate: '2021/09/02', priority: 'Low Priority', status: true },
                    ]
                }
            ]

        }
    },
    actions: {
        addProject(project) {
            this.allProjects.push({ projectName: project, projectTasks: [] });
            console.log(this.allProjects)
        },
        getAllProjects() {
            return this.allProjects;
        },
        getPendingTasks(projectName) {
            const project = this.allProjects.find(p => p.projectName === projectName);
            return project ? project.projectTasks.filter(task => !task.status) : [];
        },
        getCompletedTasks(projectName) {
            const project = this.allProjects.find(p => p.projectName === projectName);
            return project ? project.projectTasks.filter(task => task.status) : [];
        }
    }
})
