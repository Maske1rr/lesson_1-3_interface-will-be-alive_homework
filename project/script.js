"use strict";

// ДЗ 3. Интерактивная коллекция.
// Выполняйте практические этапы из docs/HOME_WORK.md по порядку.
// Не пытайтесь написать весь файл за один раз: после каждого этапа проверяйте
// связанный сценарий в браузере и фиксируйте рабочее состояние коммитом.

// Этап 3. Найдите карточки и элементы панели подробностей.
// Реализуйте одну общую функцию выбора карточки.

const cards = document.querySelectorAll(".collection-card");
const panel = document.querySelector("#details-panel");
const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");
const detailsNumber = document.querySelector("#details-number");

function selectCard(card) {
  cards.forEach((item) => {
    item.classList.remove("collection-card--selected");
    item.setAttribute("aria-pressed", "false");
  });

  card.classList.add("collection-card--selected");
  card.setAttribute("aria-pressed", "true");

  detailsTitle.textContent = card.dataset.title;
  detailsDescription.textContent = card.dataset.description;
  detailsNumber.textContent = card.querySelector(".collection-card__meta span").textContent;

  panel.classList.add("details-panel--pulse");
}

cards.forEach((card) => {
  card.addEventListener("click", () => selectCard(card));
});

panel.addEventListener("animationend", () => {
  panel.classList.remove("details-panel--pulse");
});

const totalCount = String(cards.length).padStart(2, "0");

document.querySelectorAll(".total-count").forEach((element) => {
  element.textContent = totalCount;
});

// Этап 4. Найдите кнопки фильтров.
// Показывайте подходящие карточки, обновляйте активную кнопку и счетчик.
// Учтите случай, когда новый фильтр скрывает выбранную карточку.

// Этап 5. Реализуйте случайный выбор среди видимых карточек.
// Затем реализуйте полный сброс интерфейса.

// Этап 6. Запускайте подготовленную CSS-анимацию через класс.
// Не дублируйте оформление в script.js.
