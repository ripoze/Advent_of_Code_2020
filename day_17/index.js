var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n').map(row => row.split(''))

let active = new Set()

//Part 1
data.map((row, y) => {
    row.map((e, x) => {
        if (e == "#") active.add(JSON.stringify([x, y, 0]))
    })
})

for (let i = 0; i < 6; i++) {
    active = updateMap3d(active)
}
console.log('Part 1:', [...active].length); //112

//Part 2
active = new Set()
data.map((row, y) => {
    row.map((e, x) => {
        if (e == "#") active.add(JSON.stringify([x, y, 0, 0]))
    })
})

for (let i = 0; i < 6; i++) {
    active = updateMap4d(active)
}
console.log('Part 2:', [...active].length); //2472



function updateMap3d(active) {
    let newActive = new Set()
    let activeArr = [...active]
    activeArr.map(item => {
        let coords = JSON.parse(item)
        let count = countNeighbors3d(active, coords[0], coords[1], coords[2])
        if (count == 2 || count == 3) {
            newActive.add(JSON.stringify(coords))
        }
        for (let x = coords[0] - 1; x <= coords[0] + 1; x++) {
            for (let y = coords[1] - 1; y <= coords[1] + 1; y++) {
                for (let z = coords[2] - 1; z <= coords[2] + 1; z++) {
                    if (countNeighbors3d(active, x, y, z) == 3) newActive.add(JSON.stringify([x, y, z]))
                }
            }
        }
    })
    return newActive
}

function updateMap4d(active) {
    let newActive = new Set()
    let activeArr = [...active]
    activeArr.map(item => {
        let coords = JSON.parse(item)
        let count = countNeighbors4d(active, coords[0], coords[1], coords[2], coords[3])
        if (count == 2 || count == 3) {
            newActive.add(JSON.stringify(coords))
        }
        for (let x = coords[0] - 1; x <= coords[0] + 1; x++) {
            for (let y = coords[1] - 1; y <= coords[1] + 1; y++) {
                for (let z = coords[2] - 1; z <= coords[2] + 1; z++) {
                    for (let w = coords[3] - 1; w <= coords[3] + 1; w++) {
                        if (countNeighbors4d(active, x, y, z, w) == 3) newActive.add(JSON.stringify([x, y, z, w]))
                    }
                }
            }
        }
    })
    return newActive
}

function countNeighbors3d(data, x, y, z) {
    let activeNeighbors = 0
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let k = z - 1; k <= z + 1; k++) {
                if (data.has(JSON.stringify([i, j, k])) && !(x == i && y == j && z == k)) activeNeighbors++
            }
        }
    }
    return activeNeighbors
}

function countNeighbors4d(data, x, y, z, w) {
    let activeNeighbors = 0
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let k = z - 1; k <= z + 1; k++) {
                for (let l = w - 1; l <= w + 1; l++) {
                    if (data.has(JSON.stringify([i, j, k, l])) && !(x == i && y == j && z == k && w == l)) {
                        activeNeighbors++
                    }
                }
            }
        }
    }
    return activeNeighbors
}