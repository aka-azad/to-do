import "./style.scss";
import { create, elIcon, setItem } from "./utils";
import feather from "feather-icons";

feather.replace({ class: "foo bar", "stroke-width": 1 });

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
}

const taskList: ITaskList[] = [];
const taskTitle = document.querySelector(
  ".input__task-name"
)! as HTMLInputElement;
const taskDescription = document.querySelector(
  ".input__task-description"
)! as HTMLInputElement;

const submitTask = document.querySelector(".to-do__inputs")! as HTMLFormElement;

const gatherInputValue = function () {
  const titleValue = taskTitle.value;
  const descriptionValue = taskDescription.value;

  return { title: titleValue, desc: descriptionValue };
};

const clearInputs = function () {
  taskTitle.value = "";
  taskDescription.value = "";
};
const addTask = function (title: string, desc: string): void {
  const newTask = { title, desc, id: Math.random().toString() };

  taskList.push(newTask);
  setItem("task-list", taskList);
  taskComp(title, desc, "1");
};
const submitHandler = function (e: Event) {
  e.preventDefault();

  const userInput = gatherInputValue();
  const { title, desc } = userInput;
  addTask(title, desc);

  feather.replace({ class: "foo bar", "stroke-width": 1 });
  clearInputs();
};

submitTask.addEventListener("submit", submitHandler);

//list items
// <li class="to-do__list-cont">
//                   <div class="to-do__list-cont--top">
//                     <div class="to-do__left-cont">
//                       <button class="grab--btn btn-hollow">
//                         <i data-feather="hexagon"></i>
//                       </button>
//                       <div class="radio--btn">
//                         <input
//                           type="radio"
//                           title="task-is-complet"
//                           id="radio1"
//                         />
//                         <label class="task-name" for="radio1">kuch bhi</label>
//                       </div>
//                     </div>
//                     <div class="to-do__right-cont">
//                       <button class="edit--icon btn-hollow">
//                         <i data-feather="edit-3"></i>
//                       </button>
//                       <button class="more--icon btn-hollow">
//                         <i data-feather="more-horizontal"></i>
//                       </button>
//                     </div>
//                   </div>

//                   <p class="to-do__dscr">bla bla bla</p>
//                 </li>

function taskComp(title: string, desc: string, id: string) {
  const tasks = document.querySelector("#task-list");
  const list = create({
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
                      textContent: title,
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
          textContent: desc,
        },
      }),
    ],
  });
  tasks?.appendChild(list);
  console.log(tasks);
}
