var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n')

let rules = []
let i = 0
while (data[i].match(/(\w+\s?\w+):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)/)) {
    res = data[i].match(/(\w+\s?\w+):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)/)
    rules.push({ field: res[1], min1: res[2], max1: res[3], min2: res[4], max2: res[5], index: null })
    data[i] = null
    i++
}

i += 2
let myTicket = data[i].split(',').map(e => Number(e))
i += 3
let otherTickets = []
while (i < data.length) {
    otherTickets.push(data[i])
    i++
}

//Part 1
errorRate = otherTickets.reduce((sum, item) => {
    item
        .split(',')
        .map(e => Number(e))
        .forEach(value => {
            sum += isValidValue(value) ? 0 : value
        })
    return sum
}, 0)
console.log(`Part 1: ${errorRate}`); //19240

//Part 2
let validTickets = otherTickets.filter(ticket => {
    let result = true
    ticket
        .split(',')
        .map(e => Number(e))
        .forEach(value => {
            if (!isValidValue(value)) result = false
        })
    return result
}).map(row => {
    return row.split(',').map(e => Number(e))
})
let foundIndexes = new Map()

while (rules.filter(rule => rule.index == null).length > 0) {
    for (let rule = 0; rule < rules.length; rule++) {
        let count = validTickets.reduce((sum, ticket, i) => {
            sum += isRuleValidForIndex(rule, i) ? 1 : 0
            return sum
        }, 0)
        if (count == 1) { //Rule valid only for 1 index
            for (let i = 0; i < validTickets[0].length; i++) {
                if (isRuleValidForIndex(rule, i)) {
                    rules[rule].index = i
                    foundIndexes.set(i, rule)
                }
            }
            console.log(rule, count)
        }
    }
}

console.log(`Part 2: ${myTicket[rules[0].index] * myTicket[rules[1].index] * myTicket[rules[2].index] * myTicket[rules[3].index] * myTicket[rules[4].index] * myTicket[rules[5].index]}`) //21095351239483



function isValidValue(value) {
    let result = false
    rules.map(rule => {
        if ((value >= rule.min1 && value <= rule.max1) || (value >= rule.min2 && value <= rule.max2)) result = true
    })
    return result
}

function isRuleValidForIndex(rule, index) {
    if (!foundIndexes.has(index)) {
        rule = rules[rule]
        let valuesOfIndex = validTickets.map(ticket => ticket[index])
        result = valuesOfIndex.every(value => (value >= rule.min1 && value <= rule.max1) || (value >= rule.min2 && value <= rule.max2))
        return result
    }
    return false
}