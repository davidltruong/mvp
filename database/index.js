const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  amount: Number,
  item: String,
  category: String
});

let Budget = mongoose.model('Budget', repoSchema);

let save = (item) => {
  Budget.find({item: item.item}, (err, arr) => {
    if (arr.length === 0) {
      var newItem = new Budget ({
        amount: item.amount,
        item: item.item,
        category: item.category
      })
      newItem.save();
    } else {
      console.log('duplicate')
    }
  })
}

let get = (cb) => {
  Budget.find({}, function(err, arr) {
    if (arr.length > 0) {
       cb(arr);
    } else {
      console.log('no items in db')
      cb([]);
    }
  })
}

let deleteAll = () => {
  Budget.deleteMany({}, function(err, arr) {
    console.log('delete db')
  });
}


module.exports.save = save;
module.exports.get = get;
module.exports.deleteAll = deleteAll

