<h2 class="c-project-heading--task">Rotate Each Stamp</h2>

--- task ---
Use the barrel angle and loop index to rotate the stamps so the volley twists as it travels.
--- /task ---

### Step 1

Go back to `fireVolley(targetX, targetY)` and keep the size and colour changes from the earlier steps. The new idea here is to calculate a different angle for each repeated stamp.

### Step 2

Ask `getMuzzlePosition(...)` for `barrelAngle`, then add a small amount for each `stampIndex`. Passing that `stampAngle` into `addStamp(...)` makes the pattern look much more lively, especially with square and star stamps.

<div class="c-project-code">

--- code ---
---
language: js
filename: main.js
line_numbers: true
line_number_start: 243
line_highlights: 244,252,254
--- 
function fireVolley(targetX, targetY) {
  const { muzzleX, muzzleY, barrelAngle } = getMuzzlePosition(targetX, targetY);

  for (let stampIndex = 0; stampIndex < stampCount; stampIndex += 1) {
    const amount = stampCount === 1 ? 1 : stampIndex / (stampCount - 1);
    const stampX = lerpNum(muzzleX, targetX, amount);
    const stampY = lerpNum(muzzleY, targetY, amount);
    const stampSize = 18 + stampIndex * 7;
    const stampColour = paletteColour(stampIndex);
    const stampAngle = barrelAngle + stampIndex * 0.35;

    addStamp(stampX, stampY, stampSize, stampColour, currentShape, stampAngle);
  }
}
--- /code ---

</div>

<h2 class="c-project-heading--task">Test</h2>

--- task ---
Choose square or star, fire a volley with at least 6 stamps, and confirm the stamps no longer all point the same way while the colour, size, and shape controls still work.
--- /task ---
