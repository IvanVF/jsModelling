class GridHandler {

    refreshGrid(gridSize) {
        let matrix = []
        for (let y = 0; y < gridSize; y++) {
            matrix.push([])
            for (let x = 0; x < gridSize; x++) {
                matrix[y][x] = new GridCell(null, x, y, 0)
            }
        }

        return matrix
    }

    recalcGrid(gridSize, firstSphere, secondSphere) {
        let grid = this.refreshGrid(gridSize)
        grid[firstSphere.y][firstSphere.x].potential = maxValue

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (((x - firstSphere.x)**2 + (y - firstSphere.y)**2) !== 0) {
                    grid[y][x].potential = Math.round(maxValue / Math.sqrt((x - firstSphere.x)**2 + (y - firstSphere.y)**2))
                }
            }
        }

        grid[secondSphere.y][secondSphere.x].potential = maxValue
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (((x - secondSphere.x)**2 + (y - secondSphere.y)**2) !== 0) {
                    grid[y][x].potential = grid[y][x].potential + Math.round(maxValue / Math.sqrt((x - secondSphere.x)**2 + (y - secondSphere.y)**2)) + 0
                }
            }
        }

        return grid
    }
}