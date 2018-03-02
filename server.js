const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const mango = require('mongodb');
const MongoClient = mango.MongoClient;
var db;

app.use(Express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
app.post("/quotes",(req,res)=>{
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })

})
// app.put('/quotes', (req, res) => {
//   db.collection('quotes').
//   findOneAndUpdate({name: 'nasser'},
//     {
//       $set: {
//         name: req.body.name,
//         quote: req.body.quote
//       }
//     },
//     {
//       sort: {_id: -1},
//       upsert: true
//     },
//     (err, result) => {
//       if (err) return res.send(err)
//      res.send(result);
//     })
// })
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: "nasser"}, {
    $set: {
      name: 'nasser',
      quote: req.body.quote
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})
MongoClient.connect('mongodb://nasserfj:23992399Nasser@ds249428.mlab.com:49428/mymangodb', (err, client) => {
  if(err)
   console.log(err);

    db = client.db('mymangodb');
    app.listen(3000, function() {
      console.log('listening on 3000')
    })
    
})
