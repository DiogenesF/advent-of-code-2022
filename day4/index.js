const fs = require('fs')

const data = fs.readFileSync('data.txt', 'utf8')
const separatedData = data.split('\n')


const part1 = () => {
    let count = 0

    for (let i = 0; i < separatedData.length; i++) {
        let [firstElf, secondElf] = separatedData[i].split(',')
        let [feFirstN, feSecondN] = firstElf.split('-')
        let [seFirstN, seSecondN] = secondElf.split('-')

        if (parseInt(feFirstN) <= parseInt(seFirstN) && parseInt(feSecondN) >= parseInt(seSecondN)) {
            count++
        }
        else if (parseInt(feFirstN) >= parseInt(seFirstN) && parseInt(feSecondN) <= parseInt(seSecondN)) {
            count++
        }
    }

    return count
}

const part2 = () => {
    let count = 0

    for (let i = 0; i < separatedData.length; i++) {
        let [firstElf, secondElf] = separatedData[i].split(',')
        let [feFirstN, feSecondN] = firstElf.split('-')
        let [seFirstN, seSecondN] = secondElf.split('-')

        if (parseInt(feFirstN) < parseInt(seFirstN) && parseInt(feSecondN) < parseInt(seFirstN)) {
            count++
        } else if (parseInt(feFirstN) > parseInt(seSecondN) && parseInt(feSecondN) > parseInt(seSecondN)) {
            count++
        }
    }

    return separatedData.length - count
}

console.log(part1())
console.log(part2())