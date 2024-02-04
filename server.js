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


// static files 
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

//api get route for notes in json format 
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', function(err, data) {
        res.json(JSON.parse(data));
    });
});

// post routes 
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {title, text};

        const newNoteString = JSON.stringify(newNote);

        fs.writeFile('./db/db.json', newNoteString, (err) =>
         err ? console.error(err) : console.log('New note has been added')
        );
    };
});


// make server listen for incoming HTTP request on specified port, then console log confirmation that the server is running. 
app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}/`))
