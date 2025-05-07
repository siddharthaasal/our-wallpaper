const grid = document.getElementById('grid');
const heartMap = [
    ".....11.11.....",
    "....1111111....",
    "....1111111....",
    ".....11111.....",
    "......111......",
    ".......1......."
];

const totalRows = heartMap.length;
const totalCols = heartMap[0].length;
const cellMap = {};

for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (heartMap[row][col] === '1') {
            cell.classList.add('heart');
            const key = `${row},${col}`;
            cellMap[key] = cell;
        }

        grid.appendChild(cell);
    }
}
const keys = Object.keys(cellMap);
function fillRandom() {
    if (keys.length === 0) return;
    const randomIndex = Math.floor(Math.random() * keys.length);
    const key = keys.splice(randomIndex, 1)[0];
    cellMap[key].classList.add('filled');
}

const interval = setInterval(() => {
    fillRandom();
    if (keys.length === 0) clearInterval(interval);
}, 50);

async function downloadImage(imageSrc, filename) {
    try {
        const image = await fetch(imageSrc);

        if (!image.ok) {
            throw new Error(`Failed to fetch image: ${imageSrc}`);
        }

        const imageBlob = await image.blob();
        const imageURL = URL.createObjectURL(imageBlob);

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Download image failed:", error);
    }
}
