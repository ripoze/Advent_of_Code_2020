var data = require('fs').readFileSync('input.txt', 'utf8')

data = data.split('\n')
data.pop()

let map = data.map(row => row.split(''))

//Part 1
console.log(`Part 1 trees: ${getTreeCount(map, 3, 1)}`) //237

//Part 2
total =
    getTreeCount(map, 1, 1) *
    getTreeCount(map, 3, 1) *
    getTreeCount(map, 5, 1) *
    getTreeCount(map, 6, 1) *
    getTreeCount(map, 1, 2)
console.log(`Part 2: ${total}`); //2106818610


function getTreeCount(map, dx, dy) {
    let y = 0
    let x = 0
    let trees = 0

    while (y < map.length) {
        x += dx
        y += dy
        trees += map[y] && map[y][x % map[0].length] == '#' ? 1 : 0
    }
    return trees
}
