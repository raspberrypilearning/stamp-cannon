# Stamp Cannon

## Project overview
Stamp Cannon is a loops project disguised as a toy. The learner aims a cartoon cannon with the mouse and clicks to fire stamped shapes across the screen.

The starting version already works, but only in a limited way: one click places one star stamp. The finished version uses a visible `for` loop in `en/code/stamp-cannon-complete/main.js` to turn a single click into a full volley and then adds more shapes and variation.

## Learner interactions
- Move the mouse to aim the cannon
- Click to fire stamps
- Press **UP** and **DOWN** to change how many stamps appear in the volley
- Press **1**, **2**, or **3** to switch shape in the finished version
- Press **C** to clear the canvas

## Core learning goal
Use a loop to repeat an action and use the loop index to change the result.

In the finished version, the loop index affects:
- position
- size
- colour
- rotation

## File structure
- `en/code/stamp-cannon-starter/index.html` — browser starter page
- `en/code/stamp-cannon-starter/style.css` — browser starter styling
- `en/code/stamp-cannon-starter/main.js` — learner starter file
- `en/code/stamp-cannon-complete/index.html` — browser final page
- `en/code/stamp-cannon-complete/style.css` — browser final styling
- `en/code/stamp-cannon-complete/main.js` — finished browser reference
- `en/resources/projectshaper-waypoints.md` — teaching sequence with tests
- `en/resources/legacy-root-index.html`, `legacy-root-style.css`, and `legacy-root-main.js` — scratch browser copy from an earlier iteration, not the canonical teaching path

## Design notes
For the browser version, the core learner edits should stay concentrated in `en/code/stamp-cannon-starter/main.js`, especially:
- the click or pointer behaviour
- the visible `for` loop in `fireVolley(...)`
- stamp count controls
- shape switching
- per-stamp variation using the loop index
