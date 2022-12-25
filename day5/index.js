const fs = require('fs')

const data = fs.readFileSync('data.txt', 'utf8')
const separatedData = data.split('\n')

const constructMatrix = () => {
    let count = 0
    const matrix = [[], [], [], [], [], [], [], [], []]

    for (let j = 1; j < separatedData[0].length; j = j + 4) {
        for (let i = 7; i >= 0; i--) {
            if (separatedData[i][j].trim() !== '') {
                matrix[count].push(separatedData[i][j])
            }
        }
        count++
    }

    return matrix
}

const constructResult = (matrix) => {
    let result = ''

    matrix.forEach(crate => {
        result = result + crate[crate.length - 1]
    })

    return result
}

const part1 = () => {
    const matrix = constructMatrix()


    separatedData.slice(10).forEach((command) => {
        let splitted = command.split(' ')
        let howMany = splitted[1]
        let from = splitted[3] - 1
        let to = splitted[5] - 1

        for (let i = 0; i < parseInt(howMany); i++) {
            let transf = matrix[from][matrix[from].length - 1]
            matrix[from][matrix[from].length - 1] = ''
            matrix[from] = matrix[from].filter(Boolean)

            matrix[to][matrix[to].length] = transf
        }
    })

    return constructResult(matrix)
}

const part2 = () => {
    let result = ''

    const matrix = constructMatrix()

    separatedData.slice(10).forEach((command) => {
        let splitted = command.split(' ')
        let howMany = splitted[1]
        let from = splitted[3] - 1
        let to = splitted[5] - 1

        let aux = []

        for (let i = 0; i < parseInt(howMany); i++) {
            aux.push(matrix[from][matrix[from].length - 1])
            matrix[from][matrix[from].length - 1] = ''
            matrix[from] = matrix[from].filter(Boolean)
        }

        for (let i = aux.length - 1; i >= 0; i--) {
            matrix[to][matrix[to].length] = aux[i]
        }

    })

    return constructResult(matrix)
}

console.log(part1())
console.log(part2())