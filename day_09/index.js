var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n').map(i => Number(i))

//Part 1
let pt1_answer = null
for (i = 25; i < data.length; i++) {
    if (!isValid(data[i], data.slice(i - 25, i))) {
        pt1_answer = data[i]
    }
}
console.log(`Part 1 : ${pt1_answer}`);//1504371145

//Part 2
let set=findContiguousSet(pt1_answer, data).sort((a,b)=> a-b)
set = set[0]+set[set.length-1]
console.log(`Part 2 : ${set}`); //183278487

function isValid(num, previousArr) {
    for (let i = 0; i < previousArr.length; i++) {
        for (let j = 0; j < previousArr.length; j++) {
            if (i != j && previousArr[i] + previousArr[j] == num) {
                return true
            }
        }
    }
    return false
}

function findContiguousSet(num, data) {
    for (let i = 0; i < data.length; i++) {
        let sum = data[i];
        let set = []
        let j = i + 1

        while (sum < num) {
            sum += data[j]
            j++
        }
        if (sum == num) {
            for (let k = i; k < j; k++) set.push(data[k])
            return set
        }
    }
    return false
}
