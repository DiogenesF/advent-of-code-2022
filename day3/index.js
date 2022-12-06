const fs = require('fs')

const data = fs.readFileSync('data.txt', 'utf8')
const separatedData = data.split('\n')

const divideCompartments = (compartment) => {
    const halfSize = compartment.length / 2

    return [compartment.slice(0, halfSize), compartment.slice(halfSize)]
}

const findCommonItem = (compartment) => {
    const [firstHalf, secondHalf] = divideCompartments(compartment)

    for (let i = 0; i < firstHalf.length; i++) {
        for (let j = 0; j < secondHalf.length; j++) {
            if (firstHalf[i] === secondHalf[j]) {
                return firstHalf[i]
            }
        }
    }
}

const findCommonItemInThreeCompartments = (firstC, secondC, thirdC) => {
    const valuesInCommon = []

    for (let i = 0; i < firstC.length; i++) {
        for (let j = 0; j < secondC.length; j++) {
            if (firstC[i] === secondC[j]) {
                valuesInCommon.push(firstC[i])
            }
        }
    }

    for (let i = 0; i < valuesInCommon.length; i++) {
        for (let j = 0; j < thirdC.length; j++) {
            if (valuesInCommon[i] === thirdC[j]) {
                return valuesInCommon[i]
            }
        }
    }

}

const calculateItemValue = (item, result) => {
    let charCode = item.charCodeAt()
    if (charCode < 97) {
        result = result + charCode - 65 + 27
    } else {
        result = result + charCode - 97 + 1
    }

    return result
}

const mainPart2 = () => {
    let result = 0

    for (let i = 0; i < separatedData.length; i++) {
        if (i % 3 !== 0) continue
        let item = findCommonItemInThreeCompartments(separatedData[i], separatedData[i + 1], separatedData[i + 2])
        result = calculateItemValue(item, result)
    }

    return result
}

const main = () => {
    let result = 0

    for (let i = 0; i < separatedData.length; i++) {
        let item = findCommonItem(separatedData[i])
        result = calculateItemValue(item, result)
    }

    return result
}

//part 1
// console.log(main())

//part 2
console.log(mainPart2())