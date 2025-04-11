import { StatusLabel } from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(status){
    return(
        `<section class="task-container ${status}">
                <h3>${StatusLabel[status]}</h3>
                <ul class="task-list"></ul>
            </section>`
    );
}

export default class TaskListComponent extends AbstractComponent {
    constructor(status){
        super();
        this.status = status;
    }

    get template(){
        return createTaskListComponentTemplate(this.status);
    }
}