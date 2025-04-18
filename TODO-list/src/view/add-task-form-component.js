import { AbstractComponent } from "../framework/view/abstract-component.js";

function createAddTaskFormComponentTemplate(){
    return(
        `<form>
                <h2>Новая задача</h2>
                <section class="task-input-field">
                    <input type="text" class="task-input" placeholder="Название задачи...">
                    <button type="submit" class="task-add-button">+ Добавить</button>
                </section>
            </form>`
    );
}

export default class AddTaskFormComponent extends AbstractComponent {
    #handleClick = null;
    
    constructor({onClick}){
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }
    
    get template(){
        return createAddTaskFormComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}
