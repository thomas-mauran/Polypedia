const getAllBooks = "SELECT * FROM books WHERE LOWER(title) LIKE $1 ORDER BY id desc LIMIT 20";
const getBooksByTagName = "SELECT b.* FROM books b JOIN books_tags bt ON b.id = bt.book_id JOIN tags t ON bt.tag_id = t.id WHERE t.name = $1"
const getNewlyCreatedBook = "SELECT * FROM books WHERE title = $1 AND description = $2 AND number_of_pages = $3 AND language_id = $4 AND id = (SELECT MAX(id) from books)"
const getBookById = "SELECT b.id, b.title, b.description, b.number_of_pages, l.name AS language_name, b.downloads FROM books b JOIN languages l ON b.language_id = l.id WHERE b.id= $1;"
const getTagsByBookId = "SELECT t.id, t.name, t.description FROM books b JOIN books_tags bt ON b.id = bt.book_id JOIN tags t ON bt.tag_id = t.id WHERE b.id = $1"
const getAuthorsByBookId = "SELECT a.id, a.fullname FROM books b JOIN books_authors ba ON b.id = ba.book_id JOIN authors a ON ba.author_id = a.id WHERE b.id = $1"

const insertBook = "INSERT INTO books (title, description, number_of_pages, language_id, downloads) VALUES($1, $2, $3, $4, 0);"
const insertTagJoin = "INSERT INTO books_tags (book_id, tag_id) VALUES($1, $2);"
const insertAuthorJoin = "INSERT INTO books_authors (book_id, author_id) VALUES($1, $2);"

module.exports = {
    getAllBooks,
    getBooksByTagName,
    insertBook,
    getNewlyCreatedBook,
    insertTagJoin,
    insertAuthorJoin,
    getBookById,
    getTagsByBookId,
    getAuthorsByBookId

}