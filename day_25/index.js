// const cardPublicKey = 5764801
// const doorPublicKey = 17807724

const cardPublicKey = 12092626
const doorPublicKey = 4707356

let cardLoopSize = findLoopSize(cardPublicKey)
let doorLoopSize = findLoopSize(doorPublicKey)
console.log('Card loopsize: ', cardLoopSize)
console.log('Door loopsize: ', doorLoopSize)


console.log('Card encrytion key: ', findEncryptionKey(cardPublicKey, doorLoopSize)); //7253904 too low
console.log('Door encrytion key: ', findEncryptionKey(doorPublicKey, cardLoopSize)); 

function findLoopSize(key) {
    const subjectNumber = 7
    let i = 0
    let foundKey = 1

    while (foundKey != key) {
        i++
        foundKey = foundKey * subjectNumber
        foundKey = foundKey % 20201227
    }
    return i
}

function findEncryptionKey(subjectNumber, loopSize) {
    let key = 1
    for (let i = 0; i < loopSize; i++) {
        key = key * subjectNumber
        key = key % 20201227
    }
    return key
}