const getAllBooks = "SELECT * FROM books ORDER BY id desc LIMIT 10 ";
const getBooksByTagName = "SELECT b.* FROM books b JOIN books_tags bt ON b.id = bt.book_id JOIN tags t ON bt.tag_id = t.id WHERE t.name = $1"
const insertBook = "INSERT INTO books (title, description, number_of_pages, language_id, downloads) VALUES($1, $2, $3, $4, 0);"
const getNewlyCreatedBook = "SELECT * FROM books WHERE title = $1 AND description = $2 AND number_of_pages = $3 AND language_id = $4 AND id = (SELECT MAX(id) from books)"
const insertTagJoin = "INSERT INTO books_tags (book_id, tag_id) VALUES($1, $2);"
const insertAuthorJoin = "INSERT INTO books_authors (book_id, author_id) VALUES($1, $2);"

module.exports = {
    getAllBooks,
    getBooksByTagName,
    insertBook,
    getNewlyCreatedBook,
    insertTagJoin,
    insertAuthorJoin

}