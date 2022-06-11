const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  amount: Number,
  item: String,
  category: String
});

let Budget = mongoose.model('Budget', repoSchema);

let save = (item, callback) => {
  Budget.find({item: item.item}, (err, arr) => {
    if (arr.length === 0) {
      var newItem = new Budget ({
        amount: Number(item.amount),
        item: item.item,
        category: item.category
      })
      newItem.save();
      callback();
    } else {
      var newNum = (Number(item.amount) + arr[0].amount)
      Budget.deleteOne({item: item.item, category: item.category}, (err, arr) => {
        var newItem = new Budget ({
          amount: newNum,
          item: item.item,
          category: item.category
        })
        newItem.save();
        callback();
      })
    }
  })
}

let get = (cb) => {
  Budget.find({}, function(err, arr) {
    if (arr.length > 0) {
       cb(arr);
    } else {
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

