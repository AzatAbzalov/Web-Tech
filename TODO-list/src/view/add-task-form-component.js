import { AbstractComponent } from "../framework/view/abstract-component.js";

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

export default class AddTaskFormComponent extends AbstractComponent {
    constructor(){
        super();
    }
    
    get template(){
        return createAddTaskFormComponentTemplate();
    }
}
