var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n')

//Part 1
let currentMask = []
let memory = []

for (let i = 0; i < data.length; i++) {
    if (data[i].slice(0, 4) == 'mask') {
        currentMask = data[i].slice(7).split('')
        continue
    }
    let mem = data[i].match(/mem*/g)
    if (mem) {
        let addr = data[i].match(/mem\[(\d+)]/)[1]
        let value = data[i].match(/mem\[\d+\] = (\d+)/)[1]
        memory[addr] = applyBitmask(currentMask, value).join('')
    }
}
let sum = memory.reduce((sum, row) => sum + parseInt(row, 2), 0)

console.log(`Part 1: ${sum}`); // 17481577045893


//Part 2
memory = []
for (let i = 0; i < data.length; i++) {
    if (data[i].slice(0, 4) == 'mask') {
        currentMask = data[i].slice(7).split('')
        continue
    }
    let mem = data[i].match(/mem*/g)
    if (mem) {
        let addr = data[i].match(/mem\[(\d+)]/)[1]
        let value = data[i].match(/mem\[\d+\] = (\d+)/)[1]
        let addrs = maskToAddresses(currentMask, addr)
        addrs.forEach(addr => memory[addr] = Number(value))
    }
}

sum = Object.keys(memory).reduce((sum, addr) => sum += memory[addr], 0)
console.log(`Part 2: ${sum}`) //4160009892257



function applyBitmask(mask, value) {
    let newValue = Number(value).toString(2).split('')
    while (newValue.length < 36) newValue.unshift(0)
    return newValue.map((bit, index) => mask[index] == 'X' ? bit : mask[index])
}

function maskToAddresses(mask, addr) {
    addr = Number(addr).toString(2).split('')
    while (addr.length < 36) addr.unshift(0)
    res = addr.map((bit, index) => {
        if (mask[index] == 'X') return 'X'
        if (mask[index] == 1) return 1
        return bit
    })
    possibleAddrs = [[...res]]
    let xFound = 1
    while (xFound != 0) {
        xFound = 0
        possibleAddrs.forEach((addr, index) => {
            let x = addr.indexOf('X')
            if (x !== -1) {
                addr[x] = 0
                possibleAddrs.push([...addr])
                addr[x] = 1
                possibleAddrs.push([...addr])
                possibleAddrs.splice(index, 1)
                xFound = 1
            }
        })
    }
    res = possibleAddrs.map(addr => parseInt(addr.join(''), 2))
    return res
}