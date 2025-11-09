"use strict"

const electricFieldCanvas = document.getElementById('electricFieldCanvas');
const electricFieldCtx = electricFieldCanvas.getContext('2d');

const potentialValueCanvas = document.getElementById('potentialValueCanvas');
const potentialValueCanvasCtx = potentialValueCanvas.getContext('2d');



// Размер сетки

let modellingSpeed = 500
let maxValue = 100

class Main {
    movingHandler = new MovingHandler()
    gridHandler = new GridHandler()
    drawHandler = new DrawHandler()

    firstSphere = new Sphere("firstSphere", 5, 4, 4, "blue")
    secondSphere = new Sphere("secondSphere", 8, 8, 8, "red")
    grid = [[]]
    gridSize = 15;

    async startModelling() {
        for (let iteration = 0; iteration < 15; iteration++) {
            await new Promise(resolve => setTimeout(resolve, modellingSpeed));

            this.movingHandler.calculateSphereMoving(this.firstSphere, this.gridSize)
            this.movingHandler.calculateSphereMoving(this.secondSphere, this.gridSize)

            this.grid = this.gridHandler.recalcGrid(this.gridSize, this.firstSphere, this.secondSphere)
            this.drawHandler.drawElectricField(electricFieldCanvas, electricFieldCtx, this.firstSphere, this.secondSphere, this.grid, this.gridSize)
            this.drawHandler.drawPotentialValue(potentialValueCanvas, potentialValueCanvasCtx, this.grid, this.gridSize)
        }
    }

}

let main = new Main()
main.startModelling()





