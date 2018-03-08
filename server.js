const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static(`${__dirname}/client/build`));

app.post('/api/work', (req, res) => {
  console.log(req)
  res.send({ key: req.body['key'], val: req.body['value'] });
});

app.get('/api/work', (req, res) => {
  
})

app.listen(port, () => console.log(`Listening on port ${port}`));
