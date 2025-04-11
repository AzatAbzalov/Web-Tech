import { AbstractComponent } from "../framework/view/abstract-component.js";


function createEmptyTaskTemplate(){
    return (
        `<div class="empty-tasks">Перетащите карточку</div>`
    );
}

export default class EmptyTaskComponent extends AbstractComponent {
    constructor(){
        super();
    }

    get template(){
        return createEmptyTaskTemplate();
    }
}