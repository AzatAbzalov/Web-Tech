import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate(){
    return(
        `<section class="task-container backlog">
                <h3>Название блока</h3>
                <ul class="task-list"></ul>
            </section>`
    );
}

export default class TaskListComponent {
    getTemplate(){
        return createTaskListComponentTemplate();
    }

    getElement(){
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement(){
        this.element = null;
    }
}