
require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.URI;
const client = new MongoClient(uri);

// get all books ...
const getAllBooks = async (request, response) => {
  response.status(200);
  const allBooks = await client
    .db("AuthenticationData")
    .collection("RegisteredUsers")
    .find()
    .toArray();
  response.send(allBooks);
};

const AddNewBook = async (request, response) => {
  if (
    !request.body.bookName ||
    !request.body.author ||
    !request.body.publisher ||
    !request.body.publicationDate
  ) {
    response.status(400);
    response.send({ message: "Some credentials are missing" });
  }

  const allBooks = await client
    .db("AuthenticationData")
    .collection("RegisteredUsers")
    .find()
    .toArray();
  const newID = parseInt(allBooks[allBooks.length - 1]._id) + 1;
  const newBook = {
    _id: newID.toString() || "1",
    bookName: request.body.bookName,
    author: request.body.author,
    publisher: request.body.publisher,
    publicationDate: request.body.publicationDate,
  };

  try {
    await client
      .db("AuthenticationData")
      .collection("RegisteredUsers")
      .insertOne(newBook);
    response.status(200);
    response.send({ message: "New book added successfully" });
  } catch (err) {
    console.log(err);
    response.status(400);
    response.send({ message: "Some error occured" });
  }
};

const updateBook = async (request, response) => {
  // updating in mongodb
  const { _id } = request.body;
  if (_id) {
    // finding if book with specific id exist or not in mongoDb database
    const check = await client
      .db("AuthenticationData")
      .collection("RegisteredUsers")
      .findOne({ _id: _id });

    if (check) {
      await client
        .db("AuthenticationData")
        .collection("RegisteredUsers")
        .findOneAndUpdate({ _id: _id }, { $set: request.body });
      response.status(200);
      response.send({ message: "book updated successfully" });
    } else {
      response.status(400);
      response.send({ message: "No Book Found with given Id" });
    }
  } else{
    response.status(400);
    response.send({message:"ID is required"})
  }
};

const deleteBook = async (request, response) => {
  const { _id } = request.body;
  if (_id) {
    // finding if book with specific id exist or not in mongoDb database
    const check = await client
      .db("AuthenticationData")
      .collection("RegisteredUsers")
      .findOne({ _id: _id });

    if (check) {
      await client
        .db("AuthenticationData")
        .collection("RegisteredUsers")
        .findOneAndDelete({ _id: _id });
      response.status(200);
      response.send({ message: "book deleted successfully" });
    } else {
      response.status(400);
      response.send({ message: "No Book Found with given Id" });
    }
  } else{
    response.status(400);
    response.send({message:"ID is required"})
  }
};

const getBookById = async (request, response) => {
  const {id}  = request.params;
  if(id){
    const book = await client
      .db("AuthenticationData")
      .collection("RegisteredUsers")
      .findOne({_id:id});
    if(book){
      response.status(200);
      response.send(book);
    }else{
      response.status(400);
      response.send({message:"No Book Found with given Id"});
    }
  }
};

module.exports = {
  getAllBooks,
  AddNewBook,
  updateBook,
  deleteBook,
  getBookById,
};
