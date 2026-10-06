// Select elements
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// Store notes
let notes = [];

// Display notes
function render() {
  notesList.textContent = "";

  notes.forEach(function (note) {
    const listItem = document.createElement("li");

    listItem.classList.add("note-card");

    listItem.classList.add(
      `category-${note.category.toLowerCase()}`
    );

    // Note text
    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    // Note details
    const details = document.createElement("div");
    details.classList.add("note-details");

    // Category
    const category = document.createElement("span");
    category.classList.add("category-label");
    category.textContent = note.category;

    // Date
    const date = document.createElement("span");
    date.textContent = note.createdAt;

    details.appendChild(category);
    details.appendChild(date);

    listItem.appendChild(noteText);
    listItem.appendChild(details);

    notesList.appendChild(listItem);
  });
}

// Add note
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newNote = {
    id: Date.now(),
    text: noteInput.value,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);

  render();

  noteInput.value = "";
});

render();