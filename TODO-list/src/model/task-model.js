import {tasks} from '../mock/task.js';
import {Status} from '../const.js';
import {generateID} from '../utils.js';
import Observable from '../framework/observable.js';
import { UserAction } from '../const.js';
import {UpdateType} from '../const.js';


export default class TasksModel extends Observable {
    #boardtasks = [];
    #tasksApiService = null;

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    get tasks(){
        return this.#boardtasks;
    }

    hasBasketTasks() {
        return this.#boardtasks.some(task => task.status === 'trash-can');
    }

    getTasksByStatus(status){
        return this.#boardtasks.filter(task => task.status === status);
    }
  
    async basketClear(){
        const basketTasks = this.#boardtasks.filter(task => task.status === 'trash-can');
        try{
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status != Status.BASKET);
            this._notify(UserAction.DELETE_TASK, {status: 'trash-can'});
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере:', err);
            throw err;
        } 
    }

    async updateTaskStatus(taskId, newStatus){
        const task = this.#boardtasks.find(task => task.id === taskId);
        const previousStatus = task.status;
        if (task){
            task.status = newStatus;
            try{
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch (err){
                console.error('Ошибка при обновлении статуса задачи на сервер:', err);
                task.status = previousStatus;
                throw err;
            }   
        }
    }

    async taskMove(taskId, newStatus, targetIndex){
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) 
            return;

        const [movedTask] = this.#boardtasks.splice(taskIndex, 1);
        movedTask.status = newStatus;

        const group = this.#boardtasks.filter(t => t.status === newStatus)
        .sort((a,b) => a.order - b.order);
        
        group.splice(targetIndex, 0, movedTask);

        group.forEach((task, idx) => {
            task.order = idx;
        })

        this.#boardtasks = [
            ...this.#boardtasks.filter(t => t.status !== newStatus),
            ...group
        ];
        
        await Promise.all(
            group.map(task => this.#tasksApiService.updateTask(task))
        );

        this._notify(UserAction.UPDATE_TASK, movedTask);
    }

    async init(){
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks.map((task, idx)=>({
                ...task,
                order: task.order ?? idx
            }));
        } catch(err){
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }

    async addTask(title){
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
            order: this.#boardtasks.filter(t => t.status === Status.BACKLOG).length
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err){
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    deleteTask(taskId){
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, {id: taskId});
    }

}
