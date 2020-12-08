computer = require('./computer.js')
var data = require('fs').readFileSync('input.txt', 'utf8')

data = data
    .trim()
    .split('\n')
    .map(row => {
        match = row.match(/(\w+)\s(.)(\d+)/)
        return { command: match[1], sign: match[2], amount: Number(match[3]), lastAccValue: null }
    })

//Part 1
comp = new computer(data)
while (!comp.terminated && !comp.data[comp.index].lastAccValue) {
    comp.run()
}
console.log(`Part 1: ${comp.lastAccValue}`) //1915


//Part 2
comp = new computer(data)
while (!comp.terminated) {
    row = comp.data[comp.index]
    if (row.command == 'jmp') { //change jmp to nop
        testComp = new computer(data)
        testComp.data[comp.index].command = 'nop'
    }
    else if (row.command == 'nop' && row.amount != 0) { //change nop to jmp
        testComp = new computer(data)
        testComp.data[comp.index].command = 'jmp'
    }
    if (testComp.isInfiniteLoop() != true) {
        console.log(`Part 2: ${testComp.isInfiniteLoop()}`)
        break;
    }
    comp.run()
}