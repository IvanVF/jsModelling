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

    recalcGrid(gridSize, sphereArray) {
        let grid = this.refreshGrid(gridSize)

        sphereArray.forEach(sphere => {
            grid[sphere.y][sphere.x].potential = maxValue

            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    if (((x - sphere.x)**2 + (y - sphere.y)**2) !== 0) {
                        grid[y][x].potential = grid[y][x].potential + Math.round(maxValue / Math.sqrt((x - sphere.x)**2 + (y - sphere.y)**2))
                    }
                }
            }
        })

        return grid
    }
}