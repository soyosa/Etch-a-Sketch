
// Variables
const container = document.getElementById('container');
const gridSizeInput = document.getElementById('gridSizeInput');
const colorPicker = document.getElementById('colorPicker');
const randomColorsButton = document.getElementById('randomColorsButton');
const welcomeMessage = document.getElementById('welcome-message');

let gridSize = 16;
let currentColor = '#000';
let randomColorsEnabled = false;
let eraserMode = false;

// Event listeners
gridSizeInput.addEventListener('input', function() {
  const inputValue = gridSizeInput.value.trim();
  gridSize = inputValue !== '' ? parseInt(inputValue) : 0;
  document.documentElement.style.setProperty('--gridSize', gridSize);
});

gridSizeInput.addEventListener('change', function() {
  createGrid();
});

colorPicker.addEventListener('input', function() {
  currentColor = colorPicker.value;
  randomColorsEnabled = false; // Disable random colors when a new color is selected
  randomColorsButton.textContent = 'Random Colors: OFF';
});

// Functions
function createGrid() {
  if (gridSize > 0 && gridSize <= 100) {
    // Clear existing grid
    container.innerHTML = '';

    // Remove welcome message
    welcomeMessage.remove();

    // Create new grid
    for (let i = 0; i < gridSize * gridSize; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.addEventListener('mouseover', changeColor);
      container.appendChild(square);
    }
  } else {
    alert('Please enter a valid grid size (between 1 and 100).');
  }
}

function changeColor(event) {
  const square = event.target;
  if (eraserMode) {
    square.style.backgroundColor = '#fff';
  } else if (randomColorsEnabled) {
    square.style.backgroundColor = getRandomColor();
  } else {
    square.style.backgroundColor = currentColor;
  }
}

function toggleRandomColors() {
  randomColorsEnabled = !randomColorsEnabled;
  randomColorsButton.textContent = randomColorsEnabled ? 'Random Colors: ON' : 'Random Colors: OFF';
}

function resetGrid() {
  const squares = container.querySelectorAll('.square');
  squares.forEach(function(square) {
    square.style.backgroundColor = '#fff';
  });
}

function toggleEraser() {
  eraserMode = !eraserMode;
  if (eraserMode) {
    eraserButton.classList.add('active');
  } else {
    eraserButton.classList.remove('active');
  }
}


function getRandomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.key === 'r') {
    resetGrid();
  } else if (event.key === 'e') {
    toggleEraser();
  }
});
