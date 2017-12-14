// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////
var db = require('./models')

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


////////////////////
//  ROUTES
///////////////////


// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books

app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function(err, booksFromDb){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(booksFromDb);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  // find one book by its id
  var bookId = req.params.id;
  db.Book.findOne({ _id: bookId}, function(err, foundId){
    res.json(foundId);
  });
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
   db.Book.create(req.body, function(err, data){
     res.json(data)
   });
});

// update book
app.put('/api/books/:id', function(req,res){
  var bookId = req.params.id;
  db.Book.findByIdAndUpdate(bookId,{ $set: { title: req.body.title, author: req.body.author}}, function(err, newBook){
    res.json(newBook); 
  });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
   var bookId = req.params.id; 
   db.Book.findByIdAndRemove( {_id: bookId}, function(err, deletedId){
    res.json(deletedId);
   });
  
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
