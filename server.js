// server.js

// BASE SETUP
// ==============================================

const express = require('express');
const app     = express();
const port    =   process.env.PORT || 8080;

// ROUTES
// ==============================================

const router = express.Router(); //get an instance of router

router.use((req, res, next) => {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.param('name', (req, res, next, name) => {
    if(name && typeof(name) === 'string') {
        // once validation is done save the new item in the req
        req.name = name;
        // go to the next thing
        next();
    } else {
        return res.send('name can only be strings');
    }
});

router.get('/', (req, res) => {
    res.send('Welcome to our application');  
});

// about page route (http://localhost:8080/about)
router.get('/about', (req, res) => {
    res.send('Welcome to my about page!'); 
});

// route with parameters (http://localhost:8080/greeting/:name)
router.get('/greeting/:name', (req, res) => {
    res.send('Good day ' + req.params.name + '!');
});

app.route('/login')
    .get(function(req, res) {
        // show the form (GET http://localhost:8080/login)
        res.send('this is the login form');
    })
    .post(function(req, res) {
        // process the form (POST http://localhost:8080/login)
        console.log('processing');
        res.send('processing the login form!');
    });

// Handle 404 error. 
router.use("*", (req, res) => {
  res.status(404).send('404');
});

// apply the routes to our application
app.use('/', router);

// we'll create our routes here

// START THE SERVER
// ==============================================
app.listen(port, ((err) => {
    if(err) return err;
    console.log(`Server started on port ${port}`);
);
