import HeaderComponent from "./view/header-component.js";
import AddTaskFormComponent from "./view/add-task-form-component.js";
import TaskBoardComponent from "./view/task-board-component.js";
import TaskComponent from "./view/task-component.js";
import TaskListComponent from "./view/task-list-component.js";

import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.task-add-section');
const taskBoardContainer = document.querySelector('.page-main');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new AddTaskFormComponent, formContainer);
render(new TaskBoardComponent, taskBoardContainer);

const taskListBoard = document.querySelector('.tasks-board');

for (let i = 0; i < 4; i++) {
    const taskListBlock = new TaskListComponent();
    render(taskListBlock, taskListBoard);
    
    const taskListElement = taskListBlock.getElement().querySelector('.task-list');
    for(let k = 0; k < 4; k++) {
        render(new TaskComponent(), taskListElement);
    }
}