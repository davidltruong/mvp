const express = require('express')
const app = express()
const port = 3000
const db = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/getBudget', (req, res) => {
  db.get((data) => {
    res.send(data);
  })
})

app.post('/', (req, res) => {
  let category = req.body.category;
  let item = req.body.item;
  let amount = req.body.amount;
  let budgetObj = {
    category: category,
    item: item,
    amount: amount
  }
  db.save(budgetObj)
})

app.get('/delete', (req,res) => {
  db.deleteAll();
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})