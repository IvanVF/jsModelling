class MovingHandler {
    calculateSphereMoving(sphere, gridSize) {
        let randomDirectionX = Math.random() < 0.5 ? 1 : -1
        let randomDirectionY = Math.random() < 0.5 ? 1 : -1

        if (sphere.x >= gridSize - 1) randomDirectionX = -1
        if (sphere.x <= 1) randomDirectionX = 1
        if (sphere.y >= gridSize - 1) randomDirectionY = -1
        if (sphere.y <= 1) randomDirectionY = 1

        sphere.x = sphere.x + randomDirectionX
        sphere.y = sphere.y + randomDirectionY
    }
}