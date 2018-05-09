const MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('zapatos');

    // Iniciar servidor
    app.listen(5000);
    console.log("Server Connect")
});

/*Esta parte es para cargar las paginas*/
app.get('/', (req, res) => {

    var zapatos = db.collection('zapatos')
        .find();

        zapatos.toArray((err, result) => {
        console.log('Server Connect')
        res.render('index', {
            zapatos: result
        });
    })
});