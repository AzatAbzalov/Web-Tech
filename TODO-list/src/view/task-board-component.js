import { createElement } from "../framework/render.js";

function createTaskBoardComponentTemplate(){
    return(
      `<section class="tasks-board"></section>`  
    );
}

export default class TaskBoardComponent {
    getTemplate(){
        return createTaskBoardComponentTemplate();
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