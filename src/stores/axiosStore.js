import { defineStore } from 'pinia'
import axios from 'axios';

export const useAxiosStore = defineStore('axios', {
    state: () => {
        return {
            project_id: [],
            projects: [],
            pendingTasks: [],
            completedTasks: [],
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
        async fetchPendingTasks(projectID) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/tasks/filter_tasks/?project_id=${projectID}&completed=false`);
                this.pendingTasks = response.data;
            } catch (error) {
                console.log(error);
            }
            return this.pendingTasks;
        },
        async fetchCompletedTasks(projectID) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/tasks/filter_tasks/?project_id=${projectID}&completed=true`);
                this.completedTasks = response.data;
            } catch (error) {
                console.log(error);
            }
            return this.completedTasks;
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
        async postTask(task) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/tasks/', {
                    project: task.project,
                    title: task.title,
                    description: task.description,
                    due_date: task.due_date,
                    priority: task.priority,
                });
                // get new task id from response
                task.id = response.data.id;
                // Add the new task to pending tasks
                this.pendingTasks.push(task);
            } catch (error) {
                console.log(error, task);
            }
        },
        async deleteTask(taskID) {
            try {
                await axios.delete(`http://127.0.0.1:8000/tasks/${taskID}/`);
                // Remove the deleted task from the corresponding array
                this.pendingTasks = this.pendingTasks.filter(task => task.id !== taskID);
                this.completedTasks = this.completedTasks.filter(task => task.id !== taskID);
            } catch (error) {
                console.log(error);
            }
        },
        async updateTaskStatus(taskID, status) {
            try {
                await axios({
                    method: 'patch',
                    url: `http://127.0.0.1:8000/tasks/${taskID}/`,
                    data: { completed: !status}
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
})
