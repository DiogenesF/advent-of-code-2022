const fs = require('fs')

const data = fs.readFileSync('data.txt', 'utf8')
const separatedData = data.split('\n')

const sumValuesPart1 = () => {
    let maxSum = 0
    let auxSum = 0

    for (let i = 0; i < separatedData.length; i++) {
        if (separatedData[i] === '') {
            if (auxSum > maxSum) {
                maxSum = auxSum
                auxSum = 0
            } else {
                auxSum = 0
            }
        } else {
            auxSum = auxSum + parseInt(separatedData[i])
        }
    }

    return maxSum
}

const sumValuesPart2 = () => {
    let maxSum = [0, 0, 0]
    let auxSum = 0

    for (let i = 0; i < separatedData.length; i++) {
        if (separatedData[i] === '') {
            if (auxSum > maxSum[0]) {
                maxSum[0] = auxSum
                auxSum = 0
            } else if (auxSum > maxSum[1]) {
                maxSum[1] = auxSum
                auxSum = 0
            } else if (auxSum > maxSum[2]) {
                maxSum[2] = auxSum
                auxSum = 0
            } else {
                auxSum = 0
            }
        } else {
            auxSum = auxSum + parseInt(separatedData[i])
        }
    }

    return maxSum[0] + maxSum[1] + maxSum[2]
}

//part 1
// console.log(sumValuesPart1())

//part 2
console.log(sumValuesPart2())