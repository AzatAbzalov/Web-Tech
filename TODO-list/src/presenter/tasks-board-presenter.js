import TaskBoardComponent from "../view/task-board-component.js";
import TaskComponent from "../view/task-component.js";
import TaskListComponent from "../view/task-list-component.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel, UserAction } from "../const.js";

export default class TaskBoardPresenter{
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    #resetButtonComponent = null;
    #loadingComponent = new LoadingViewComponent();
    
    

    constructor({boardContainer, tasksModel}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    async init(){    
        render(this.#loadingComponent, this.#boardContainer);
        await this.#tasksModel.init();
        this.#loadingComponent.removeElement();
        this.#clearBoard();   
        this.#renderBoard();
    }

    
    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer);
        this.#renderTasksList();
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({task});
        render(taskComponent, container);
    }
    
    #renderEmptyTask(container){
        const emptyTaskComponent = new EmptyTaskComponent();
        render(emptyTaskComponent, container);
    }

    #renderTasksList(){
        Object.values(Status).forEach((status)=>{
            const taskListComponent = new TaskListComponent({status: status, label: StatusLabel[status],
                onTaskDrop: this.#handleTaskDrop.bind(this)});
            render(taskListComponent, this.#tasksBoardComponent.element);

            const taskListElement = taskListComponent.element.querySelector('.task-list');

            const tasksByStatus = this.tasks
                .filter(t => t.status === status)
                .sort((a, b) => a.order - b.order);


            if (tasksByStatus.length === 0){
                this.#renderEmptyTask(taskListElement);
            } else {
                tasksByStatus.forEach(task => {
                this.#renderTask(task, taskListElement);
                });
            }

            if(status === Status.BASKET){
                const notEmpty = tasksByStatus.length > 0;
                this.#resetButtonComponent = new ClearButtonComponent({
                    onClick: this.#handleBasketClear.bind(this),
                    disabled: !notEmpty
                });
                render(this.#resetButtonComponent, taskListComponent.element);
            }
        });
    }  
    
    async createTask(){
        const taskTitle = document.querySelector('.task-input').value.trim();
        if (!taskTitle) {
            return;
        }
        try{
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.task-input').value = '';
        } catch (err){
            console.error('Ошибка при создании задачи:',err);
        }
    }

    #handleModelChange(event)
    { switch(event){
        case UserAction.ADD_TASK:
        case UserAction.UPDATE_TASK:
        case UserAction.DELETE_TASK:
            this.#clearBoard();
            this.#renderBoard();
            break;
    }      
    }

    async #handleBasketClear(){
        try{
        await this.#tasksModel.basketClear();
        } catch (err){
            console.error('Ошибка при очистке корзины:', err);
        }
    }

    async #handleTaskDrop(taskId, newStatus, targetIndex){
        try{
           await this.#tasksModel.taskMove(taskId, newStatus, targetIndex);
        } catch (err){
            console.error('Ошибка при обновлении статуса задачи:', err);
        }
    }
    #clearBoard(){
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    get tasks(){
        return this.#tasksModel.tasks;
    }    
}