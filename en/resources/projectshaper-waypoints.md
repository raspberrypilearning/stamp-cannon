# Stamp Cannon teaching waypoints

## Runtime note
- In the browser-based version for the Raspberry Pi Foundation editor, the learner starter file is `en/code/stamp-cannon-starter/main.js`.
- The finished reference file is `en/code/stamp-cannon-complete/main.js`.
- In both versions, `index.html` and `style.css` are setup files and should stay unchanged for the core lesson.
- The old Python files are no longer the live teaching path for the integrated editor.

## Starter shape of the project
The starter version should already do these things:
- draw the background, cannon, and HUD
- aim the cannon at the pointer
- fire exactly one `star` stamp on click
- let UP and DOWN change the number shown in the HUD
- clear the canvas with `C`

The starter version should not yet do these things:
- use `stampCount` to fire multiple stamps
- switch between star, square, and flower
- change size, colour, or rotation across a volley

## 1. Starting point: one star on click
**What the learner edits**
- Nothing yet. Run the starter project and inspect what it already does.

**Visible result**
- The cannon points at the mouse or pointer.
- Clicking places exactly one star stamp.
- UP and DOWN change the number shown in the HUD, but that number does not affect the shot yet.

**Manual test**
- Click three different places.
- Confirm that exactly one star appears per click.
- Press UP a few times and confirm the HUD number changes.
- Click again and confirm it still places only one star.

---

## 2. Turn one stamp into a repeated volley
**What the learner edits**
- In `en/code/stamp-cannon-starter/main.js`, edit `fireVolley(targetX, targetY)` and replace the single `addStamp(...)` call with a `for` loop.
- Use `getMuzzlePosition(targetX, targetY)` to get the cannon tip.
- Use `lerpNum(...)` so each stamp sits somewhere between the cannon and the pointer.
- Use `stampCount` as the loop limit.

**Visible result**
- One click now creates several stamps in a line.
- Changing the count in the HUD changes how many stamps appear.

**Manual test**
- Set the count to 3 and click once: you should see 3 stamps.
- Set the count to 8 and click once: you should see 8 stamps.
- Aim in different directions and confirm the line follows the cannon.

---

## 3. Use the loop index to change size
**What the learner edits**
- Inside the `for` loop in `fireVolley(...)`, create a `stampSize` using `stampIndex`.
- Pass that changing size into `addStamp(...)`.

**Visible result**
- The stamps in the volley are no longer all the same size.
- The line of stamps should clearly grow or shrink.

**Manual test**
- Fire a volley with 6 or more stamps.
- Confirm the first and last stamps are visibly different sizes.
- Check that the count controls still work.

---

## 4. Use the loop index to change colour
**What the learner edits**
- Inside the loop, create `stampColour` with `paletteColour(stampIndex)`.
- Pass the colour into `addStamp(...)`.

**Visible result**
- The volley changes colour across the line.
- Repeated clicks create brighter, more patterned results.

**Manual test**
- Fire a long volley and confirm at least three different colours appear.
- Click in different directions and check that the colour sequence still changes across the volley.

---

## 5. Add more shapes
**What the learner edits**
- In the `keydown` handler in `en/code/stamp-cannon-starter/main.js`, add controls so `1` selects `star`, `2` selects `square`, and `3` selects `flower`.
- Store the chosen shape in `currentShape`.

**Visible result**
- The HUD shape label changes.
- New shots use the selected shape.

**Manual test**
- Press 1 and fire a shot: star stamps should appear.
- Press 2 and fire a shot: square stamps should appear.
- Press 3 and fire a shot: flower stamps should appear.
- Confirm old stamps stay on the canvas until you press `C`.

---

## 6. Add rotation across the volley
**What the learner edits**
- Inside the loop, calculate `stampAngle` using `barrelAngle` and `stampIndex`.
- Pass the angle into `addStamp(...)`.

**Visible result**
- The stamps twist or spin through the volley.
- Square and star volleys become much more obviously patterned.

**Manual test**
- Choose square or star.
- Fire a volley with at least 6 stamps.
- Confirm the stamps do not all point the same way.
- Try a horizontal shot and a diagonal shot and confirm the firing direction affects the starting angle.

---

## Finished-code checks
By the end, the learner should be able to verify all of these:
- One click creates a full volley
- UP and DOWN change the number of stamps
- The loop index changes position
- The loop index changes size
- The loop index changes colour
- Keys 1, 2, 3 switch shape
- Rotation changes across the volley
- `C` clears the canvas
