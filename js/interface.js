import { createContent } from "./createContent.js";

createInterface();
export default function createInterface() {
  const wrapper = document.createElement("div");
  const nav = document.createElement("div");
  const nav__row = document.createElement("div");
  const field = document.createElement("div");

  const app__bg = document.createElement("img");
  app__bg.setAttribute("src", "./img/bg.jpg");
  app__bg.classList.add("app__bg");
  document.body.append(app__bg);
  field.innerHTML = `
    <div class="field__content">
      <div class="introduction">
        <div class="introduction__name"><span>Карпик Михаил Виталиевич</span></div>
        <div class="introduction__group"><span>481 группа</span></div>
        <div class="introduction__project-name"><span>программа "Клавиатурный тренажёр"</span></div>
        <img src="./img/icon--big.png" alt=""></img>
      </div>
    </div>
  `;

  wrapper.classList.add("wrapper");
  nav.classList.add("nav");
  nav__row.classList.add("nav__row");
  field.classList.add("field");

  document.body.appendChild(wrapper);
  wrapper.appendChild(nav);
  nav.appendChild(nav__row);
  nav__row.appendChild(createElements());
  wrapper.appendChild(field);

  function createElements() {
    const barElements = {
      title: { id: "title", content: "Touch Typing Study" },
      intro: { id: "intro", content: "Вступление" },
      lesson1: { id: "lesson1", content: "Урок 1" },
      lesson2: { id: "lesson2", content: "Урок 2" },
      lesson3: { id: "lesson3", content: "Урок 3" },
      lesson4: { id: "lesson4", content: "Урок 4" },
      lesson5: { id: "lesson5", content: "Урок 5" },
      lesson6: { id: "lesson6", content: "Урок 6" },
      lesson7: { id: "lesson7", content: "Урок 7" },
      lesson8: { id: "lesson8", content: "Урок 8" },
      test: { id: "test", content: "Пройти тест скорости печати" },
    };
    const fragment = document.createDocumentFragment();
    for (const key in barElements) {
      const nav__item = document.createElement("div");
      if (key !== "title") {
        nav__item.addEventListener("mouseover", () => {
          nav__item.classList.add("nav__item--hover");
        });
        nav__item.addEventListener("mouseleave", () => {
          if (nav__item.classList.contains("nav__item--hover")) {
            nav__item.classList.remove("nav__item--hover");
          }
        });
        nav__item.addEventListener("mouseup", swapActiveColor);
        nav__item.addEventListener("mouseup", createContent);
      }
      nav__item.classList.add("nav__item");
      nav__item.setAttribute("id", `${barElements[key].id}`);
      if (nav__item.id === "test") nav__item.classList.add("test");
      nav__item.innerHTML = `<span>${barElements[key].content}</span>`;

      setTimeout(() => {
        if (key === "intro") {
          nav__item.click();
        }
      }, 0);

      fragment.appendChild(nav__item);
    }
    return fragment;
  }

  let currentSelected = document.querySelector("#intro");
  function swapActiveColor() {
    if (currentSelected !== null) {
      currentSelected.classList.remove("nav__item--selected");
      if (currentSelected.classList.contains("nav__item--selected-test")) {
        currentSelected.classList.remove("nav__item--selected-test");
      }
    }
    this.classList.add("nav__item--selected");
    if (this.id === "test") {
      this.classList.add("nav__item--selected-test");
    }
    currentSelected = this;
  }
}
