var data = require('fs').readFileSync('input.txt', 'utf8')

data = data.split('\n')
data.pop()

//Part 1
let maxId = data.reduce((max, current) => {
    seatId = decodeBoardingpass(current).seatId
    return seatId > max ? seatId : max
}, 0)
console.log(`Part 1: ${maxId}`);

//Part 2
let seatIds = data.map(i => decodeBoardingpass(i).seatId)
seatIds = seatIds.filter(id => !seatIds.includes(id + 1) && seatIds.includes(id + 2)) //next seat free and not last free seat
console.log(`Part 2: ${seatIds[0] + 1}`) //565

function decodeBoardingpass(str) {
    row = parseInt(str.slice(0, 7).replace(/F/g, 0).replace(/B/g, 1), 2)
    col = parseInt(str.slice(-3).replace(/L/g, 0).replace(/R/g, 1), 2)
    return { row: row, col: col, seatId: row * 8 + col }
}