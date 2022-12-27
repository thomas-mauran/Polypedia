const getByName = "SELECT * FROM authors WHERE fullname = $1;"
const getAll = "SELECT * FROM authors ORDER BY fullname asc;"
const insert = "INSERT INTO authors (fullname) VALUES($1);"
const getById = "SELECT * FROM authors WHERE id = $1;"


const deleteFromDb = "DELETE FROM authors WHERE id = $1;"
const deleteInter = "DELETE FROM books_authors WHERE author_id = $1;"

module.exports = {
    getAll,
    insert,
    getByName,
    getById,
    deleteFromDb,
    deleteInter
}