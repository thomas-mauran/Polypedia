const pool = require("../db");
const queries = require("./queries");
const jwt = require("jsonwebtoken");
const authorQueries = require("../author/queries");
const fs = require("fs");
const pdf2pic = require("pdf2pic");

// Simple function to get a boolean out of a filePath exists 
const fileExistsFunction = async path => !!(await fs.promises.stat(path).catch(e => false));

// Get a book info using his id
const getBookById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const token = req.headers["x-access-token"];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    const userId = decoded.userId;

    // We get the book infos
    const result = await pool.query(queries.getById, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: `no books with the id : ${id}` });
    }
    const data = result.rows[0];

    // We get the list of tag associated
    const tagsResult = await pool.query(queries.getTagsByBookId, [id]);
    data.tags = tagsResult.rows;

    // We get the list of authors
    const authorsResult = await pool.query(queries.getAuthorsByBookId, [id]);
    data.authors = authorsResult.rows;

    // We check if the book is liked by the user
    const isLikedResult = await pool.query(queries.isLiked, [id, userId]);
    data.isLiked = isLikedResult.rows.length > 0 ? true : false;

    // We retrieve the book buffer
    const pdfName = `${data.id}-${data.title}`.toLowerCase().split(" ").join("-");
    const pdfPath = `/files/pdf/${pdfName}`;

    const fileExists = await fileExistsFunction(pdfPath);
    if (fileExists) data.pdfFile = await fs.promises.readFile(pdfPath);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const results = await pool.query(queries.getAll);
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

const search = async (req, res) => {
  try {
    // Get the search term from the request body
    const bookTitle = req.headers["booktitle"];

    // Query the database for books with titles that match the search term
    const result = await pool.query(queries.searchBook, [`${bookTitle}%`]);
    if (result.rows.length < 1) {
      // If no books were found return a 404 response
      return res.status(404).send("No book with this title");
    }

    // Iterate over the book every book to add the image to each
    result.rows.forEach((element) => {
      const imgUrl = `/files/img/${element.id}.1.jpeg`;
      let imageBase64;
      if (fs.existsSync(imgUrl)) {
        // If the image file exists, read it from the file system
        const imageFile = fs.readFileSync(imgUrl);
        // Convert the image file to base64 encoding
        imageBase64 = imageFile.toString("base64");
        // Add the image data to the book data
        element.image = imageBase64;
      } else {
        // If the image file does not exist, set the image field to an empty string
        element.image = "";
      }
    });
    // Return the book data from result.rows
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    // If an error occurs, return a 500 response
    return res.status(500).send({ error: error });
  }
};

const getLikedBooks = async (req, res) => {
  try {
    const userToken = req.params.userToken;

    const decoded = jwt.verify(userToken, process.env.JWT_TOKEN_KEY);
    const userId = decoded.userId;

    // Query the database for books with titles that match the search term
    const result = await pool.query(queries.getLikedBooks, [userId]);
    if (result.rows.length < 1) {
      // If no books were found return a 404 response
      return res.status(404).send("No book with this title");
    }

    // Iterate over the book every book to add the image to each
    result.rows.forEach((element) => {
      const imgUrl = `/files/img/${element.book_id}.1.jpeg`;
      let imageBase64;
      if (fs.existsSync(imgUrl)) {
        // If the image file exists, read it from the file system
        const imageFile = fs.readFileSync(imgUrl);
        // Convert the image file to base64 encoding
        imageBase64 = imageFile.toString("base64");
        // Add the image data to the book data
        element.image = imageBase64;
      } else {
        // If the image file does not exist, set the image field to an empty string
        element.image = "";
      }
    });
    // Return the book data from result.rows
    res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    // If an error occurs, return a 500 response
    return res.status(500).send({ error: error });
  }
};

