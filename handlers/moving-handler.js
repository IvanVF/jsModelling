class MovingHandler {
    calculateSphereMoving(sphere, grid, gridSize) {
        //let randomDirectionX = Math.random() < 0.5 ? 1 : -1
        //let randomDirectionY = Math.random() < 0.5 ? 1 : -1

        const newCoordinates = this.findMaxNeighborCellCoordinates(grid, sphere.x, sphere.y)

        let newX = newCoordinates.maxValueX
        let newY = newCoordinates.maxValueY

        sphere.x = newX
        sphere.y = newY

        //if (sphere.x >= gridSize - 1) randomDirectionX = -1
        //if (sphere.x <= 1) randomDirectionX = 1
        //if (sphere.y >= gridSize - 1) randomDirectionY = -1
        //if (sphere.y <= 1) randomDirectionY = 1

        //sphere.x = sphere.x + randomDirectionX
        //sphere.y = sphere.y + randomDirectionY
    }

    findMaxNeighborCellCoordinates(grid, x0, y0) {
        const directions = [[-1, 0], [-1, -1], [1, -1], [0, -1], [0, 1], [1, 0], [1, 1], [1, -1]];

        const rows = grid.length;
        const cols = grid[0].length;
        let maxValue = Number.MIN_SAFE_INTEGER
        let maxValueX = x0
        let maxValueY = y0

        for (let [dx, dy] of directions) {
            const neighborY = y0 + dy
            const neighborX = x0 + dx

            if (
                neighborY >= 0 &&
                neighborY < rows &&
                neighborX >= 0 &&
                neighborX < cols
            ) {
                if (grid[neighborY][neighborX].potential > maxValue) {
                    maxValue = grid[neighborY][neighborX].potential
                    maxValueX = neighborX
                    maxValueY = neighborY
                }
            }
        }

        return { maxValueX, maxValueY }
    }
}