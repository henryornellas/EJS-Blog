//Requesting modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');


//EJS, Body Parser, Express and Mongoose modules setup
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://henry:test2-123@cluster0.pkmpe4c.mongodb.net/blogDB', {useNewUrlParser: true});


//Set postsSchema
const postsSchema = {
  title: String,
  content: String
};
const Post = mongoose.model('post', postsSchema);


//Home, contact, compose, and posts routes
app.get('/', function(req, res) {
  //Finds all posts and renders them in the home route
  Post.find({}).then(function(foundPosts){
    res.render('home', {posts: foundPosts});
  })


});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.get('/compose', function(req, res) {
  res.render('compose');
});


//Checks to see if typed post title exists, and redirects for specific post page
//Passes the specific post's title and content to be loaded in EJS post page
app.get('/posts/:postName', async function(req, res) {

  const foundPost = await Post.findOne({title: req.params.postName});
  if(!foundPost){
    res.render('notfound');
  }else{
    res.render('post', {title: foundPost.title, content: foundPost.content});
  }

});


//Creates new object containing title and body of new note
//Redirects to home route already displaying the new note
app.post('/compose', function(req, res) {

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();
  res.redirect('/');
});




//Server port.
app.listen(3000, function() {
  console.log("WORKING");
});
