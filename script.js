// -------------------------
// Select Page Elements
// -------------------------

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const wordCount = document.querySelector("#word-count");
const charCount = document.querySelector("#char-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");


// -------------------------
// Load Saved Notes
// -------------------------

const savedNotes = localStorage.getItem("notes");

let notes = savedNotes
  ? JSON.parse(savedNotes)
  : [];


// -------------------------
// Save Notes
// -------------------------

function saveNotes() {

  localStorage.setItem(
    "notes",
    JSON.stringify(notes)
  );

}


// -------------------------
// Word and Character Counts
// -------------------------

function updateInputCounts() {

  const text = noteInput.value;

  // Count every character typed.
  const characters = text.length;


  // Remove surrounding spaces before
  // calculating the word count.
  const trimmedText = text.trim();

  let words = 0;

  if (trimmedText !== "") {

    words = trimmedText.split(/\s+/).length;

  }


  // Update word count.
  wordCount.textContent =
    `Words: ${words}`;


  // Update character count.
  charCount.textContent =
    `${characters} / 200 characters`;


  // Remove previous warning states.
  charCount.classList.remove(
    "warning",
    "over"
  );


  // Over the limit.
  if (characters > 200) {

    charCount.classList.add("over");

  }

  // Approaching the limit.
  else if (characters > 180) {

    charCount.classList.add("warning");

  }

}


// -------------------------
// Note Count
// -------------------------

function updateCount() {

  if (notes.length === 0) {

    noteCount.textContent =
      "You have no notes yet.";

  } else if (notes.length === 1) {

    noteCount.textContent =
      "You have 1 note.";

  } else {

    noteCount.textContent =
      `You have ${notes.length} notes.`;

  }

}


// -------------------------
// Render Notes
// -------------------------

function render() {

  // Clear the displayed list.
  notesList.textContent = "";


  // Get current search text.
  const searchText = searchInput.value
    .trim()
    .toLowerCase();


  // Find notes matching the search.
  const filteredNotes = notes.filter(function (note) {

    return note.text
      .toLowerCase()
      .includes(searchText);

  });


  // Display a message if a search
  // produces no results.
  if (
    searchText !== "" &&
    filteredNotes.length === 0
  ) {

    const message =
      document.createElement("li");

    message.textContent =
      "No notes match your search.";

    notesList.appendChild(message);

  }


  // Display matching notes.
  filteredNotes.forEach(function (note) {

    const listItem =
      document.createElement("li");

    listItem.classList.add("note-card");

    listItem.classList.add(
      `category-${note.category.toLowerCase()}`
    );


    // -------------------------
    // Note Text
    // -------------------------

    const noteText =
      document.createElement("p");

    // Use textContent for user input.
    noteText.textContent = note.text;


    // -------------------------
    // Details Container
    // -------------------------

    const details =
      document.createElement("div");

    details.classList.add("note-details");


    // -------------------------
    // Category
    // -------------------------

    const category =
      document.createElement("span");

    category.classList.add(
      "category-label"
    );

    category.textContent =
      note.category;


    // -------------------------
    // Date
    // -------------------------

    const date =
      document.createElement("span");

    date.textContent =
      note.createdAt;


    // -------------------------
    // Delete Button
    // -------------------------

    const deleteButton =
      document.createElement("button");

    deleteButton.textContent =
      "Delete";

    deleteButton.classList.add(
      "delete-btn"
    );


    deleteButton.addEventListener(
      "click",
      function () {

        // Remove only the selected note.
        notes = notes.filter(
          function (item) {

            return item.id !== note.id;

          }
        );


        // Save the updated array.
        saveNotes();


        // Update the display.
        render();

      }
    );


    // -------------------------
    // Build Details
    // -------------------------

    details.appendChild(category);
    details.appendChild(date);


    // -------------------------
    // Build Note Card
    // -------------------------

    listItem.appendChild(noteText);
    listItem.appendChild(details);
    listItem.appendChild(deleteButton);


    // Add note card to the list.
    notesList.appendChild(listItem);

  });


  // Update the total note count.
  updateCount();

}


// -------------------------
// Add Note
// -------------------------

noteForm.addEventListener(
  "submit",
  function (event) {

    // Prevent page refresh.
    event.preventDefault();


    // Get note text.
    const text =
      noteInput.value.trim();


    // -------------------------
    // Empty Validation
    // -------------------------

    if (text === "") {

      errorMessage.textContent =
        "Please type a note first.";

      return;

    }


    // -------------------------
    // 200 Character Validation
    // -------------------------

    if (text.length > 200) {

      errorMessage.textContent =
        "Notes must be 200 characters or fewer.";

      return;

    }


    // Clear previous validation errors.
    errorMessage.textContent = "";


    // -------------------------
    // Create Note Object
    // -------------------------

    const newNote = {

      id: Date.now(),

      text: text,

      category: noteCategory.value,

      createdAt:
        new Date().toLocaleString()

    };


    // Add note to array.
    notes.push(newNote);


    // Save notes.
    saveNotes();


    // Update display.
    render();


    // Clear note input.
    noteInput.value = "";


    // Reset live counters.
    updateInputCounts();

  }
);


// -------------------------
// Live Word and Character Count
// -------------------------

noteInput.addEventListener(
  "input",
  function () {

    updateInputCounts();

  }
);


// -------------------------
// Live Search
// -------------------------

searchInput.addEventListener(
  "input",
  function () {

    render();

  }
);


// -------------------------
// Clear All Notes
// -------------------------

clearAllBtn.addEventListener(
  "click",
  function () {

    // Ask the user before deleting.
    const confirmed =
      confirm("Delete all notes?");


    // Only delete when OK is selected.
    if (confirmed) {

      // Empty the notes array.
      notes = [];


      // Update localStorage.
      saveNotes();


      // Rebuild the page.
      render();

    }

  }
);


// -------------------------
// Initial Page Setup
// -------------------------

render();

updateInputCounts();