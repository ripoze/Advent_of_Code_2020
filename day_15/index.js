let memory = '0,5,4,1,10,14,7'
memory = memory.split(',')

let saidNumbers = new Map()
let lastNumber = Number(memory[memory.length - 1])
let turn = memory.length

memory.map((num, index) => saidNumbers.set(Number(num), index))

while (turn < 30000000) {
    let newNum = saidNumbers.has(lastNumber) ? turn - 1 - saidNumbers.get(lastNumber) : 0
    saidNumbers.set(lastNumber, turn - 1)
    lastNumber = newNum
    turn++
}
console.log(lastNumber); //9007186

