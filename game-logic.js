// base debug
// const matrix = [
//     [1,  2,  3,  4,  5],
//     [6,  7,  8,  9,  10],
//     [11, 12, 13, 14, 15],
//     [16, 17, 18, 19, 20],
//     [21, 22, 23, 24, 25]
// ]
const matrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
]

// `var E` é a posição da minha jogada

// INDICES!!!
const E = {
    row: 2,
    col: 2
}
console.log(`FROM INDEX col: ${E.col}, row: ${E.row}`)

function assertCombinationLine(el) {
  return !!el && el === 1
}

// retorna os elementos a direita (E fica no primeiro parâmetro `start` )
const elementsRight = matrix[E.row].slice(E.col, E.col + 3)
console.log('[RIGHT]', elementsRight)

// retorna os elementos a esquerda (E fica no segundo parâmetro `end`)
const elementsLeft = matrix[E.row].slice(E.col - 2 < 0 ? 0 : E.col - 2, E.col + 1)
console.log('[LEFT]', elementsLeft)

// retorna os elementos acima, o valor de i no laço será a linha de E
const elementsUp = []
for (let i = E.row; i > E.row - 3; i--) {
    const row = matrix[i]
    if (row) {
        elementsUp.push(row[E.col])
    }
}
console.log('[UP]', elementsUp)

// retorna os elementos abaixo, o valor de i no laço será a linha de E aqui --
const elementsDown = []
for (let i = E.row; i < E.row + 3; i++) {
    const row = matrix[i]
    if (row) {
        elementsDown.push(row[E.col])
    }
}
console.log('[DOWN]', elementsDown)

console.log('------------aa')
// retorna os elementos na diagonal superior direita(pqp) subtrair 2 da row e na col da uma adição
const diagonalUpRight = [matrix[E.row][E.col]]
const rowsUpRight = [E.row - 1, E.row - 2]
rowsUpRight.forEach((el, i) => {
    if (el < 0) {
        return
    }
    // E + i + 1
    const curr = matrix[el][E.col + i + 1] // ADICIONAR E
    if (curr) {
        diagonalUpRight.push(curr) 
    }
})
console.log('[UP-RIGHT]', diagonalUpRight)

// retorna os elementos na diagonal superior esquerda(pqp de novo) subtrair 2 da row e na col da uma subtração
const diagonalUpLeft = [matrix[E.row][E.col]]
const rowsUpLeft = [E.row - 1, E.row - 2]
rowsUpLeft.forEach((el, i) => {
    if (el < 0) {
        return
    }
    // E - i + 1
    const curr = matrix[el][E.col - (i + 1)] // SUBTRAI DE E
    if (curr) {
        diagonalUpLeft.push(curr) 
    }
})
console.log('[UP-LEFT]', diagonalUpLeft)

// retorna os elementos na diagonal inferior direita(pqp again) adiciona 2 da row e na col da uma adição
const diagonalDownRight = [matrix[E.row][E.col]]
const rowsDownRight = [E.row + 1, E.row + 2]
rowsDownRight.forEach((el, i) => {
    // E - i + 1
    if (el >= matrix.length) {
        return
    }
    const curr = matrix[el][E.col + (i + 1)] // ADICIONA DE E
    if (curr) {
        diagonalDownRight.push(curr) 
    }
})
console.log('[DOWN-RIGHT]', diagonalDownRight)

// retorna os elementos na diagonal inferior esquerda(pqp fds) adiciona 2 da row e na col da uma subtração
const diagonalDownLeft = [matrix[E.row][E.col]]
const rowsDownLeft = [E.row + 1, E.row + 2]
rowsDownLeft.forEach((el, i) => {
    // E - i + 1
    if (el >= matrix.length) {
        return
    }
    const curr = matrix[el][E.col - (i + 1)] // ADICIONA DE E
    if (curr) {
        diagonalDownLeft.push(curr) 
    }
})
console.log('[DOWN-LEFT]', diagonalDownLeft)

console.log('---------------------- FDS') // fica a dica
// console.log([matrix[E.row][E.col], matrix[E.row + 1][E.col - 1], matrix[E.row + 2]?.[E.col - 2]])

const possibilities = [elementsRight, diagonalDownRight, elementsDown, diagonalDownLeft, elementsLeft, diagonalUpLeft, elementsUp, diagonalUpRight]

console.log(possibilities.find((el, i) => {
    if (el.length < 3) {
        return false
    }
    const assert = el.every(assertCombinationLine)
    return assert
}))