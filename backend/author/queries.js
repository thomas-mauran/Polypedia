const getByName = "SELECT * FROM authors WHERE fullname = $1;"
const getAllAuthors = "SELECT * FROM authors;"
const insertAuthor = "INSERT INTO authors (fullname) VALUES($1);"
const getById = "SELECT * FROM authors WHERE id = $1;"

module.exports = {
    getAllAuthors,
    insertAuthor,
    getByName,
    getById
}