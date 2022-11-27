const getAllBooks = "SELECT * FROM books";
const getBooksByTagName = "SELECT b.* FROM books b JOIN books_tags bt ON b.id = bt.book_id JOIN tags t ON bt.tag_id = t.id WHERE t.name = $1"
const insertBook = ""
const addBookTag = ""
const addBookAuthor = ""
module.exports = {
    getAllBooks,
    getBooksByTagName
}