<h2 class="c-project-heading--task">Colour the Volley</h2>

--- task ---
Use `paletteColour(...)` so the loop index changes the colour of each stamp across the line.
--- /task ---

### Step 1

The helper function `paletteColour(index)` already returns a repeating colour from the palette, so you can feed it the loop index instead of writing colour values by hand.

### Step 2

Store the result in `stampColour` and pass that colour into `addStamp(...)`. This keeps the size logic from the previous step and adds a visible pattern each time the volley repeats.

<div class="c-project-code">

--- code ---
---
language: js
filename: main.js
line_numbers: true
line_number_start: 243
line_highlights: 251,253
--- 
function fireVolley(targetX, targetY) {
  const { muzzleX, muzzleY } = getMuzzlePosition(targetX, targetY);

  for (let stampIndex = 0; stampIndex < stampCount; stampIndex += 1) {
    const amount = stampCount === 1 ? 1 : stampIndex / (stampCount - 1);
    const stampX = lerpNum(muzzleX, targetX, amount);
    const stampY = lerpNum(muzzleY, targetY, amount);
    const stampSize = 18 + stampIndex * 7;
    const stampColour = paletteColour(stampIndex);

    addStamp(stampX, stampY, stampSize, stampColour, currentShape, 0);
  }
}
--- /code ---

</div>

<h2 class="c-project-heading--task">Test</h2>

--- task ---
Fire a long volley and confirm that at least three different colours appear across the line instead of every stamp staying the same colour.
--- /task ---
