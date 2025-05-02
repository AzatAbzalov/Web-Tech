import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearButtonTemplate(disabled){
    return `<button class="clear-button" ${disabled ? 'disabled' : ''}>X Очистить</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {

    #clickHandle = null;
    #disabled = null;

    constructor({onClick, disabled = false}){
        super();
        this.#clickHandle = onClick;
        this.#disabled = disabled;

        this.element.addEventListener('click', this.#clickHandler)
    }

    get template(){
        return createClearButtonTemplate(this.#disabled);
    }

    #clickHandler = () => {
        if (!this.#disabled){
            this.#clickHandle();
        }
    }
}