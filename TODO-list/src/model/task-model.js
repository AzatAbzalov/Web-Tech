import {tasks} from '../mock/task.js';
import {Status} from '../const.js';
import {generateID} from '../utils.js';


export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks(){
        return this.#boardtasks;
    }

    getTasksByStatus(status){
        return this.#boardtasks.filter(task => task.status === status);
    }

    addTask(title){
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }
    
    basketClear(){
        this.#boardtasks = this.#boardtasks.filter(task => task.status != Status.BASKET);
        this._notifyObservers();
    }

    addObserver(observer){
        this.#observers.push(observer);
    }

    removeObserver(observer){
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers(){
        this.#observers.forEach((observer) => observer());
    }

    updateTaskStatus(taskId, newStatus){
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task){
            task.status = newStatus;
            this._notifyObservers();
        }
    }

    taskMove(taskId, newStatus, targetIndex){
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) 
            return;

        const [movedTask] = this.#boardtasks.splice(taskIndex, 1);
        movedTask.status = newStatus;

        let currIndex = 0;
        for (let i=0; i < this.#boardtasks.length; i++){
            if(this.#boardtasks[i].status === newStatus){
                if(currIndex === targetIndex){
                    this.#boardtasks.splice(i, 0, movedTask);
                    this._notifyObservers();
                    return;
                }
                currIndex++;
            }
        }
        this.#boardtasks.push(movedTask);
        this._notifyObservers();
    }
}
