// import dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

//initialize instance of express
const app = express();

//add port for express server to run 
const PORT = process.env.PORT || 3001;

// middleware to tell express to look for html files in the public directory. 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setting up routes
// root '/' will send index.html (static file)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
// '/notes' will send notes.html (static file)
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

// make server listen for incoming HTTP request on specified port, then console log confirmation that the server is running. 
app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}/`))
