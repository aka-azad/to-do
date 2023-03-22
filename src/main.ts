import "./style.scss";
import { create, elIcon, setItem } from "./ts/utils";
// import { menuBtn } from "./ts/popup";
import feather from "feather-icons";

feather.replace({ "stroke-width": 1 });

const navBtn = document.querySelector(".nav-logo")! as HTMLDivElement;

const leftNav = document.querySelector(".nav__left")! as HTMLDivElement;

navBtn.addEventListener("click", function () {
  if (leftNav.classList.contains("hide")) {
    leftNav.classList.remove("hide");
  } else leftNav.classList.add("hide");
});

// event listener for media quary
const mediaQuary = function (width: object) {
  //@ts-ignore
  if (width.matches) {
    if (leftNav.classList.contains("hide")) {
      leftNav.classList.remove("hide");
    } else leftNav.classList.add("hide");
  }
};

const maxWidth60em = window.matchMedia("(max-width: 50em)");
const minWidth60em = window.matchMedia("(min-width: 50em)");
// console.log(maxWidth60em);
maxWidth60em.addListener(mediaQuary);
minWidth60em.addListener(mediaQuary);
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

const tasks = document.querySelector("#task-list")!;
const listTask = function (): void {
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
              create({
                tag: "button",
                attributes: {
                  id: "tooltip2",
                  className: "delete",
                  role: "tooltip2",
                  textContent: "Delete",
                },
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

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

//popup
import { createPopper } from "@popperjs/core";

const menuBtn = document.querySelector(".heading-logos")! as HTMLButtonElement;
const tooltip = document.querySelector("#tooltip")! as HTMLButtonElement;

// const moreBtn = document.querySelector(".more--icon")! as HTMLButtonElement;
// const tooltip2 = document.querySelector(".delete")! as HTMLButtonElement;
/*
function show() {
  tooltip.setAttribute("data-show", "");
  tooltip2.setAttribute("data-show", "");

  // We need to tell Popper to update the tooltip position
  // after we show the tooltip, otherwise it will be incorrect

  instance.update();
  instance2.update();
}*/
// function hide() {
//   tooltip.removeAttribute("data-show");
// }

const showEvents = ["mouseover", "focus"];
// const hideEvents = ["click", "blur"];

showEvents.forEach((event) => {
  menuBtn.addEventListener(event, function () {
    tooltip.setAttribute("data-show", "");

    instance.update();
  });
});

// showEvents.forEach((event) => {
//   moreBtn.addEventListener(event, function () {
//     tooltip2.setAttribute("data-show", "");

//     instance2.update();
//   });
// });

tooltip.addEventListener("click", function () {
  tooltip.removeAttribute("data-show");
  tasks.innerHTML = "";
  taskList = [];
  setItem("task-list", null);
});

window.addEventListener("click", function () {
  tooltip.removeAttribute("data-show");
});

/*
tooltip2.addEventListener("click", function () {
  const parentEL = tooltip2.parentElement! as HTMLDivElement;
  parentEL.innerHTML = "";
  taskList = [];
  setItem("task-list", null);
});
*/

// hideEvents.forEach((event) => {
//   tooltip.addEventListener(event, hide);
//   // document.addEventListener("click", function () {
//   //   tooltip.removeAttribute("data-show");
//
//   // });
// });

const instance = createPopper(menuBtn, tooltip, {
  placement: "bottom-end",
});

// console.log(instance);

//deleting function more--icon delete

// const instance2 = createPopper(moreBtn, tooltip2, {
//   placement: "bottom-end",
// });
