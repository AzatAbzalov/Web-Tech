import { createElement } from "../framework/render.js";

function createAddTaskFormComponentTemplate(){
    return(
        `<form>
                <h2>Новая задача</h2>
                <section class="task-input-field">
                    <input type="text" class="task-input" placeholder="Название задачи...">
                    <button type="button" class="task-add-button">+ Добавить</button>
                </section>
            </form>`
    );
}

export default class AddTaskFormComponent {
    getTemplate(){
        return createAddTaskFormComponentTemplate();
    }

    getElement(){
        if (!this.element){
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    removeElement(){
        this.element = null;
    }
}
