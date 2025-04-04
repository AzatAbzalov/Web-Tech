import TaskBoardComponent from "../view/task-board-component.js";
import TaskComponent from "../view/task-component.js";
import TasksListComponent from "../view/task-list-component.js";
import { render } from "../framework/render.js";
import { Status } from "../const.js";

export default class TaskBoardPresenter{
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = new TaskBoardComponent()

    #boardTasks = [];

    constructor({boardContainer, tasksModel}){
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init(){
        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#tasksBoardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
            const tasksListComponent = new TasksListComponent(status);
            render(tasksListComponent, this.#tasksBoardComponent.getElement());
        
            this.#boardTasks.forEach(task => {
                if (task.status === status) {
                    const taskComponent = new TaskComponent({ task });
                    render(taskComponent, tasksListComponent.getElement().querySelector('.task-list'));
                }
            });
        });
    }
}