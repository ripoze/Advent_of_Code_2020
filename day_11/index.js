var data = require('fs').readFileSync('input.txt', 'utf8')
data = data.trim().split('\n')
data = data.map(row => row.split(''))

//Part 1
let oldData = ''
let dataPt1 = [...data]
while (JSON.stringify(dataPt1) != oldData) {
    oldData = JSON.stringify(dataPt1)
    dataPt1 = updateSeatsPt1(dataPt1)
}
console.log(`Part 1: ${countOccupied(dataPt1)}`)

//Part 2
oldData = ''
let dataPt2 = [...data]
while (JSON.stringify(dataPt2) != oldData) {
    oldData = JSON.stringify(dataPt2)
    dataPt2 = updateSeatsPt2(dataPt2)
}
console.log(`Part 2: ${countOccupied(dataPt2)}`)

function countAdjacentOccupied(data, row, col) {
    let occupied = 0
    if (data[row][col] != '.') {
        if (row > 0) occupied += data[row - 1][col] == '#' ? 1 : 0
        if (row > 0 && col > 0) occupied += data[row - 1][col - 1] == '#' ? 1 : 0
        if (row > 0 && col < data[0].length - 1) occupied += data[row - 1][col + 1] == '#' ? 1 : 0
        if (col > 0) occupied += data[row][col - 1] == '#' ? 1 : 0
        if (col < data[0].length - 1) occupied += data[row][col + 1] == '#' ? 1 : 0
        if (row < data.length - 1) occupied += data[row + 1][col] == '#' ? 1 : 0
        if (row < data.length - 1 && col > 0) occupied += data[row + 1][col - 1] == '#' ? 1 : 0
        if (row < data.length - 1 && col < data[0].length - 1) occupied += data[row + 1][col + 1] == '#' ? 1 : 0
        return occupied
    }
    return null
}

function countVisibleOccupied(data, row, col) {
    let occupied = 0
    if (data[row][col] != '.') {
        //right
        for (let i = col + 1; i < data[0].length; i++) {
            if (data[row][i] == "L") break
            if (data[row][i] == "#") {
                occupied++
                break
            }
        }
        //left
        for (let i = col - 1; i >= 0; i--) {
            if (data[row][i] == "L") break
            if (data[row][i] == "#") {
                occupied++
                break
            }
        }
        //up
        for (let i = row - 1; i >= 0; i--) {
            if (data[i][col] == "L") break
            if (data[i][col] == "#") {
                occupied++
                break
            }
        }
        //down
        for (let i = row + 1; i < data.length; i++) {
            if (data[i][col] == "L") break
            if (data[i][col] == "#") {
                occupied++
                break
            }
        }
        //right + down
        let i = 1
        while (data[row + i] && data[0][col + i]) {
            if (data[row + i][col + i] == "L") break
            if (data[row + i][col + i] == "#") {
                occupied++
                break
            }
            i++
        }
        //right + up
        i = 1
        while (data[row - i] && data[0][col + i]) {
            if (data[row - i][col + i] == "L") break
            if (data[row - i][col + i] == "#") {
                occupied++
                break
            }
            i++
        }
        //left + down
        i = 1
        while (data[row + i] && data[0][col - i]) {
            if (data[row + i][col - i] == "L") break
            if (data[row + i][col - i] == "#") {
                occupied++
                break
            }
            i++
        }
        //left + up
        i = 1
        while (data[row - i] && data[0][col - i]) {
            if (data[row - i][col - i] == "L") break
            if (data[row - i][col - i] == "#") {
                occupied++
                break
            }
            i++
        }
        return occupied
    }
    return null
}


function updateSeatsPt1(data) {
    copy = [...data].map((row, y) => {
        return row.map((seat, x) => {
            let count = countAdjacentOccupied(data, y, x)
            if (count == 0) return '#'
            if (count >= 4) return 'L'
            return data[y][x]
        })
    })
    return copy
}

function updateSeatsPt2(data) {
    copy = [...data].map((row, y) => {
        return row.map((seat, x) => {
            let count = countVisibleOccupied(data, y, x)
            if (count == 0) return '#'
            if (count >= 5) return 'L'
            return data[y][x]
        })
    })
    return copy
}

function countOccupied(data) {
    let count = 0
    data.map((row, y) => row.map((col, x) => count += data[y][x] == '#' ? 1 : 0))
    return count
}

function printData(data) {
    data.map(row => console.log(row.join('')))
    console.log('');
}