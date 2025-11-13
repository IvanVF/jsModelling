class MovingHandler {
    DIRECTIONS = [[-1, 0], [-1, -1], [1, -1], [0, -1], [0, 1], [1, 0], [1, 1], [-1, 1]];

    calculateSphereMoving(sphere, grid, gridSize) {
        //let randomDirectionX = Math.random() < 0.5 ? 1 : -1
        //let randomDirectionY = Math.random() < 0.5 ? 1 : -1


        let newCoordinates = sphere.potential < 0 ?
            this.findMaxNeighborPotentialCoordinates(grid, sphere) :
            this.findMinNeighborPotentialCoordinates(grid, sphere)

        let newX = newCoordinates.newX
        let newY = newCoordinates.newY

        sphere.x = newX
        sphere.y = newY

        //if (sphere.x >= gridSize - 1) randomDirectionX = -1
        //if (sphere.x <= 1) randomDirectionX = 1
        //if (sphere.y >= gridSize - 1) randomDirectionY = -1
        //if (sphere.y <= 1) randomDirectionY = 1
    }

    findMaxNeighborPotentialCoordinates(grid, sphere) {
        const rows = grid.length;
        const cols = grid[0].length;
        let maxValue = Number.MIN_SAFE_INTEGER
        let maxValueX = sphere.x
        let maxValueY = sphere.y

        for (let [dy, dx] of this.DIRECTIONS) {
            const neighborX = sphere.x + dx
            const neighborY = sphere.y + dy

            if (this.isInGridBorders(neighborX, neighborY, rows, cols)) {
                if (grid[neighborY][neighborX].potential > maxValue) {
                    maxValue = grid[neighborY][neighborX].potential
                    maxValueX = neighborX
                    maxValueY = neighborY
                }
            }
        }

        return { newX: maxValueX, newY: maxValueY }
    }

    findMinNeighborPotentialCoordinates(grid, sphere, x0, y0) {
        const rows = grid.length;
        const cols = grid[0].length;
        let minValue = Number.MAX_SAFE_INTEGER
        let minValueX = sphere.x
        let minValueY = sphere.y

        for (let [dx, dy] of this.DIRECTIONS) {
            const neighborX = sphere.x + dx
            const neighborY = sphere.y + dy

            if (this.isInGridBorders(neighborX, neighborY, rows, cols)) {
                if (grid[neighborY][neighborX].potential < minValue) {
                    minValue = grid[neighborY][neighborX].potential
                    minValueX = neighborX
                    minValueY = neighborY
                }
            }
        }

        return { newX: minValueX, newY: minValueY }
    }

    isInGridBorders(neighborX, neighborY, rows, cols) {
        return neighborY >= 0 &&
            neighborY < rows &&
            neighborX >= 0 &&
            neighborX < cols
    }
}