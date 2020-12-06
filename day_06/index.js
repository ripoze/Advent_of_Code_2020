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
    let count=0
    answers = []

    data.map(group => {
        let count = group.split('\n').length
        group = group.replace(/\n/g, '')
        answers.push(
            {
                answers: count,
                uniq: [...new Set(group)],
                all: group.split('')
            })
    })

    answers.map(c => {
        c.uniq.map(a =>{
            if (c.all.filter(v => a===v).length == c.answers) count ++
        })
    })
    return count
}