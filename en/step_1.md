<h2 class="c-project-heading--task">Fire a Full Volley</h2>

--- task ---
Use a `for` loop to turn one click into a line of stamps from the cannon to the pointer.
--- /task ---

### Step 1

Click **Run** and then click around the output to see how the stamp cannon works - right now, you can only make orange stars or press `c` to clear the canvas.

### Step 2

Open `main.js` in the file menu and find `fireVolley(targetX, targetY)`. 
Right now the function places one stamp directly at the pointer, so the click ignores the `stampCount` shown in the HUD.

### Step 3

Replace the old single `addStamp(...)` line with a `for` loop. Get the cannon muzzle position first, then use `amount` to move from `0` at the cannon tip to `1` at the pointer, and use `lerpNum(...)` to place each stamp between those two points.

<div class="c-project-code">

--- code ---
---
language: js
filename: main.js
line_numbers: true
line_number_start: 243
line_highlights: 244,246-251
--- 
function fireVolley(targetX, targetY) {
  const { muzzleX, muzzleY } = getMuzzlePosition(targetX, targetY);

  for (let stampIndex = 0; stampIndex < stampCount; stampIndex += 1) {
    const amount = stampCount === 1 ? 1 : stampIndex / (stampCount - 1);
    const stampX = lerpNum(muzzleX, targetX, amount);
    const stampY = lerpNum(muzzleY, targetY, amount);

    addStamp(stampX, stampY, 34, [255, 190, 70], currentShape, 0);
  }
}
--- /code ---

</div>

<h2 class="c-project-heading--task">Test</h2>

--- task ---
Set the count to 3 and click once, then set it to 8 and click again; each click should create a line of stamps that matches the number shown in the HUD.
--- /task ---
