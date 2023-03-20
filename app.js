//Requesting modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');


//EJS, Body Parser and Express modules setup
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


//Empy variable to store posts
let posts = [];


//Home, contact, compose, and posts routes
app.get('/', function(req, res) {
  res.render('home', {
    posts: posts
  });
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.get('/compose', function(req, res) {
  res.render('compose');
});


//Stores and lower-cases the typed URl title
//Checks to see if typed post title exists, and redirects for specific post page
//Passes the specific post's title and content to be loaded in EJS post page
app.get('/posts/:postName', function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content
      });
    }
  });

});


//Creates new object containing title and body of new note
//Redirects to home route already displaying the new note
app.post('/compose', function(req, res) {

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect('/');
});




//Server port.
app.listen(process.env.PORT || 3000, function() {
  console.log("WORKING");
});
