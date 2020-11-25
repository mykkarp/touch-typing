import { lessonsSource, testSource } from "./source.js";

class Content {
  constructor(obj, key) {
    this.array = obj[key];
    this.currentFloor = 0;
    this.value = "";
    this.mistakesCount = 0;
    this.spaceCount = 0;
    this.symbols = 0;
  }

  _getAmountOfWords() {
    let amount = 0;
    for (let i = 0; i < this.array.length; i++) {
      amount += this.array[i].length;
    }
    return amount - 1;
  }

  getWords() {
    this.floorArray = this.array[this.currentFloor];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.floorArray.length; i++) {
      const word = document.createElement("span");
      word.textContent = `${this.floorArray[i]}`;
      fragment.appendChild(word);
    }
    this.currentFloor++;

    return fragment;
  }

  keyUp(e) {
    if (this.currentFloor === this.array.length) {
      e.preventDefault();
      return;
    }
    if (
      e.key === "Alt" ||
      e.key === "Control" ||
      e.key === "Shift" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "CapsLock" ||
      e.key === "Enter" ||
      e.key === "Escape" ||
      e.key === "Meta"
    ) {
      e.preventDefault();
      return;
    }
    if (e.key === "Backspace") {
      if (this.value.length === 0) {
        return;
      } else {
        if (this.value[this.value.length - 1] === " ") {
          e.preventDefault();
          return;
        }
        this.value = this.value.substring(0, this.value.length - 1);
        this.symbolsAmount.textContent = this.symbols;
        return;
      }
    }
    if (e.key === " ") {
      if (
        this.value[this.value.length - 1] === " " ||
        this.value.length === 0
      ) {
        e.preventDefault();
        return;
      } else {
        this.spaceCount++;
        this.progress.textContent = `${Math.ceil(
          (this.spaceCount / this._getAmountOfWords()) * 100
        )}`;
      }
    }
    this.value += e.key;
    let arr = this.value.split(" ");
    if (e.key === " ") {
      let tempArr = arr.slice(0, -1);
      if (tempArr[tempArr.length - 1] === this.floorArray[tempArr.length - 1]) {
        this.words[tempArr.length - 1].setAttribute("id", "previous--correct");
        this.symbols += tempArr[tempArr.length - 1].length;
        this.symbolsAmount.textContent = this.symbols;
      } else {
        this.symbols += tempArr[tempArr.length - 1].length;
        this.symbolsAmount.textContent = this.symbols;
        this.words[tempArr.length - 1].setAttribute(
          "id",
          "previous--not-correct"
        );
        this.mistakesCount++;
        this.mistakes.textContent = this.mistakesCount;

        this.accuracy.textContent = `${Math.ceil(
          100 - (this.mistakesCount / this._getAmountOfWords()) * 100
        )}`;
      }
      if (tempArr.length === this.floorArray.length) {
        this.createWords();
        this.value = "";
        e.target.value = "";
        this.words = document.querySelectorAll(".lesson__words span");
        if (this.currentFloor === this.array.length) {
          clearInterval(this.timer);
        }
      }
    }
  }
  createWords() {
    document.querySelector(".lesson__words").innerHTML = "";
    document.querySelector(".lesson__words").appendChild(this.getWords());
  }
  timer(e) {
    let s = 0;
    let m = 0;
    let count = 0;
    this.timer = setInterval(() => {
      count++;
      if (count % 60) {
        s++;
      } else {
        m++;
        s = 0;
      }

      this.time.textContent = `${addZero(m)}:${addZero(s)}`;
    }, 1000);
    e.target.onkeydown = null;

    function addZero(n) {
      return (parseInt(n, 10) < 10 ? "0" : "") + n;
    }
  }
}

