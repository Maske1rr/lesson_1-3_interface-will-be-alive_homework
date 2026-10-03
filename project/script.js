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

const initialTitle = detailsTitle.textContent;
const initialDescription = detailsDescription.textContent;
const initialNumber = detailsNumber.textContent;

function clearSelection() {
  cards.forEach((item) => {
    item.classList.remove("collection-card--selected");
    item.setAttribute("aria-pressed", "false");
  });

  detailsTitle.textContent = initialTitle;
  detailsDescription.textContent = initialDescription;
  detailsNumber.textContent = initialNumber;
}

function selectCard(card) {
  clearSelection();

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

const filterButtons = document.querySelectorAll(".filter-button");
const visibleCount = document.querySelector("#visible-count");

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("filter-button--active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  let count = 0;

  cards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("collection-card--hidden", !isVisible);

    if (isVisible) {
      count++;
    }
  });

  visibleCount.textContent = count;

  const selectedCard = document.querySelector(".collection-card--selected");

  if (selectedCard && selectedCard.classList.contains("collection-card--hidden")) {
    clearSelection();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

applyFilter("all");

// Этап 5. Реализуйте случайный выбор среди видимых карточек.
// Затем реализуйте полный сброс интерфейса.

const randomButton = document.querySelector("#random-button");

function selectRandomCard() {
  const visibleCards = Array.from(cards).filter(
    (card) => !card.classList.contains("collection-card--hidden"),
  );
  const otherCards = visibleCards.filter(
    (card) => !card.classList.contains("collection-card--selected"),
  );
  const pool = otherCards.length > 0 ? otherCards : visibleCards;

  if (pool.length === 0) {
    return;
  }

  const randomCard = pool[Math.floor(Math.random() * pool.length)];
  selectCard(randomCard);
}

randomButton.addEventListener("click", selectRandomCard);

const resetButton = document.querySelector("#reset-button");

function resetPage() {
  applyFilter("all");
  clearSelection();
}

resetButton.addEventListener("click", resetPage);

// Этап 6. Запускайте подготовленную CSS-анимацию через класс.
// Не дублируйте оформление в script.js.
