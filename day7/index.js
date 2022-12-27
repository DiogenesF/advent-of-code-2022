const fs = require('fs')

const data = fs.readFileSync('data.txt', 'utf8')
const separatedData = data.split('\n')

const calculateFileSize = (dir, result) => {
    if (dir['sum'] < 100000) {
        result = result + dir['sum']
    }
    Object.keys(dir).forEach(value => {
        if (typeof dir[value] === 'object') {
            result = calculateFileSize(dir[value], result)
        }
    })

    return result
}

const calculateSmallestFolderSizeToReachLimit = (dir, unusedSpace, smallest, limit) => {
    if (dir['sum'] + unusedSpace > limit) {
        if (dir['sum'] < smallest) {
            smallest = dir['sum']
        }
    }
    Object.keys(dir).forEach(value => {
        if (typeof dir[value] === 'object') {
            smallest = calculateSmallestFolderSizeToReachLimit(dir[value], unusedSpace, smallest, limit)
        }
    })

    return smallest
}

const constructFileSystem = () => {
    let commandSplittedParsed = ''
    let stackDir = []
    let auxFileSystem = null
    const fileSystem = {}

    separatedData.forEach(command => {
        let commandSplitted = command.split(' ')
        if (commandSplitted[0] === '$') {
            if (commandSplitted[1] === 'cd') {
                commandSplittedParsed = commandSplitted[2].split('\r')[0]
                if (commandSplittedParsed === '/') { //handle rootDir
                    stackDir = [commandSplittedParsed]
                    if (!fileSystem[commandSplittedParsed]) {
                        fileSystem[commandSplittedParsed] = {
                            sum: 0 //key to keep the folder size
                        }
                    }
                } else if (commandSplittedParsed === '..') {
                    stackDir.pop()
                } else {
                    stackDir.push(commandSplittedParsed)
                }
            }
        } else if (commandSplitted[0] === 'dir') {
            commandSplittedParsed = commandSplitted[1].split('\r')[0]
            auxFileSystem = fileSystem //referencing the filesys object in a new var so we don't lose reference with the main var
            stackDir.forEach((dirValue, index) => {
                auxFileSystem = auxFileSystem[dirValue] //moving inside directories till we reach current dir
                if (index === stackDir.length - 1) {
                    auxFileSystem[commandSplittedParsed] = {
                        sum: 0
                    }
                }
            })
        } else {
            commandSplittedParsed = commandSplitted[1].split('\r')[0]
            auxFileSystem = fileSystem
            stackDir.forEach((dirValue, index) => {
                auxFileSystem = auxFileSystem[dirValue]
                auxFileSystem['sum'] = auxFileSystem['sum'] + parseInt(commandSplitted[0]) //keeping file size of dir updated when creating a new file
                if (index === stackDir.length - 1) {
                    auxFileSystem[commandSplittedParsed] = parseInt(commandSplitted[0])
                }
            })
        }
    })

    // part1
    // resultPart1 = calculateFileSize(fileSystem['/'], 0)
    // return resultPart1

    //part2
    let unusedSpace = 70000000 - fileSystem['/']['sum']
    let limit = 30000000
    resultPart2 = calculateSmallestFolderSizeToReachLimit(fileSystem['/'], unusedSpace, limit, limit)
    return resultPart2
}

console.log(constructFileSystem())