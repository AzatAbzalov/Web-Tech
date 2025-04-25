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
    constructor({status, label, onTaskDrop}){
        super();
        this.status = status;
        this.label = label;
        this.#setDropHandler(onTaskDrop);
    }

    get template(){
        return createTaskListComponentTemplate(this.status);
    }

    #setDropHandler(onTaskDrop){
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const items = Array.from(container.querySelectorAll('.task-list-element'));
            const y = event.clientY;
            
            let targetIndex = items.findIndex(item => {
                const rect = item.getBoundingClientRect();
                return y < rect.top + rect.height / 2;
            });

            if (targetIndex === -1){
                targetIndex = items.length;
            }

            onTaskDrop(taskId, this.status, targetIndex);
        })
    }
}