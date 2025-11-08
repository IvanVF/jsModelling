const canvas = document.getElementById('electricFieldCanvas');
const ctx = canvas.getContext('2d');

let grid = [[],[]]


// Размер сетки
const gridSize = 15;

let x0 = 4
let y0 = 4

let directionX = 1

let modellingSpeed = 500

let firstSphere = new Sphere("firstSphere", 10, 4, 4, "blue")

function createCoordinateGrid() {
    let matrix = []
    for (let row = 0; row < gridSize; row++) {
        matrix.push([])
        for (let column = 0; column < gridSize; column++) {
            matrix[row][column] = 0
        }
    }

    grid = matrix
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellWidth = canvas.width / grid[0].length
    const cellHeight = canvas.height / grid[0].length

    ctx.font = `${Math.min(cellWidth / 3, cellHeight / 3)}px Arial`
    ctx.textAlign = "center"
    ctx.textBaceline = "middle"

    for (let gridY = 0; gridY < gridSize; gridY++) {
        for (let gridX = 0; gridX < gridSize; gridX++) {
            const canvasX = gridX * cellWidth + cellWidth / 2
            const canvasY = gridY * cellHeight + cellHeight / 2
            ctx.fillStyle = 'black';

            if (gridX === x0 && gridY === y0) {
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2); // Рисуем круг
                ctx.fillStyle = 'blue';           // Цвет заливки
                ctx.fill();
                ctx.closePath();
            } else {
                ctx.fillStyle = 'black';
                ctx.fillText(grid[gridY][gridX].toString(), canvasX, canvasY)
            }
        }
    }


}

createCoordinateGrid()

function recalcGrid() {

    let maxValue = 100
    grid[x0][y0] = maxValue

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (((x - x0)**2 + (y - y0)**2) !== 0) {
                grid[y][x] = (maxValue / Math.sqrt((x - x0)**2 + (y - y0)**2)).toFixed(1)
            }
        }
    }
}

async function startModelling() {
    for (let iteration = 0; iteration < 15; iteration++) {
        await new Promise(resolve => setTimeout(resolve, modellingSpeed));
        if (y0 >= gridSize) directionX *= -1
        y0 = y0 + (1 * directionX)
        recalcGrid()
        drawGrid()
    }
}



startModelling()

