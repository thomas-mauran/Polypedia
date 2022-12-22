const pool = require("../db");
const queries = require("./queries");

const authorQueries = require("../author/queries");
const fs = require("fs");
const pdf2pic = require("pdf2pic");

// Get a book info using his id
const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  // We get the book infos
  pool.query(queries.getBookById, [id], async (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
    if (results.rows.length === 0)
      res.status(404).json({ message: `no books with the id : ${id}` });
    else {
      const data = results.rows[0];

      // We get the list of tag associated

      pool.query(queries.getTagsByBookId, [id], async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: error });
        } else {
          data.tags = results.rows;

          // We get the list of authors
          pool.query(
            queries.getAuthorsByBookId,
            [id],
            async (error, results) => {
              if (error) {
                console.log(error);
                return res.status(500).send({ error: error });
              } else {
                data.authors = results.rows;

                // We retrieve the book buffer
                const pdfName = `${data.id}-${data.title}`
                  .toLocaleLowerCase()
                  .split(" ")
                  .join("-");
                const pdfPath = `/files/pdf/${pdfName}`;
                fs.access(pdfPath, (err) => {
                  if (err) return res.status(500).send({ error: err });

                  fs.readFile(pdfPath, (err, pdfFileData) => {
                    if (err) return res.status(500).send({ error: err });

                    data.pdfFile = pdfFileData;
                    res.status(200).json(data);
                  });
                });
              }
            }
          );
        }
      });
    }
  });
};

const getAllBooks = (req, res) => {
  pool.query(queries.getAllBooks, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
    for (let i = 0; i < results.rows.length; i++) {
      results.rows.forEach((element) => {
        const imgUrl = `/files/img/${element.id}.1.jpeg`;
        let imageBase64;

        if (fs.existsSync(imgUrl)) {
          const imageFile = fs.readFileSync(imgUrl);
          imageBase64 = imageFile.toString("base64");
          element.image = imageBase64;
        }
        else{
          element.image = ""
        }
      });
      if (i === results.rows.length - 1) res.status(200).send(results.rows);
    }
  });
};

const getBooksByTagName = (req, res) => {
  let { tag } = req.body;
  pool.query(queries.getBooksByTagName, [tag], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }

    res.status(200).json(results.rows);
  });
};

const uploadBook = async (req, res) => {
  console.log({ passed: req.file.mimetype });
  if (req.file === "badFile") {
    console.log("bagzgdiqh dqs ");
    return res.status(415).send({ error: "File must be a pdf" });
  }
  try {
    let { title, language, description, pageNumber, file } = req.body;
    let tags = JSON.parse(req.body["tags"]);
    let authors = JSON.parse(req.body["authors"]);

    if (Number.isInteger(authors)) authors = [authors];

    // We try to insert the book
    pool.query(
      queries.insertBook,
      [title, description, pageNumber, language],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: error });
        } else {
          // We retrieve the new book inserted
          pool.query(
            queries.getNewlyCreatedBook,
            [title, description, pageNumber, language],
            async (error, results) => {
              if (error || results.rows.length === 0) {
                console.log(error);
                return res.status(500).send({ error: error });
              } else {
                const bookId = results.rows[0].id;
                const bookTitle = results.rows[0].title;

                // We loop on each authors bookId and add them to the intertable
                authors.forEach((element) => {
                  if (
                    updateJoinTable(
                      bookId,
                      element,
                      "Author",
                      authorQueries
                    ) === false
                  ) {
                    console.log(error);
                    return res.status(404).send({
                      error: `author id : ${element}, not found in the database`,
                    });
                  }
                });

                // We loop on each tags bookId and add them to the intertable
                tags.forEach((element) => {
                  if (
                    updateJoinTable(bookId, element, "Tag", authorQueries) ===
                    false
                  ) {
                    console.log(error);
                    return res.status(404).send({
                      error: `tag id : ${element}, not found in the database`,
                    });
                  }
                });

                if (req.file) {
                  const fileName = `${bookId}-${bookTitle}`
                    .toLocaleLowerCase()
                    .split(" ")
                    .join("-");
                  fs.writeFile(
                    `/files/pdf/${fileName}`,
                    req.file.buffer,
                    (err) => {
                      if (err) {
                        return res.status(500).send(err);
                      }
                    }
                  );

                  const options = {
                    density: 500, // output pixels per inch
                    saveFilename: `${bookId}`, // output file name
                    savePath: "/files/img", // output directory
                    format: "jpeg", // output file format
                    width: 1080,
                    height: 1600,
                  };

                  const storeAsImage = pdf2pic.fromPath(
                    `/files/pdf/${fileName}`,
                    options
                  );
                  const pageToConvertAsImage = 1;

                  try {
                    await storeAsImage(pageToConvertAsImage);
                  } catch (error) {
                    return res.status(500).send(error);
                  }
                }
                return res.status(201).send("book uploaded");
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
};

const updateJoinTable = (bookId, attributeId, secondTable, customQueries) => {
  let queryName = `insert${secondTable}Join`;
  // We check if the attributeId exists in his table
  pool.query(customQueries.getById, [attributeId], (error) => {
    if (error) {
      console.log({ error: error });
      return false;
    } else {
      // If it exists we make the link between the book and the attribute Id
      pool.query(queries[queryName], [bookId, attributeId], (error) => {
        if (error) return false;
        else {
          return true;
        }
      });
    }
  });
};

module.exports = {
  getAllBooks,
  getBooksByTagName,
  uploadBook,
  getBookById,
};
