var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n').map(i => Number(i))

data = data.sort((a, b) => a - b)

let differences = []
differences[0] = data[0]
for (let i = 1; i < data.length; i++) {
    differences.push(data[i] - data[i - 1])
}

let ones = differences.filter(i => i == 1).length
let threes = differences.filter(i => i == 3).length + 1

console.log(`Part 1: ${ones} * ${threes} = ${ones * threes}`) //1690


//Part 2
data.unshift(0)
ways = data.map(x => 0)
ways[0] = 1

for (let i = 0; i < ways.length; i++) {
    for (let j = i - 3; j < i; j++) {
        if (data[i] <= data[j] + 3) {
            ways[i] += ways[j];
        }
    }
}
console.log(`Part 2: ${ways[ways.length - 1]}`) //5289227976704
