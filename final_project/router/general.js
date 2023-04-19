const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


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
  
  res.send(books);// returns proper JSON

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);// returns proper JSON
  // res.send(JSON.stringify(books[isbn],null,4));
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

  res.send(returnbooks);// returns proper JSON
  // res.send(JSON.stringify(returnbooks,null,4));
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

  res.send(returnbooks); // returns proper JSON
  // res.send(JSON.stringify(returnbooks,null,4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]['reviews']); // returns proper JSON
  // res.send(JSON.stringify(books[isbn]['reviews'],null,4));
});

module.exports.general = public_users;
