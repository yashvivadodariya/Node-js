const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/charts', (req, res) => {
    res.render('charts');
});

app.get('/widgets', (req, res) => {
    res.render('widgets');
});

app.get('/grid', (req, res) => {
    res.render('grid');
});

app.get('/tables', (req, res) => {
    res.render('tables');
});

app.get('/form-basic', (req, res) => {
    res.render('form-basic');
});

app.get('/form-wizard', (req, res) => {
    res.render('form-wizard');
});

app.listen(8000, ()=>{
    console.log("Server start on http://localhost:8000");
})