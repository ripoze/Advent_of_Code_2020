var data = require('fs').readFileSync('day_01/input.txt', 'utf8')

data = data.split('\n')
data.pop()
data = data.map((i) => Number(i))

/*Part 1*/
for (i = 0; i < data.length; i++) {
    for (j = i; j < data.length; j++) {
        if (data[i] + data[j] === 2020) console.log(`First:${data[i]}, Second:${data[j]}, Result:${data[i] * data[j]}`);
    }
}

/*Part 2*/
for (i = 0; i < data.length; i++) {
    for (j = i; j < data.length; j++) {
        for (k = j; k < data.length; k++) {
            if (data[i] + data[j] + data[k] === 2020) console.log(`First:${data[i]}, Second:${data[j]}, Third:${data[k]}, Result:${data[i] * data[j] * data[k]}`);
        }
    }
}
