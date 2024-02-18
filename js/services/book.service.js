'use strict'

const BOOK_DB = 'bookDB'
const DISPLAY_DB = 'displayDB'
var gBooks
var gFilterByTitle
_createBooks()

function getBooks() {
    if (!gFilterByTitle) return gBooks
    const filterText = gFilterByTitle.trim()
    return gBooks.filter(book => book.title.substring(0, gFilterByTitle.length) === filterText)
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)[0]
    console.log(gBooks.slice())
    _saveBooks()
}

function updateBookPrice(bookId, price) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = price
    _saveBooks()
}

function addBook(txt, price) {
    const newBook = _createBook(txt, price)
    gBooks.unshift(newBook)
    _saveBooks()
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function setFilterByTitle(filterBy) {
    gFilterByTitle = filterBy
}

function getBookPricesStats() {
    const bookPrices = { exp: 0, avg: 0, cheap: 0 }
    console.log(bookPrices)
    gBooks.forEach(book => {
        const price = book.price
        console.log(price)
        if (price > 200) bookPrices.exp++
        else if (price >= 80) bookPrices.avg++
        else bookPrices.cheap++
    })
    return bookPrices
}

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks === null || gBooks.length === 0) initBooksData()
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price, 
        imgURL: '',
        stars: 0
    }
}

function _saveBooks() {
    saveToStorage(BOOK_DB, gBooks)
}

function _saveDisplay() {
    saveToStorage(DISPLAY_DB, gDisplayTable)
}











/*
function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveBooks()
}

function getTotalBooks() {
    return gBooks.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}
*/