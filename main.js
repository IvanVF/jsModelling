"use strict"

const electricFieldCanvas = document.getElementById('electricFieldCanvas');
const electricFieldCtx = electricFieldCanvas.getContext('2d');

const potentialValueCanvas = document.getElementById('potentialValueCanvas');
const potentialValueCanvasCtx = potentialValueCanvas.getContext('2d');



// Размер сетки

let modellingSpeed = 500

class Main {
    movingHandler = new MovingHandler()
    gridHandler = new GridHandler()
    drawHandler = new DrawHandler()

    sphereArray = [
        new Sphere("sphere1", 5, 4, 4, "red", 50),
        new Sphere("sphere2", 5, 8, 8, "blue", -50),
        new Sphere("sphere3", 5, 1, 12, "red", 50),
        new Sphere("sphere4", 5, 12, 1, "blue", -50),
        new Sphere("sphere4", 5, 10, 6, "blue", -50)
    ]
    grid = [[]]
    gridSize = 15;

    async startModelling() {
        for (let iteration = 0; iteration < 15; iteration++) {
            await new Promise(resolve => setTimeout(resolve, modellingSpeed));

            this.grid = this.gridHandler.recalcGrid(this.gridSize, this.sphereArray)
            this.drawHandler.drawPotentialValue(potentialValueCanvas, potentialValueCanvasCtx, this.grid, this.gridSize)
            this.drawHandler.drawElectricField(electricFieldCanvas, electricFieldCtx, this.grid, this.gridSize, this.sphereArray)
            this.sphereArray.forEach(sphere => this.movingHandler.calculateSphereMoving(sphere, this.grid, this.gridSize))
            this.drawHandler.drawPotentialValue(potentialValueCanvas, potentialValueCanvasCtx, this.grid, this.gridSize)
            this.drawHandler.drawElectricField(electricFieldCanvas, electricFieldCtx, this.grid, this.gridSize, this.sphereArray)
            let a = 0

        }
    }

}

let main = new Main()
main.startModelling()





