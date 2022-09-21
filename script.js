const addBookCard = document.querySelector(".add-book-card");
const formCard = document.querySelector(".new-book");
const addButton = document.querySelector(".plusBTN");
const saveButton = document.querySelector(".addBTN");
const removeButton = document.querySelector(".removeBTN");

formCard.classList.add("hidden");

addButton.addEventListener("click", showNewForm);
saveButton.addEventListener("click", addBookToLibrary);
removeButton.addEventListener("click", hideForm);

let myLibrary = [];

class Book {
	constructor(title, author, pages, read) {
		this.Title = title;
		this.Author = author;
		this.Pages = pages;
		this.Read = read;
	}
}

Book.prototype.toggleState = function (state) {
	if (state === undefined) {
		this.Read ? (this.Read = false) : (this.Read = true);
	} else this.Read = state;
	return this.Read;
};

function addBookToLibrary() {
	let title = document.querySelector("#title").value;
	let author = document.querySelector("#author").value;
	let pages = document.querySelector("#pages").value;
	let read = document.querySelector("#read").checked;
	let newBook = new Book(title, author, pages, read);
	if (title != 0 && author != 0 && pages != 0) {
		myLibrary.push(newBook);
		displayLibrary();
		hideForm();
		addBookCard.classList.remove("hidden");
	} else alert("Please fill in all of the fields to add a book.");
}

function displayLibrary() {
	Array.from(document.querySelectorAll(".book-display")).forEach((element) =>
		element.remove()
	);
	myLibrary.forEach((book, index) => {
		displayBook(book, index);
	});
}

function displayBook(book, index) {
	const bookCard = createCard();
	bookCard.dataset.index = index;
	const heading = document.createElement("h2");
	heading.textContent = `Book ${index + 1}`;

	const infoContainer = document.createElement("div");
	infoContainer.classList.add("book-info-container");

	//create a label for each property of the book
	//display the property value
	//and add them to one container
	for (const [key, value] of Object.entries(book)) {
		let label = document.createElement("div");
		label.classList.add("label");
		label.textContent = key;
		const property = document.createElement("div");
		property.classList.add("book-property");
		if (key == "Read") {
			const readToggle = document.createElement("input");
			readToggle.setAttribute("type", "checkbox");
			readToggle.addEventListener("click", () => {
				book.toggleState();
			});
			readToggle.checked = book.toggleState(value);
			property.appendChild(readToggle);
		} else {
			property.textContent = value;
		}
		infoContainer.append(label, property);
	}

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("buttons");

	//add a "Remove" button to the book card
	const removeButton = document.createElement("button");
	removeButton.classList.add("removeBTN");
	removeButton.addEventListener("click", removeBook);
	buttonContainer.appendChild(removeButton);

	//add the label-property container and button container to the a new card
	bookCard.append(heading, infoContainer, buttonContainer);
}

function createCard() {
	const newCard = document.createElement("div");
	newCard.classList.add("card", "book-display");
	formCard.insertAdjacentElement("beforebegin", newCard);
	return newCard;
}

function showNewForm() {
	formCard.classList.remove("hidden");
	formCard.querySelector("#title").value = "";
	formCard.querySelector("#author").value = "";
	formCard.querySelector("#pages").value = "";
	formCard.querySelector("#read").checked = false;
	addBookCard.classList.add("hidden");
}

function hideForm() {
	formCard.classList.add("hidden");
	addBookCard.classList.remove("hidden");
}

function removeBook() {
	let thisCard = this.parentNode.parentNode;
	myLibrary.splice(thisCard.dataset.index, 1);
	displayLibrary();
}
