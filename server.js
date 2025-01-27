//http stands for 'Hyper Text Transfer Protocol'

const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); //to use the static files like html, css, js



app.get('/', (req, res) => {
    res.send('Hello From Express1');
    //res.send('<h1>Hello From Express</h1>'); //can be html
    //res.json( { msg: 'Hello From Express' }); //can be json
    //res.send(req.header('host')); //get the header value '5000'
    //res.send(req.header('user-agent')); //get client browser info
    //res.send(req.rawHeaders); //get all headers
});

//use API application to get the info, based on the function like post() or get()
//only one function can be used for one path
app.post('/contact', (req, res) => {
    res.send(req.body); //content of the 'body' can be modified in the Postman
});

app.post('/contact', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }

    //DATABASE STUFF
    res.status(201).send(`Thank you ${req.body.name}`);
});

app.post('/login', (req, res) => {
    if (!req.header('x-auth-token')) { //key
        return res.status(400).send('No Token'); //value
    }

    if (!req.header('x-auth-token') === '123456') {
        return res.status(401).send('Not Authorized');
    }

    res.send('Logged in');
});

//put request
app.put('/post/:id', (req, res) => {

    //DATABASE STUFF
    res.json({
        id: req.params.id,
        title: req.body.title
    });
});

app.delete('/post/:id', (req, res) => {

    //DATABASE STUFF
    res.json({ msg: `Post ${req.params.id} deleted` });
});

app.listen(5000, () => console.log('Server started on 5000'));