import TaskBoardComponent from "../view/task-board-component.js";
import TaskComponent from "../view/task-component.js";
import TaskListComponent from "../view/task-list-component.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";

export default class TaskBoardPresenter{
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent();
    

    constructor({boardContainer, tasksModel}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    init(){        
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
            const tasksByStatus = this.tasks.filter(task => task.status === status);

            if (tasksByStatus.length === 0){
                this.#renderEmptyTask(taskListElement);
            } else {
                tasksByStatus.forEach(task => {
                this.#renderTask(task, taskListElement);
                });
            }

            if(status === Status.BASKET){
                const notEmpty = tasksByStatus.length > 0;
                const clearButtonComponent = new ClearButtonComponent({
                    onClick: this.#handleBasketClear.bind(this),
                    disabled: !notEmpty
                });
                render(clearButtonComponent, taskListComponent.element);
            }
        });
    }  
    
    createTask(){
        const taskTitle = document.querySelector('.task-input').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.task-input').value = '';
    }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
    }

    #handleBasketClear(){
        this.#tasksModel.basketClear();
    }

    #handleTaskDrop(taskId, newStatus, targetIndex){
        this.#tasksModel.taskMove(taskId, newStatus, targetIndex);
    }
    #clearBoard(){
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    get tasks(){
        return this.#tasksModel.tasks;
    }    
}