// Possible colors
const colors = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "orange",
  "pink",
  "cyan",
];

// Stores selected colors for mixing
let selectedColors = [];

// Generate three random colors
function getRandomColors() {
  let selectedColors = [];
  while (selectedColors.length < 3) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    if (!selectedColors.includes(color)) {
      selectedColors.push(color);
    }
  }
  return selectedColors;
}

// Assign random colors to the color boxes
function setupGame() {
  const selectedColors = getRandomColors();
  document.getElementById("color1").style.backgroundColor = selectedColors[0];
  document.getElementById("color2").style.backgroundColor = selectedColors[1];
  document.getElementById("color3").style.backgroundColor = selectedColors[2];

  document
    .getElementById("color1")
    .setAttribute("data-color", selectedColors[0]);
  document
    .getElementById("color2")
    .setAttribute("data-color", selectedColors[1]);
  document
    .getElementById("color3")
    .setAttribute("data-color", selectedColors[2]);

  document.getElementById("mixing-area").style.backgroundColor = "white";

  // Reset mixed colors array
  selectedColors.length = 0;

  document.getElementById("drop-text").style.display = "block";
}

// Color selection
function selectColor(element) {
  let color = element.getAttribute("data-color");

  if (!selectedColors.includes(color)) {
    selectedColors.push(color);
  }

  // Mix colors
  let mixedColor = blendColors(selectedColors);
  document.getElementById("mixing-area").style.backgroundColor = mixedColor;

  document.getElementById("drop-text").style.display = "none";
}

// Function to blend colors
function blendColors(colorArray) {
  if (colorArray.length === 0) return "white";

  let rgbValues = colorArray.map((color) => hexToRgb(color));
  let avgR = Math.floor(
    rgbValues.reduce((sum, c) => sum + c.r, 0) / rgbValues.length
  );
  let avgG = Math.floor(
    rgbValues.reduce((sum, c) => sum + c.g, 0) / rgbValues.length
  );
  let avgB = Math.floor(
    rgbValues.reduce((sum, c) => sum + c.b, 0) / rgbValues.length
  );

  return `rgb(${avgR}, ${avgG}, ${avgB})`;
}

// Convert color name to RGB
function hexToRgb(color) {
  let tempElement = document.createElement("div");
  tempElement.style.color = color;
  document.body.appendChild(tempElement);

  let computedColor = window.getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);

  let rgbMatch = computedColor.match(/\d+/g);
  if (!rgbMatch || rgbMatch.length < 3) {
    console.error(`Failed to extract RGB from color: ${color}`);
    return null;
  }

  return {
    r: parseInt(rgbMatch[0]),
    g: parseInt(rgbMatch[1]),
    b: parseInt(rgbMatch[2]),
  };
}

// Reset the entire game
function resetGame() {
  selectedColors = [];
  setupGame();
}

// Clear only the mixing area
function clearMixingArea() {
  selectedColors = [];
  document.getElementById("mixing-area").style.backgroundColor = "white";
  document.getElementById("drop-text").style.display = "block";
}

// Initialize game
document.addEventListener("DOMContentLoaded", () => {
  setupGame();
});
