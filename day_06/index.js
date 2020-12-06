var data = require('fs').readFileSync('input.txt', 'utf8')

data = data.trim().split('\n\n')


//part1
console.log(`Part 1: ${countAnyoneYes(data)}`) //7283

//Part 2
console.log(`Part 2: ${countEveryoneYes(data)}`) //3520



function countAnyoneYes(data) {
    return data
        .map(c => c.replace(/\n/g, ''))
        .map(c => [...new Set(c)].length)
        .reduce((sum, c) => sum += c, 0)
}

function countEveryoneYes(data) {

    answers = []

    return data
        .map(group => {
            let count = group.split('\n').length
            let uniq = [...new Set(group)]
            let all = group.split('')

            return uniq
                .map(a => {
                    return all.filter(v => a === v).length == count
                })
                .reduce((sum, c) => sum += c, 0)
        })
        .reduce((sum, c) => sum += c, 0)
}