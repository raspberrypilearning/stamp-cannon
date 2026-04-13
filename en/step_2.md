<h2 class="c-project-heading--task">Change Stamp Size</h2>

--- task ---
Use the loop index to make the stamps grow across the volley instead of all staying the same size.
--- /task ---

### Step 1

The loop already gives you `stampIndex`, so you can use that number to calculate a different size for every repeat of the loop.

### Step 2

Create a `stampSize` value inside the loop and pass it into `addStamp(...)`. A simple pattern like `18 + stampIndex * 7` makes the change obvious enough to see when you fire a longer volley.

<div class="c-project-code">

--- code ---
---
language: js
filename: main.js
line_numbers: true
line_number_start: 243
line_highlights: 250,252
--- 
function fireVolley(targetX, targetY) {
  const { muzzleX, muzzleY } = getMuzzlePosition(targetX, targetY);

  for (let stampIndex = 0; stampIndex < stampCount; stampIndex += 1) {
    const amount = stampCount === 1 ? 1 : stampIndex / (stampCount - 1);
    const stampX = lerpNum(muzzleX, targetX, amount);
    const stampY = lerpNum(muzzleY, targetY, amount);
    const stampSize = 18 + stampIndex * 7;

    addStamp(stampX, stampY, stampSize, [255, 190, 70], currentShape, 0);
  }
}
--- /code ---

</div>

<h2 class="c-project-heading--task">Test</h2>

--- task ---
Fire a volley with at least 6 stamps and check that the first and last stamps are clearly different sizes while the count controls still work.
--- /task ---
