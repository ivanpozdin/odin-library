const MARKED_CHECKBOX = "on";

class Book {
  constructor(name, author, pagesNumber, alreadyRead = false) {
    this.name = name;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.alreadyRead = alreadyRead;
  }
}
class BookshelfApp {
  #books = [];
  #bookCardsContainer = document.querySelector(".main-content");
  #bookForm = document.querySelector(".enter-book-info-form");
  #showFormButton = document.querySelector("#show-book-info-form");
  #bookNameField = document.querySelector("#book-name");
  #authorField = document.querySelector("#author");
  #pagesField = document.querySelector("#pages");
  #alreadyReadField = document.querySelector("#already-read");

  constructor() {
    this.#handleAddingBook();
    this.#closeFormWhenClickOutside();
  }

  #addNewBookToView(book) {
    const card = this.#generateCardElementForBook(book);
    this.#addRemoveBookHandler(card);
    this.#addChangeReadStateHandler(card);
    this.#bookCardsContainer.insertAdjacentElement("afterbegin", card);
  }

  #generateCardElementForBook(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.alreadyRead = book.alreadyRead;
    const cardInnerHTML = `
          <h3>${book.name}</h3>
          <img
            class="read-icon"
            src="imgs/read.svg"
            alt="Already read the book"
            srcset=""
          />
          <p class="author">by <em>${book.author} </em></p>
          <p class="pages-number">with ${book.pagesNumber} pages</p>
          <button class="change-read-state-btn">${
            book.alreadyRead ? `MARK UNREAD` : `MARK READ`
          }</button>
          <button class="remove-book-btn">
            <img
              class="remove-book-img"
              src="./imgs/remove.svg"
              alt="Remove book from bookshelf"
              srcset=""
            />
          </button>
          `;
    card.insertAdjacentHTML("afterbegin", cardInnerHTML);
    if (!book.alreadyRead) {
      card.querySelector(".read-icon").classList.add("hidden");
    }
    return card;
  }

  #addChangeReadStateHandler(cardElement) {
    cardElement
      .querySelector(".change-read-state-btn")
      .addEventListener("click", (e) => {
        card.querySelector(".change-read-state-btn").textContent =
          "MARK UNREAD";
        console.log("1", card.dataset.alreadyRead);
        if (card.dataset.alreadyRead == "true") {
          console.log("say HI!", card.dataset.alreadyRead);
          card.querySelector(".change-read-state-btn").textContent =
            "MARK READ";
          card.dataset.alreadyRead = false;
        } else {
          card.dataset.alreadyRead = true;
        }
        card.querySelector(".read-icon").classList.toggle("hidden");
        console.log("2", card.dataset.alreadyRead);
      });
  }

  #addRemoveBookHandler(cardElement) {
    cardElement
      .querySelector(".remove-book-btn")
      .addEventListener("click", (e) => e.target.closest(".card").remove());
  }

  #handleAddingBook() {
    this.#showFormButton.addEventListener("click", (e) => {
      this.#bookForm.classList.remove("hidden");
    });
    this.#bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#addNewBookToView(
        new Book(
          this.#bookNameField.value,
          this.#authorField.value,
          this.#pagesField.value,
          this.#alreadyReadField.checked
        )
      );
      this.#bookForm.reset();
      this.#bookForm.classList.add("hidden");
    });
  }

  #closeFormWhenClickOutside() {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".enter-book-info-form") &&
        !e.target.closest("#show-book-info-form")
      ) {
        this.#bookForm.classList.add("hidden");
      }
    });
  }
}
new BookshelfApp();
