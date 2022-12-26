const fs = require('fs')

const data = fs.readFileSync('data.txt', 'utf8')

const countMarkerWith = (markerNumber) => {
    let repeatedLetter = false
    let result = 0

    for (let i = 0; i < data.length - markerNumber - 1; i++) {
        repeatedLetter = false
        for (let j = i; j < i + markerNumber; j++) {
            for (let k = j + 1; k < i + markerNumber; k++) {
                if (data[j] === data[k]) {
                    repeatedLetter = true
                    break
                }
            }
            if (repeatedLetter) break
        }
        if (!repeatedLetter) {
            result = i + markerNumber
            break
        }
    }

    return result
}

//part1
console.log(countMarkerWith(4))

//part2
console.log(countMarkerWith(14))