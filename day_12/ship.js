class Ship {
    constructor() {
        this.direction = 90
        this.x = 0
        this.y = 0
        this.wx = 10
        this.wy = 1
    }
    run(instruction) {
        let action = instruction[0]
        let amount = Number(instruction.slice(1))
        switch (action) {
            case 'N':
                this.y += amount
                break
            case 'S':
                this.y -= amount
                break
            case 'E':
                this.x += amount
                break
            case 'W':
                this.x -= amount
                break
            case 'R':
                this.direction += amount
                if (this.direction >= 360) this.direction -= 360
                break
            case 'L':
                this.direction -= amount
                if (this.direction < 0) this.direction += 360
                break
            case 'F':
                if (this.direction == 0) this.y += amount
                if (this.direction == 90) this.x += amount
                if (this.direction == 180) this.y -= amount
                if (this.direction == 270) this.x -= amount
                break

        }
    }
    runWaypoint(instruction) {
        let action = instruction[0]
        let amount = Number(instruction.slice(1))
        switch (action) {
            case 'N':
                this.wy += amount
                break
            case 'S':
                this.wy -= amount
                break
            case 'E':
                this.wx += amount
                break
            case 'W':
                this.wx -= amount
                break
            case 'R':
                for (let i = 0; i < amount / 90; i++) {
                    let temp = this.wy
                    this.wy = -this.wx
                    this.wx = temp
                }
                break
            case 'L':
                for (let i = 0; i < amount / 90; i++) {
                    let temp = this.wy
                    this.wy = this.wx
                    this.wx = -temp
                }
                break
            case 'F':
                this.x += this.wx*amount
                this.y +=this.wy*amount
                break

        }
    }

}
module.exports = Ship