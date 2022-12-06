const fs = require('fs')

const data = fs.readFileSync('data.txt', 'utf8')
const separatedData = data.split('\n')

const rockPaperScissorsCalculate = (option_selected) => {
    let my_points = 0
    const [elf_choice, my_choice] = option_selected.split(' ')

    if (my_choice === 'X') {
        my_points = my_points + 1
        if (elf_choice === 'A') {
            my_points = my_points + 3
        }
        else if (elf_choice === 'C') {
            my_points = my_points + 6
        }
    } else if (my_choice === 'Y') {
        my_points = my_points + 2
        if (elf_choice === 'B') {
            my_points = my_points + 3
        } else if (elf_choice === 'A') {
            my_points = my_points + 6
        }
    } else {
        my_points = my_points + 3
        if (elf_choice === 'C') {
            my_points = my_points + 3
        } else if (elf_choice === 'B') {
            my_points = my_points + 6
        }
    }

    return my_points
}

const mainPart2 = () => {
    let result = 0

    for (let i = 0; i < separatedData.length; i++) {
        const [elf_choice, my_choice] = separatedData[i].split(' ')
        if (my_choice === 'X') {
            if (elf_choice === 'A') {
                result = result + rockPaperScissorsCalculate(`${elf_choice} Z`)
            } else if (elf_choice === 'B') {
                result = result + rockPaperScissorsCalculate(`${elf_choice} X`)
            } else {
                result = result + rockPaperScissorsCalculate(`${elf_choice} Y`)
            }
        } else if (my_choice === 'Y') {
            if (elf_choice === 'A') {
                result = result + rockPaperScissorsCalculate(`${elf_choice} X`)
            } else if (elf_choice === 'B') {
                result = result + rockPaperScissorsCalculate(`${elf_choice} Y`)
            } else {
                result = result + rockPaperScissorsCalculate(`${elf_choice} Z`)
            }
        } else {
            if (elf_choice === 'A') {
                result = result + rockPaperScissorsCalculate(`${elf_choice} Y`)
            } else if (elf_choice === 'B') {
                result = result + rockPaperScissorsCalculate(`${elf_choice} Z`)
            } else {
                result = result + rockPaperScissorsCalculate(`${elf_choice} X`)
            }
        }
    }

    return result
}

const main = () => {
    let result = 0

    for (let i = 0; i < separatedData.length; i++) {
        result = result + rockPaperScissorsCalculate(separatedData[i])
    }

    return result
}

//part 1
// console.log(main())

//part 2
console.log(mainPart2())