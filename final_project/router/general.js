const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: `${username} registered`});
    } else {
      return res.status(404).json({message: `${username} already exists as a user!`});    
    }
  }
  return res.status(404).json({message: "username and/or password are not provided"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.status(200).json(books);

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.status(200).json(books[isbn]);
 });
  

 // Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const returnbooks = {};

  for (const id in books) {
    
    if (author == books[id]["author"] ) {
      returnbooks[id] = books[id]
    }
  }
  res.status(200).json(returnbooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const returnbooks = {};

  for (const id in books) {
    
    if (title == books[id]["title"] ) {
      returnbooks[id] = books[id]
    }
  }

  res.status(200).json(returnbooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.status(200).json(books[isbn]['reviews']);
});

module.exports.general = public_users;


//Task 10-11-12-13 AXIOS

// TASK 10 Get the book list available in the shop
public_users.get("/async", async (req, res) => {
	try {

    const books = await axios.get("http://localhost:5000")
		res.status(200).json(books.data);
    // res.send(books);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// TASK 11 Get book details based on ISBN
public_users.get("/async/isbn/:isbn", async (req, res) => {
	try {
    const isbn = req.params.isbn;
    const book = await axios.get(`http://localhost:5000/isbn/${isbn}`)
		res.status(200).json(book.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// TASK 12  // Get book details based on author
public_users.get("/async/author/:author", async (req, res) => {
	try {
    const author = req.params.author;
    const books = await axios.get(`http://localhost:5000/author/${author}`)
		res.status(200).json(books.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

// TASK 13  // Get book details based on title
public_users.get("/async/title/:title", async (req, res) => {
	try {
    const title = req.params.title;
    const books = await axios.get(`http://localhost:5000/title/${title}`)
		res.status(200).json(books.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});
