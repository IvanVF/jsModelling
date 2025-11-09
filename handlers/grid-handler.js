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

    drawGrid(ctx, firstSphere, secondSphere, grid, gridSize) {
        ctx.clearRect(0, 0, electricFieldCanvas.width, electricFieldCanvas.height);
        const cellWidth = electricFieldCanvas.width / grid[0].length
        const cellHeight = electricFieldCanvas.height / grid[0].length

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
                    const color =  this.valueToGrayscaleColor(grid[gridY][gridX].potential)
                    ctx.fillStyle = color;
                    ctx.fillRect(gridX * cellWidth, gridY * cellHeight, cellWidth, cellHeight);
                    //ctx.fillText(grid[gridY][gridX].toString(), canvasX, canvasY)
                }
            }
        }
    }

    valueToGrayscaleColor(value) {
        const intensity = Math.round((value / 100) * 255); // нормализация диапазона в 0-255
        return `rgb(${intensity},${intensity},${intensity})`;
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