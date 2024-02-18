'use strict'

var gDisplayTable = true

function onInit() {
    gDisplayTable = loadFromStorage(DISPLAY_DB)
    renderBooks()
    setBookPricesStats()
}

function renderBooks() {
    gDisplayTable === true ? renderTable() : renderCards();
}

function renderTable() {
    const elBookList = document.querySelector('tbody')
    const books = getBooks()

    if (!books || books.length === 0) {
        onBooksNotFound(elBookList)
        return
    } else {
        const strHTMLs = books.map(book => `
            <tr>
                <td>${book.title}</td>
                <td class="table-price">${book.price}</td>
                <td class="table-action">
                    <button onclick="onReadBook(event, '${book.id}')">Details</button>
                    <button onclick="onUpdateBookPrice('${book.id}')">Update</button>
                    <button onclick="onRemoveBook(event, '${book.id}')">Remove</button>
                </td>
            </tr>
        `)
        elBookList.innerHTML = strHTMLs.join('') 
    }
}

function renderCards() {
    const books = getBooks()
    const elBookList = document.querySelector('div.content-cards')

    if (!books || books.length === 0) {
        onBooksNotFound(elBookList)
        return
    } else {
        const strHTMLs = books.map(book => `
            <div class="card id="${book.id}">
                <div>
                    <h4 class="card-title">Title: <span>${book.title}</span></h4>
                </div>
                <h4 class="price-header">Price: <span>${book.price}</span></h4>
                <h5 class="action-header">Actions:</h5>
                <h5 class="action-btn">
                    <button onclick="onReadBook(event,'${book.id}')">Read</button>
                    <button onclick="onUpdateBook('${book.id}')">Update</button>
                    <button onclick="onRemoveBook(event, '${book.id}')">Delete</button>
                </h5>
            </div>
        `)
        elBookList.innerHTML = strHTMLs.join('')
        showContent()
    }
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()
    removeBook(bookId)
    renderBooks()
    setBookPricesStats()
    showMessageModal('remove')
}

function onUpdateBookPrice(bookId) {
    const newPrice = +prompt('What is the updated book price?')
    updateBookPrice(bookId, newPrice)
    renderBooks()
    setBookPricesStats()
    showMessageModal('update')
}

function onReadBook(ev, bookId) {
    ev.stopPropagation()
    const book = readBook(bookId)

    // const elSpan = elBookDetails.querySelector('h2 span')
    // const elPre = elBookDetails.querySelector('pre')

    const elBookDetails = getElement('.book-details')
    const elSpan = getElement('.details-title')
    const elPrice = getElement('.details-price')
    const elId = getElement('.details-id')

    // elPre.innerText = JSON.stringify(book, null, 2)
    elSpan.innerText = book.title
    elPrice.innerText = book.price
    elId.innerText = book.id

    renderStars(book.stars)
    elBookDetails.showModal()
    
    // elBookDetails.show()
    // setTimeout(() => {
    //     elBookDetails.close()
    // }, 2000);
}

function onSetFilterByTitle(elSelect) {
    const filterBy = elSelect.value
    setFilterByTitle(filterBy)
    renderBooks()
}

function onAddBook(ev) {
    ev.preventDefault()
    const elInputs = document.querySelectorAll('.new-book input')
    const bookTitle = elInputs[0]
    const bookPrice = elInputs[1]

    if (!bookTitle.value || !bookPrice.value) return

    addBook(bookTitle.value, bookPrice.value)

    bookTitle.value = bookPrice.value = ''
    renderBooks()
    showMessageModal('add')
    setBookPricesStats()
}

function onChangeDisplay() {
    gDisplayTable = !gDisplayTable
    
    showContent()

    saveToStorage(DISPLAY_DB, gDisplayTable)
    renderBooks()
}

function setBookPricesStats() {
    const bookPrices = getBookPricesStats()
    getElement('.expensive').innerText= bookPrices.exp
    getElement('.average').innerText= bookPrices.avg
    getElement('.cheap').innerText= bookPrices.cheap
}

function showMessageModal(cmd) {
    var msg
    switch (cmd) {
        case 'add': 
            msg = 'Another stolen book added to the merchandise.'
            break;
        case 'remove':
            msg = "Another book bites the dust."
            break;
        case 'update':
            msg = "Gotta adjust 'em prices for inflation."
            break;
    }      
    
    getElement(".modal-dialog").showModal()
    getElement('.modal-msg').innerText = msg
    setTimeout(() => {
        getElement('.modal-dialog').close()
    }, 2000);
}

function showContent() {
    const elContentTable = getElement('.content-table')
    const elContentCards = getElement('.content-cards')
    
    if (!gDisplayTable) {
        elContentCards.classList.remove('hide')
        elContentTable.classList.add('hide')
    } else {
        elContentCards.classList.add('hide')
        elContentTable.classList.remove('hide')
    }
}

function getElement(elName) {
    return document.querySelector(`${elName}`)
}

function onBooksNotFound(elBookList) {
    var strHTMLs = ''

    if (gBooks.length > 0) {
        strHTMLs += 
        `<tr>
            <td class="oos-msg">No matches found.</td>
        </tr>`
    } else {
        strHTMLs += 
        `<tr>
            <td class="oos-msg">Out of stock. I guess we'll have to steal more books...</td>
        </tr>
        <tr>
            <button onclick="initBooksData()">Steal some books now!</button>
        </tr>` 
    }
     elBookList.innerHTML = strHTMLs
}

function onAddStar(bookId) {
    const book = readBook(bookId)
    console.log('id is',book.id)
    console.log('title is',book.title)
    if (book.stars >= 5) return
    book.stars++
    console.log('stars are',book.stars)
    renderStars(book.stars)
    _saveBooks()
}

function onRemoveStar(bookId) {
    const book = readBook(bookId)
    if (book.stars <= 0) return
    book.stars--
    renderStars(book.stars)
    _saveBooks()
}

function renderStars(stars) {
    const elStarsSpan = document.querySelector('.stars')
    if (stars === 0) {
        elStarsSpan.textContent = "None."
    } else {
        var starsArr = []
        for (var i = 0; i < stars; i++) {
            starsArr.push('⭐')
        }
        elStarsSpan.textContent = starsArr.join('')
    }
}












/*
function renderStats() {
    const elTotal = document.querySelector('.total-todos')
    const elActive = document.querySelector('.active-todos')

    elTotal.innerText = getTotalTodos()
    elActive.innerText = getActiveTodos()
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}
*/