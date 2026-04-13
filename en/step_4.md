<h2 class="c-project-heading--task">Switch Shape Controls</h2>

--- task ---
Add keyboard controls that change `currentShape` so the cannon can fire stars, squares, or flowers.
--- /task ---

### Step 1

Find the `keydown` handler near the bottom of `main.js` in the `stamp-cannon-starter` project. The arrow keys already change the count, so this is the right place to add the shape controls as well.

### Step 2

Convert the pressed key to uppercase once, then use `1`, `2`, and `3` to set `currentShape`. Keep the `C` key in the same chain so clearing the canvas still works after you add the new controls.

<div class="c-project-code">

--- code ---
---
language: js
filename: main.js
line_numbers: true
line_number_start: 280
line_highlights: 281,295-302
--- 
window.addEventListener("keydown", (event) => {
  const pressed = event.key.toUpperCase();

  if (event.key === "ArrowUp") {
    stampCount = clamp(stampCount + 1, 1, 12);
    event.preventDefault();
    return;
  }

  if (event.key === "ArrowDown") {
    stampCount = clamp(stampCount - 1, 1, 12);
    event.preventDefault();
    return;
  }

  if (pressed === "1") {
    currentShape = "star";
  } else if (pressed === "2") {
    currentShape = "square";
  } else if (pressed === "3") {
    currentShape = "flower";
  } else if (pressed === "C") {
    clearStamps();
  }
});
--- /code ---

</div>

<h2 class="c-project-heading--task">Test</h2>

--- task ---
Press 1, 2, and 3 before firing and check that new shots change between star, square, and flower while older stamps stay on the canvas until you press C.
--- /task ---
