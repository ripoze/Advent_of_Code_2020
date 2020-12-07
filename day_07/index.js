var data = require('fs').readFileSync('input.txt', 'utf8')

data = data.trim().split('\n')

data = data.map(row => {
    color = row.match(/(\w+ \w+) bags contain (.+)./)[1]
    contents = row.match(/(\w+ \w+) bags contain (.+)./)[2]
        .split(', ')
        .map(row => {
            match = row.trim().match(/(\d+) (\w+ \w+)/)
            return match ? { color: match[2], count: Number(match[1]) } : []
        })
    if (contents[0].length == 0) contents = null

    return { bag: color, contents: contents }
})

//Part 1
console.log(`Part 1: ${data.filter(item => canBagContainColor(data, item.bag, 'shiny gold')).length}`) //112
//Part 2
console.log(`Part 2: ${countParentBags(data, 'shiny gold')}`); //6260

function canBagContainColor(data, bag, targetBag) {
    bag = data.filter(c => c.bag == bag)[0]
    if (!bag.contents) return false //contains no bags
    if (bag.contents.some(item => item.color == targetBag)) return true //contains bag directly
    if (bag.contents.some(content => canBagContainColor(data, content.color, targetBag))) return true
}

function countParentBags(data, targetBag) {
    bag = data.filter(c => c.bag == targetBag)[0]
    if (!bag.contents) return 0
    return bag.contents.reduce((sum, cur) => sum += cur.count * (1 + countParentBags(data, cur.color)), 0)
}