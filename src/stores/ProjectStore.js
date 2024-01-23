import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
    state: () => { return { projects: [ 'MMA', 'Work', 'Coding'] }},
    actions: {
        addProject(project) {
            this.projects.push(project);
        }
    },
})