import "./style.scss";
import { create, elIcon, setItem } from "./utils";
import feather from "feather-icons";

feather.replace({ "stroke-width": 1 });

const navBtn = document.querySelector(".nav-logo")! as HTMLDivElement;

navBtn.addEventListener("click", function () {
  const leftNav = document.querySelector(".nav__left")! as HTMLDivElement;

  if (leftNav.classList.contains("hide")) {
    leftNav.classList.remove("hide");
  } else leftNav.classList.add("hide");
});

//task-input
interface ITaskList {
  title: string;
  desc: string;
  id?: string;
}

let taskList: ITaskList[] = [];
const taskTitle = document.querySelector(
  ".input__task-name"
)! as HTMLInputElement;
const taskDescription = document.querySelector(
  ".input__task-description"
)! as HTMLInputElement;

const submitTask = document.querySelector(".to-do__inputs")! as HTMLFormElement;

const gatherInputValue = function (): any {
  const titleValue = taskTitle.value;
  const descriptionValue = taskDescription.value;

  if (!titleValue) {
    return alert("You din't input task name!");
  } else {
    clearInputs();
    return { title: titleValue, desc: descriptionValue };
  }
};

const clearInputs = function () {
  taskTitle.value = "";
  taskDescription.value = "";
};

const addTask = function (title: string, desc: string): void {
  const newTaskId: string = Math.random().toString();

  const newTask = { title, desc, id: newTaskId };

  taskList.push(newTask);

  setItem("task-list", taskList);

  listTask();
};

const listTask = function (): void {
  const tasks = document.querySelector("#task-list")!;
  tasks.innerHTML = "";
  const taskData = JSON.parse(localStorage.getItem("task-list")!);
  if (taskData) {
    taskList = taskData;
    for (let i = 0; i < taskList.length; i++) {
      tasks.appendChild(taskComp(taskList[i]));
    }
    feather.replace({ "stroke-width": 1 });
  }
};

window.addEventListener("load", listTask);

const submitHandler = function (e: Event) {
  e.preventDefault();

  const userInput = gatherInputValue();
  const { title, desc } = userInput;
  addTask(title, desc);
};

submitTask.addEventListener("submit", submitHandler);

function taskComp(taskList: ITaskList) {
  const listItem = create({
    tag: "li",
    attributes: { className: "to-do__list-cont" },
    children: [
      create({
        tag: "div",
        attributes: {
          className: "to-do__list-cont--top",
        },
        children: [
          create({
            tag: "div",
            attributes: {
              className: "to-do__left-cont",
            },
            children: [
              create({
                tag: "button",
                attributes: {
                  className: "grab--btn btn-hollow",
                },
                children: [elIcon("hexagon")],
              }),
              create({
                tag: "div",
                attributes: {
                  className: "radio--btn",
                },
                children: [
                  create({
                    tag: "input",
                    attributes: {
                      type: "radio",
                      title: "task-is-complet",
                      id: "radio1",
                    },
                  }),
                  create({
                    tag: "label",
                    attributes: {
                      className: "task-name",
                      for: "radio1",
                      textContent: taskList.title,
                    },
                  }),
                ],
              }),
            ],
          }),
          create({
            tag: "div",
            attributes: {
              className: "to-do__right-cont",
            },
            children: [
              create({
                tag: "button",
                attributes: {
                  className: "edit--icon btn-hollow",
                },
                children: [elIcon("edit-3")],
              }),
              create({
                tag: "button",
                attributes: {
                  className: "more--icon btn-hollow",
                },
                children: [elIcon("more-horizontal")],
              }),
            ],
          }),
        ],
      }),
      create({
        tag: "p",
        attributes: {
          className: "to-do__dscr",
          textContent: taskList.desc,
        },
      }),
    ],
  });
  return listItem;
  // return tasks.appendChild(list);
}
