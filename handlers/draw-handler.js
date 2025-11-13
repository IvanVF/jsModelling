class DrawHandler {
    drawElectricField(electricFieldCanvas, ctx, grid, gridSize, spheres) {
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

                let sphere = spheres.find(sp => sp.x === gridX && sp.y === gridY)

                if (sphere != null) {
                    ctx.beginPath();
                    ctx.arc(canvasX, canvasY, sphere.radius, 0, Math.PI * 2); // Рисуем круг
                    ctx.fillStyle = sphere.color;           // Цвет заливки
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

    drawPotentialValue(potentialValueCanvas, ctx, grid, gridSize) {
        ctx.clearRect(0, 0, potentialValueCanvas.width, potentialValueCanvas.height);
        const cellWidth = potentialValueCanvas.width / grid[0].length
        const cellHeight = potentialValueCanvas.height / grid[0].length

        ctx.font = `${Math.min(cellWidth / 3, cellHeight / 3)}px Arial`
        ctx.textAlign = "center"
        ctx.textBaceline = "middle"

        for (let gridY = 0; gridY < gridSize; gridY++) {
            for (let gridX = 0; gridX < gridSize; gridX++) {
                const canvasX = gridX * cellWidth + cellWidth / 2
                const canvasY = gridY * cellHeight + cellHeight / 2
                ctx.fillStyle = 'black';

                const color = this.valueToGrayscaleColorRevert(grid[gridY][gridX].potential)
                ctx.fillStyle = color;
                //ctx.fillRect(gridX * cellWidth, gridY * cellHeight, cellWidth, cellHeight);
                ctx.fillText(grid[gridY][gridX].potential.toFixed(1), canvasX, canvasY)

            }
        }
    }

    valueToGrayscaleColor(value) {
        const intensity = Math.round((value / 100) * 255); // нормализация диапазона в 0-255
        return `rgb(${intensity},${intensity},${intensity})`;
    }

    valueToGrayscaleColorRevert(value) {
        let intensity = 255 - Math.round((value / 100) * 255); // нормализация диапазона в 0-255
        if (intensity > 200) intensity = 200
        return `rgb(${intensity},${intensity},${intensity})`;
    }
}