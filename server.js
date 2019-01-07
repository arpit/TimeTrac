const express = require('express');
var Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use('/', express.static(`${__dirname}/client/build`));

var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project.
  storage: 'data/database.sqlite'
});

sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');

    Track = sequelize.define('track', {
      name:{
        type:Sequelize.STRING
      }
    })


    // define a new table 'users'
    History = sequelize.define('history', {
      week_of: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.JSON
      }
    });
    setup();
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

function setup(){

  Track.sync()
    .then(function(d){
      console.log("synced track", d)
    });

  History.sync()
    .then(function(d){
      console.log("synced history", d)
    });
}

app.post('/api/tracks', (req, res) => {
  Track.create({name:req.body['name']}).then( ()=>{
    res.send({ status:'saved', week_of: req.body['week_of'], data: req.body['data'] });
  } ).catch((err) => {
    res.send({error: err})
  })
})

app.get('/api/tracks', (req, res) => {
  Track.findAll({
    attributes: ['id', 'name']
  }).then(items => {
    res.send({tracks:items})
  })
})

app.post('/api/history', (req, res) => {
  History.create({ week_of: req.body['week_of'], data: req.body['data']}).then( ()=>{
    res.send({ status:'saved', week_of: req.body['week_of'], data: req.body['data'] });
  } ).catch((err) => {
    res.send({error: err})
  })
});

app.get('/api/history', (req, res) => {
  let week_of = req.query.week_of
  console.log("date: ", week_of)
  History.findOne({where:{week_of: week_of}}).then(history => {
    res.send(history)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