// Too scared to refactor
const uploadBook = async (req, res) => {
  if (!req.file) {
    return res.status(415).send({ error: "File must be a pdf" });
  }
  try {
    let { title, language, description, pageNumber, file } = req.body;
    let tags = JSON.parse(req.body["tags"]);
    let authors = JSON.parse(req.body["authors"]);

    if (Number.isInteger(authors)) authors = [authors];

    // We try to insert the book
    pool.query(queries.insertBook, [title, description, pageNumber, language], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ error: error });
      } else {
        // We retrieve the new book inserted
        pool.query(queries.getNewlyCreatedBook, [title, description, pageNumber, language], async (error, results) => {
          if (error || results.rows.length === 0) {
            console.log(error);
            return res.status(500).send({ error: error });
          } else {
            const bookId = results.rows[0].id;
            const bookTitle = results.rows[0].title;

            // We loop on each authors bookId and add them to the intertable
            authors.forEach(async (element) => {
              let author_id = element;
              // if it's a string it means we need create it in the author db
              if (typeof element === "string") {
                author_id = await createIfNotExists(element, authorQueries);
              }
              // we did not catch an error by returning false so we can insert in middle table
              if (author_id) updateJoinTable(bookId, author_id, "Author", authorQueries);
            });

            // We loop on each tags bookId and add them to the intertable
            tags.forEach((element) => {
              if (updateJoinTable(bookId, element, "Tag", authorQueries) === false) {
                console.log(error);
                return res.status(404).send({
                  error: `tag id : ${element}, not found in the database`,
                });
              }
            });

            if (req.file) {
              const fileName = `${bookId}-${bookTitle}`.toLocaleLowerCase().split(" ").join("-");
              fs.writeFile(`/files/pdf/${fileName}`, req.file.buffer, (err) => {
                if (err) {
                  return res.status(500).send(err);
                }
              });

              const options = {
                density: 500, // output pixels per inch
                saveFilename: `${bookId}`, // output file name
                savePath: "/files/img", // output directory
                format: "jpeg", // output file format
                width: 1080,
                height: 1600,
              };

              const storeAsImage = pdf2pic.fromPath(`/files/pdf/${fileName}`, options);
              const pageToConvertAsImage = 1;

              try {
                await storeAsImage(pageToConvertAsImage);
              } catch (error) {
                return res.status(500).send(error);
              }
            }
            return res.status(201).send("book uploaded");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

const updateJoinTable = async (bookId, attributeId, secondTable, customQueries) => {
  // We build the query name
  let queryName = `insert${secondTable}Join`;
  try {
    const results = await pool.query(customQueries.getById, [attributeId]);
    await pool.query(queries[queryName], [bookId, attributeId]);
    return true;
  } catch (error) {
    console.log({ error: error });
    return false;
  }
};

// !!! caution for the moment we can only insert 1 attribute need to be refactored
const createIfNotExists = async (attributeName, customQueries) => {
  try {
    // We check if the attributeId exists in his table
    const results = await pool.query(customQueries.getByName, [attributeName]);
    if (results.rows.length === 0) {
      // it does not exists so we insert the attribute
      await pool.query(customQueries.insert, [attributeName]);

      // We then retrieve the id
      const results = await pool.query(customQueries.getByName, [attributeName]);

      return results.rows[0].id;
    }
    // Else the results.rows is not empty meaning it exists with this fullname so we return it's id
    else {
      return results.rows[0].id;
    }
  } catch (error) {
    return false;
  }
};

const likeBook = async (req, res) => {
  const bookId = req.params.id;
  const { userToken } = req.body;

  const decoded = jwt.verify(userToken, process.env.JWT_TOKEN_KEY);
  const userId = decoded.userId;
  try {
    const result = await pool.query(queries.getById, [bookId]);

    if (result.rows.length > 0) {
      const addLikeResult = await pool.query(queries.addLike, [bookId, userId]);
      if (addLikeResult) return res.status(200);
      return res.status(500);
    } else {
      return res.status(404).send("Book Id not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const unlikeBook = async (req, res) => {
  const bookId = req.params.id;
  const { userToken } = req.body;

  const decoded = jwt.verify(userToken, process.env.JWT_TOKEN_KEY);
  const userId = decoded.userId;
  try {
    const result = await pool.query(queries.getById, [bookId]);

    if (result.rows.length > 0) {
      const removeLikeResult = await pool.query(queries.removeLike, [bookId, userId]);
      if (removeLikeResult) return res.status(200);
      return res.status(500);
    } else {
      return res.status(404).send("Book Id not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const deleteFromDb = async (req, res) => {
  try {
    const id = req.params.id;

    const idExist = await pool.query(queries.getById, [id]);
    const title = idExist.rows[0].title;

    if (idExist.rows.length < 1) return res.status(404).send("id not found");

    await pool.query(queries.deleteInterAuthor, [id]);
    await pool.query(queries.deleteInterTag, [id]);
    await pool.query(queries.deleteInterUsers, [id]);

    await pool.query(queries.deleteFromDb, [id]);

    const imgPath = `/files/img/${id}.1.jpeg`;
    const imageExist = await fileExistsFunction(imgPath);
    if (imageExist) await fs.promises.unlink(imgPath);

    const pdfName = `${id}-${title}`.toLowerCase().split(" ").join("-");
    const pdfPath = `/files/pdf/${pdfName}`;

    const pdfExists = await fileExistsFunction(pdfPath);
    if (pdfExists) await fs.promises.unlink(pdfPath);

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

const update = async (req, res) => {
  try {
    if (req.file !== undefined && req.file !== null && req.file.mimetype !== "application/pdf") return res.status(415).send("file must be a pdf");
    let { title, language, description, pageNumber } = req.body;
    let tags = JSON.parse(req.body["tags"]);
    let authors = JSON.parse(req.body["authors"]);

    if (Number.isInteger(authors)) authors = [authors];
    let id = req.params.id;

    // We delete each tag and each author of the book to add the new ones
    await pool.query(queries.deleteInterAuthor, [id]);
    await pool.query(queries.deleteInterTag, [id]);

    // We loop on each authors bookId and add them to the intertable
    authors.forEach(async (element) => {
      let author_id = element;
      // if it's a string it means we need create it in the author db
      if (typeof element === "string") {
        author_id = await createIfNotExists(element, authorQueries);
      }
      // we did not catch an error by returning false so we can insert in middle table
      if (author_id) updateJoinTable(id, author_id, "Author", authorQueries);
      else {
        return res.status(422).send(`${element} must be less than 100 characters`);
      }
    });

    // We loop on each tags bookId and add them to the intertable
    tags.forEach((element) => {
      if (updateJoinTable(id, element, "Tag", authorQueries) === false) {
        console.log(error);
        return res.status(404).send({
          error: `tag id : ${element}, not found in the database`,
        });
      }
    });

    const oldDataRaw = await pool.query(queries.getById, [id]);

    // No book with this id
    if (oldDataRaw.rows.length < 1) return res.status(404).send(`No book with the id ${id} found`);

    const oldData = oldDataRaw.rows[0];

    // The client sent a new pdf so we delete and add the new one
    const pdfName = `${id}-${oldData.title}`.toLowerCase().split(" ").join("-");
    const oldPath = `/files/pdf/${pdfName}`;

    const newName = `${id}-${title}`.toLowerCase().split(" ").join("-");
    const newPath = `/files/pdf/${newName}`;

    if (req.file) {
      // We delete the pdf
      const pdfExists = await fileExistsFunction(oldPath);
      if (pdfExists) await fs.promises.unlink(oldPath);

      // We delete the image
      const imgExists = await fileExistsFunction(`/files/img/${id}.1.jpeg`);
      if (imgExists) await fs.promises.unlink(`/files/img/${id}.1.jpeg`);


      const writed = await fs.promises.writeFile(newPath, req.file.buffer);
      const newFileExists = await fileExistsFunction(newPath);
      if (newFileExists) {
        const options = {
          density: 500, // output pixels per inch
          saveFilename: `${id}`, // output file name
          savePath: "/files/img", // output directory
          format: "jpeg", // output file format
          width: 1080,
          height: 1600,
        };

        const storeAsImage = pdf2pic.fromPath(newPath, options);
        const pageToConvertAsImage = 1;

        await storeAsImage(pageToConvertAsImage);
      }
    } else {
      // We rename the book with the new title if the title changed
      if (oldData.title !== title) {

        await fs.promises.rename(oldPath, newPath);
      }
    }

    await pool.query(queries.update, [id, title, description, pageNumber, language]);

    res.status(204).send({ message: "Book updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

module.exports = {
  getAll,
  uploadBook,
  getBookById,
  likeBook,
  unlikeBook,
  getLikedBooks,
  search,
  deleteFromDb,
  update,
};
