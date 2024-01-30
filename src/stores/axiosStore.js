import { defineStore } from 'pinia'
import axios from 'axios';

export const useAxiosStore = defineStore('axios', {
    state: () => {
        return {
            projects: [],
            tasks: []
        }
    },
    getters: {
        getProjects(state) {
            return state.projects;
        },
        getTasks(state) {
            return state.tasks;
        }
    }, 
    actions: {
        async fetchProjects() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/projects/');
                this.projects = response.data;
            } catch (error) {
                console.log(error);
            }
            return this.projects;
        },
        async fetchTasks() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/tasks/');
                this.tasks = response.data;
            } catch (error) {
                console.log(error);
            }
            return this.tasks;
        },
        async postProject(project) {
            try {
                await axios.post('http://127.0.0.1:8000/projects/', {
                    name: project
                });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProject(projectID) {
            try {
                await axios.delete(`http://127.0.0.1:8000/projects/${projectID}/`);
            } catch (error) {
                console.log(error);
            }
        },
        // async deleteTask(taskID) {
        //     try {
        //         await axios.delete(`http://127.0.0.1:8000/tasks/${taskID}/`);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }
})
