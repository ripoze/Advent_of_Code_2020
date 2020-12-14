var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n')

let timestamp = data[0]
let buses = updateBuses(data[1], timestamp)

console.log(`Part 1: ${buses[0].id * buses[0].timeToLeave}`);

//Part 2
let result = data[1].split(',').reduce(([timestamp, increase], id, index) => {
    if (id < 'x') {
        while ((timestamp + index) % id) timestamp += increase
        increase *= id
    }
    return [timestamp, increase]
}, [0, 1])[0]
console.log(`Part 2: ${result}`);


function updateBuses(data, timestamp) {
    let buses = data
        .split(',')
        .map((id, index) => {
            return { 'id': Number(id), 'index': index, 'timeToLeave': null }
        })
        .filter(item => !isNaN(item.id))
        .map(item => {
            item.id=item.id
            item.timeToLeave = item.id - (timestamp % item.id)
            if (item.timeToLeave == item.id) item.timeToLeave = 0
            return item
        })
        .sort((a, b) => a.timeToLeave - b.timeToLeave)
    return buses
}

