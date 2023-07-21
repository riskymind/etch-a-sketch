//DEFAULTS
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BUTTON_COLOR = "#333333";
const DEFAULT_COLOR_MODE = "color";

let currentColor = DEFAULT_BUTTON_COLOR;
let currentMode = DEFAULT_COLOR_MODE;
let currentSize = DEFAULT_GRID_SIZE;

// UI Components
const colorPickerBtn = document.getElementById("color-picker-btn");
const colorModeBtn = document.getElementById("color-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");
const gridSizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("size-slider");
const grid = document.getElementById("grid");

// app dependant
let mouseDown = false;

function setCurrentColor(color) {
  currentColor = color;
}

function setCurrentMode(mode) {
  setActiveButton(mode);
  currentMode = mode;
}

function setcurrentBoardsize(size) {
  currentSize = size;
}

// UI Events
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
clearBtn.addEventListener("click", reloadGrid);
colorPickerBtn.oninput = (e) => setCurrentColor(e.target.value);

// Change color mode
colorModeBtn.addEventListener("click", () => setCurrentMode("color"));
rainbowBtn.addEventListener("click", () => setCurrentMode("rainbow"));
eraserBtn.addEventListener("click", () => setCurrentMode("eraser"));

// Change grid size
sizeSlider.addEventListener("mousemove", (e) =>
  updateGridSizeLabel(e.target.value)
);
sizeSlider.addEventListener("change", (e) =>
  changeGridBoardSize(e.target.value)
);

// grid setup
function setupGrid(gridSize) {
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let index = 0; index < gridSize * gridSize; index++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

// change color of specific target div
function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return; // click and drag check
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    e.target.style.background = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.background = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.background = "white";
  }
}

//Reload grid space
function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

// Clear grid board
function clearGrid() {
  grid.innerHTML = "";
}

// change color mode

// Set active button
function setActiveButton(mode) {
  // remove active class first
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorModeBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  // set active color
  if (mode === "color") {
    colorModeBtn.classList.add("active");
  } else if (mode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (mode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

// Update grid size
function updateGrideSizeLabel(value) {
  gridSizeValue.textContent = `${value} * ${value}`;
}

function changeGridBoardSize(value) {
  setcurrentBoardsize(value);
  updateGrideSizeLabel(value);
  reloadGrid();
}

// Setup window grid on load
window.onload = () => {
  setupGrid(DEFAULT_GRID_SIZE);
  setActiveButton(DEFAULT_COLOR_MODE);
};
