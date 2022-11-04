
const express = require('express');

const fortune = require('./lib/fortune')

const app = express();
const handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');    
const PORT = process.env.PORT || 3090;

static:app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home')
})

app.get('/about', function(req, res){
    res.render('about', {fortune: fortune.getFortune()});
});

app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});


app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500')
});

app.listen(PORT, ()=>{
    console.log('run server')
})
