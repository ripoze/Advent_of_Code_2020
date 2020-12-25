var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n')

let blackTiles = new Set()
let whiteTiles = new Set()

//Part 1
data.map(row => {
    let tile = JSON.stringify(coordinatesFromPath(row))
    if (blackTiles.has(tile)) {
        blackTiles.delete(tile)

        return
    }

    blackTiles.add(tile)
})
console.log(`Part 1: ${[...blackTiles].length}`) //289

//Part 2
for (i = 1; i <= 100; i++) {
    blackTiles = flipTiles(blackTiles)
}
console.log(`Part 2: ${[...blackTiles].length}`) //3551

function coordinatesFromPath(path) {
    let steps = path.match(/se|sw|ne|nw|w|e/g)
    return steps.reduce((res, cur) => {
        switch (cur) {
            case 'se':
                res[0] += 0.5
                res[1]--
                break
            case 'sw':
                res[0] -= 0.5
                res[1]--
                break
            case 'ne':
                res[0] += 0.5
                res[1]++
                break
            case 'nw':
                res[0] -= 0.5
                res[1]++
                break
            case 'e':
                res[0]++
                break
            case 'w':
                res[0]--
                break

        }
        return res
    }, [0, 0])
}

function flipTiles(blackTiles) {
    let black = [...blackTiles].map(e => JSON.parse(e))
    let newBlackTiles = new Set()

    black.map(tile => {
        let count = countAdjacentBlack(tile[0], tile[1], blackTiles)
        if (count != 0 && count <= 2) {
            newBlackTiles.add(JSON.stringify(tile))
        }

        let x = tile[0]
        let y = tile[1]
        if (countAdjacentBlack(x + 1, y, blackTiles) == 2) newBlackTiles.add(JSON.stringify([x + 1, y]))
        if (countAdjacentBlack(x - 1, y, blackTiles) == 2) newBlackTiles.add(JSON.stringify([x - 1, y]))
        if (countAdjacentBlack(x + 0.5, y + 1, blackTiles) == 2) newBlackTiles.add(JSON.stringify([x + 0.5, y + 1]))
        if (countAdjacentBlack(x + 0.5, y - 1, blackTiles) == 2) newBlackTiles.add(JSON.stringify([x + 0.5, y - 1]))
        if (countAdjacentBlack(x - 0.5, y + 1, blackTiles) == 2) newBlackTiles.add(JSON.stringify([x - 0.5, y + 1]))
        if (countAdjacentBlack(x - 0.5, y - 1, blackTiles) == 2) newBlackTiles.add(JSON.stringify([x - 0.5, y - 1]))
    })

    return newBlackTiles
}

function countAdjacentBlack(x, y, blackTiles) {
    let count = 0
    count += blackTiles.has(JSON.stringify([x + 1, y])) ? 1 : 0
    count += blackTiles.has(JSON.stringify([x - 1, y])) ? 1 : 0
    count += blackTiles.has(JSON.stringify([x + 0.5, y + 1])) ? 1 : 0
    count += blackTiles.has(JSON.stringify([x + 0.5, y - 1])) ? 1 : 0
    count += blackTiles.has(JSON.stringify([x - 0.5, y + 1])) ? 1 : 0
    count += blackTiles.has(JSON.stringify([x - 0.5, y - 1])) ? 1 : 0

    return count
}