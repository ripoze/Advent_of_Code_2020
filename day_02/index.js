var data = require('fs').readFileSync('input.txt', 'utf8')

data = data.split('\n')
data.pop()


//Part 1
dataPart1 = data.map(i => {
    let regex = /(\d+)-(\d+) (\w): (\w+)/g
    item = regex.exec(i)
    return isValid_pt1(item[1], item[2], item[3], item[4])
}).filter(i=>i)
console.log(`Part 1: ${dataPart1.length}`);

//Part 2
dataPart2 = data.map(i => {
    let regex = /(\d+)-(\d+) (\w): (\w+)/g
    item = regex.exec(i)
    return isValid_pt2(item[1], item[2], item[3], item[4])
}).filter(i=>i)
console.log(`Part 2: ${dataPart2.length}`);


function isValid_pt1(min, max, char, password) {
    min = Number(min)
    max = Number(max)
    password = password
        .split('')
        .filter(s => s === char)

    return password.length >= min && password.length <= max 
}

function isValid_pt2(index1, index2, char, password){
    let i=0;
    if(password[index1-1] === char) i++
    if(password[index2-1] === char) i++
    return i === 1 
    
}