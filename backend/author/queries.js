const getAuthorByName = "SELECT * FROM authors WHERE fullname = $1;"
const getAllAuthors = "SELECT * FROM authors;"
const insertAuthor = "INSERT INTO public.authors (fullname) VALUES($1);"
module.exports = {
    getAllAuthors,
    insertAuthor,
    getAuthorByName
}