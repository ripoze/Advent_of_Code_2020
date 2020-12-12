shipClass = require('./ship.js')

var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n')

//Part 1
let ship = new shipClass()
data.map(row=>ship.run(row))
console.log(`Part 1: ${Math.abs(ship.x)+Math.abs(ship.y)}`) // 1106

//Part 2
let ship2 = new shipClass()
data.map(row=>ship2.runWaypoint(row))
console.log(`Part 2: ${Math.abs(ship2.x)+Math.abs(ship2.y)}`) // 107281