export function createContent() {
  const key = this;
  const field__content = document.querySelector(".field__content");

  if (key.id === "intro") {
    field__content.innerHTML = `
    <header class="header">
      <div class="header__title">
        <span>Вступление</span>
      </div>
    </header>
    <main class="main">

      <div class="why">
        <div class="why__quote">
          <q>Слепой метод набора — способ эффективно набирать текст десятью пальцами не глядя на клавиатуру.</q>
        </div>
        <div class="why__task">
          <div class="why__why"><span>Зачем?</span></div>
          <div class="why__benefits">
            <p><span>Слепой набор</span> позволяет не думать о процессе печати и сосредоточиться на тексте и своих мыслях. Также:</p>
            <ul class="why__list">
              <li><span>Хорошая техника позволяет сократить количество ошибок</span></li>
              <li><span>С опытом скорость набора текста станет выше</span></li>
              <li><span>При необходимости достаточно легко учатся новые алфавиты</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="hands">
        <div class="hands__title"><span>Постановка рук</span></div>
        <img src="./img/hand_on_key.jpg" alt="photo">
        <p class="hands__text">Выпирающие полоски на клавишах <span>F</span> и <span>J</span> — это специальные метки, показывающие место для указательных пальцев в состоянии покоя.</p>
        <img src="./img/hands_on_keyboard.jpg" alt="photo">
        <q class="hands__quote">Постановка рук — это первое с чего начинают практику слепого набора.</q>
      </div>

      <div class="typing">
        <div class="typing__title"><span>Набор</span></div>
        <div class="typing__text">
        <p>В слепом наборе у каждого пальца есть своя зона на клавиатуре. Только соответствующий палец может нажимать клавиши своей зоны. Это особенно сложное ограничение для тех, кто уже постоянно и активно печатает, так как требует от человека изменения привычек.</p>
        <p>К сожалению, стандартные клавиатуры сделаны так, что большая нагрузка выпадает на мизинцы, особенно на правый мизинец у программистов. У эргономичных клавиатур управляющие клавиши часто выносят под большие пальцы, так как они недозагружены и, в целом, более сильные и подвижные по сравнению с мизинцами.</p>
        </div>
      </div>

    </main>
    `;
  } else if (key.id === "test") {
    field__content.innerHTML = `
    <header class="header">
      <div class="header__title">
        <span>Тест скорости печати</span>
      </div>
    </header>

    <main class="main">

      <div class="lesson__statistic statistic">
        <div class="statistic__row">
          <div class="statistic__item">
            <div><span id="progress">0</span>%</div>
            <span>Прогресс</span>
          </div>
          <div class="statistic__item">
            <div><span id="symbolsAmount">0</span></div>
            <span>Знаки</span>
          </div>
          <div class="statistic__item">
            <div><span id="mistakes">0</span></div>
            <span>Ошибки</span>
          </div>
          <div class="statistic__item">
            <div><span id="accuracy">100</span>%</div>
            <span>Точность</span>
          </div>
          <div class="statistic__item">
            <div><span id="time">00:00</span></div>
            <span>Время</span>
          </div>
        </div>
      </div> 
      
      <div class="test__row">
        <textarea class="lesson__input"></textarea>
        <div class="lesson__words">
        </div>
      </div>
    </main>
    `;

    const input = document.querySelector(".lesson__input");
    input.focus();
    input.onblur = () => input.focus();

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const content = new Content(testSource, `text${getRandomInt(5) + 1}`);
    input.addEventListener("keydown", (e) => content.keyUp.call(content, e));
    input.onkeydown = (e) => content.timer.call(content, e);
    content.createWords();
    content.words = document.querySelectorAll(".lesson__words span");
    content.progress = document.querySelector("#progress");
    content.symbolsAmount = document.querySelector("#symbolsAmount");
    content.mistakes = document.querySelector("#mistakes");
    content.accuracy = document.querySelector("#accuracy");
    content.time = document.querySelector("#time");
    console.log(time);
  } else {
    field__content.innerHTML = `
    <header class="header">
      <div class="header__title">
        <span>Урок ${key.id.slice(-1)}</span>
      </div>
    </header>

    <main class="main">
      <div class="lesson">
        <div class="lesson__words">
        </div>
        <textarea class="lesson__input"></textarea>
        <div class="lesson__statistic statistic">
          <div class="statistic__row">
            <div class="statistic__item">
              <div><span id="progress">0</span>%</div>
              <span>Прогресс</span>
            </div>
            <div class="statistic__item">
              <div><span id="symbolsAmount">0</span></div>
              <span>Знаки</span>
            </div>
            <div class="statistic__item">
              <div><span id="mistakes">0</span></div>
              <span>Ошибки</span>
            </div>
            <div class="statistic__item">
              <div><span id="accuracy">100</span>%</div>
              <span>Точность</span>
            </div>
            <div class="statistic__item">
              <div><span id="time">00:00</span></div>
              <span>Время</span>
            </div>
          </div>
        </div>
        <img src="./img/hands_on_keyboard.jpg" alt="photo">
      </div>
    </main>
    `;

    const input = document.querySelector(".lesson__input");
    input.focus();
    input.onblur = () => input.focus();

    const content = new Content(lessonsSource, key.id);
    input.addEventListener("keydown", (e) => content.keyUp.call(content, e));
    input.onkeydown = (e) => content.timer.call(content, e);
    content.createWords();
    content.words = document.querySelectorAll(".lesson__words span");
    content.progress = document.querySelector("#progress");
    content.symbolsAmount = document.querySelector("#symbolsAmount");
    content.mistakes = document.querySelector("#mistakes");
    content.accuracy = document.querySelector("#accuracy");
    content.time = document.querySelector("#time");
  }
}
