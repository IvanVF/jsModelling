"use strict"

const canvas = document.getElementById('electricFieldCanvas');
const ctx = canvas.getContext('2d');



// Размер сетки

let modellingSpeed = 500
let maxValue = 100

class Main {
    movingHandler = new MovingHandler()
    gridHandler = new GridHandler()

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
            this.gridHandler.drawGrid(ctx, this.firstSphere, this.secondSphere, this.grid, this.gridSize)
        }
    }

}

let main = new Main()
main.startModelling()





