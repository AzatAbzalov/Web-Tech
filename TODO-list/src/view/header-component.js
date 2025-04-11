import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate(){
    return(
        `<header class="page-header">
            <h1 class="page-header-title">Список задач</h1>
        </header>`
    );
}

export default class HeaderComponent extends AbstractComponent {
    constructor(){
        super();
    }

    get template(){
        return createHeaderComponentTemplate();
    }
}