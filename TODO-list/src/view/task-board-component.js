import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskBoardComponentTemplate(){
    return(
      `<section class="tasks-board"></section>`  
    );
}

export default class TaskBoardComponent extends AbstractComponent{
    constructor(){
        super();
    }

    get template(){
        return createTaskBoardComponentTemplate();
    }
}