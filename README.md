# QuickNotes

QuickNotes is a simple note-taking web application built using HTML, CSS and JavaScript. It allows users to create notes, organise them into categories, search through saved notes, track word and character counts while writing, delete individual notes and clear all notes when needed. Notes are stored in the browser using localStorage, allowing them to remain available after the page is refreshed.

## Features

- Add new notes
- Organise notes into Personal, Work and Study categories
- Display different styling for each category
- Display the date and time each note was created
- Live word counter while writing a note
- Live character counter with a 200-character limit
- Warning when approaching the 200-character limit
- Validate empty notes
- Validate notes longer than 200 characters
- Delete individual notes
- Clear all notes with a confirmation prompt
- Search notes without case sensitivity
- Display a message when no notes match a search
- Automatically display the total number of notes
- Save notes using localStorage
- Keep notes after the browser is refreshedgit st
- Responsive layout for mobile devices

## How to Run Locally

1. Download or clone this repository.
2. Open the `quicknotes-app` folder.
3. Open `index.html` in a web browser.
4. Start adding notes.

No server or additional software is required.

## How to Use QuickNotes

1. Type a note into the note input.
2. Select a category: Personal, Work or Study.
3. Watch the word and character counters update as you type.
4. Keep the note within the 200-character limit.
5. Click **Add Note** to save the note.
6. Use the search box to find saved notes.
7. Click **Delete** to remove an individual note.
8. Click **Clear All** to remove every note.
9. Confirm the deletion when the browser asks **"Delete all notes?"**.

## Validation

QuickNotes checks user input before a note is added.

If the note is empty, the application displays:

> Please type a note first.

If the note contains more than 200 characters, the application displays:

> Notes must be 200 characters or fewer.

The character counter also changes appearance as the user approaches or exceeds the 200-character limit.

## Local Storage

QuickNotes uses the browser's localStorage to save notes.

The notes array is converted into JSON using:

`JSON.stringify()`

When the application loads, the saved JSON is converted back into a JavaScript array using:

`JSON.parse()`

This means notes remain available even after the page is refreshed.

Deleting an individual note or clearing all notes also updates localStorage.

## What I Learned

- How to use JavaScript arrays and objects to manage application data.
- How to use `querySelector()` to select HTML elements.
- How to manipulate the DOM using `createElement()`, `appendChild()` and `textContent`.
- How to safely display user-entered text without using `innerHTML`.
- How to handle form submission using event listeners.
- How to use input events to create live word and character counters.
- How to validate user input before creating a note.
- How to use `filter()` to delete notes and search through notes.
- How to use `localStorage` to save data in the browser.
- How to use `JSON.stringify()` and `JSON.parse()` when storing arrays.
- How to use `confirm()` before performing a destructive action.
- How to use Flexbox to arrange page elements.
- How to use media queries to create a responsive mobile layout.
- How to build a small application progressively using Git commits.