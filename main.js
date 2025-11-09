"use strict"

const canvas = document.getElementById('electricFieldCanvas');
const ctx = canvas.getContext('2d');

class Sphere {
    constructor(id, radius, x, y, color, movingDirectionX, movingDirectionY) {
        this.id = id
        this.radius = radius
        this.x = x
        this.y = y
        this.color = color
        this.movingDirectionX = movingDirectionX
        this.movingDirectionY = movingDirectionY
    }
}

let grid = [[],[]]


// Размер сетки
const gridSize = 15;
let directionX = 1
let modellingSpeed = 500
let maxValue = 100

let firstSphere = new Sphere("firstSphere", 5, 4, 4, "blue")
let secondSphere = new Sphere("secondSphere", 8, 8, 8, "red")



function refreshGrid() {
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

            if (gridX === firstSphere.x && gridY === firstSphere.y) {
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, firstSphere.radius, 0, Math.PI * 2); // Рисуем круг
                ctx.fillStyle = firstSphere.color;           // Цвет заливки
                ctx.fill();
                ctx.closePath();
            } else if (gridX === secondSphere.x && gridY === secondSphere.y) {
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, secondSphere.radius, 0, Math.PI * 2); // Рисуем круг
                ctx.fillStyle = secondSphere.color;           // Цвет заливки
                ctx.fill();
                ctx.closePath();
            } else {
                const color = valueToGrayscaleColor(grid[gridY][gridX])
                ctx.fillStyle = color;
                ctx.fillRect(gridX * cellWidth, gridY * cellHeight, cellWidth, cellHeight);
                //ctx.fillText(grid[gridY][gridX].toString(), canvasX, canvasY)
            }
        }
    }
}

function recalcGrid() {
    refreshGrid()
    grid[firstSphere.x][firstSphere.y] = maxValue

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (((x - firstSphere.x)**2 + (y - firstSphere.y)**2) !== 0) {
                grid[y][x] = Math.round(maxValue / Math.sqrt((x - firstSphere.x)**2 + (y - firstSphere.y)**2))
            }
        }
    }

    grid[secondSphere.x][secondSphere.y] = maxValue
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (((x - secondSphere.x)**2 + (y - secondSphere.y)**2) !== 0) {
                grid[y][x] = grid[y][x] + Math.round(maxValue / Math.sqrt((x - secondSphere.x)**2 + (y - secondSphere.y)**2)) + 0
            }
        }
    }

    console.log(grid)
}

async function startModelling() {
    for (let iteration = 0; iteration < 15; iteration++) {
        await new Promise(resolve => setTimeout(resolve, modellingSpeed));

        calculateMoving(firstSphere)
        calculateMoving(secondSphere)

        recalcGrid()
        drawGrid()
    }
}

function valueToGrayscaleColor(value) {
    const intensity = Math.round((value / 100) * 255); // нормализация диапазона в 0-255
    return `rgb(${intensity},${intensity},${intensity})`;
}

function calculateMoving(sphere) {
    let randomDirectionX = Math.random() < 0.5 ? 1 : -1
    let randomDirectionY = Math.random() < 0.5 ? 1 : -1

    if (sphere.x >= gridSize - 1) randomDirectionX = -1
    if (sphere.x <= 1) randomDirectionX = 1
    if (sphere.y >= gridSize - 1) randomDirectionY = -1
    if (sphere.y <= 1) randomDirectionY = 1

    sphere.x = sphere.x + randomDirectionX
    sphere.y = sphere.y + randomDirectionY
}



startModelling()


