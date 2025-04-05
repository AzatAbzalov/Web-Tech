import HeaderComponent from "./view/header-component.js";
import AddTaskFormComponent from "./view/add-task-form-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksModel from "./model/task-model.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.task-add-section');
const taskBoardContainer = document.querySelector('.page-main');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new AddTaskFormComponent, formContainer);

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter ({
    boardContainer: taskBoardContainer,
    tasksModel,
});

tasksBoardPresenter.init();