import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ChartView from './ChartView.jsx';
import ItemAdd from './ItemAdd.jsx';
import TableView from './TableView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: [],
      items: [],
      total: 0,
      category: []
    }
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    this.get()
  }

  get() {
    $.get('/getBudget', (data) => {

      // For setting up total amount on monthly spending
      let total = 0;
      for (let h = 0; h < data.length; h++) {
        total += data[h].amount
      }
      this.setState({total: total})

      // For setting up items
      let items = {};
      for (let j = 0; j < data.length; j++) {
        data[j].total = total
        if (items[data[j].category]) {
          items[data[j].category].push(data[j])
        } else {
          items[data[j].category] = [data[j]]
        }
      }
      let itemsArray = []
      for (var cat in items) {
        itemsArray.push({[cat]: items[cat]})
      }
      this.setState({items: itemsArray})

      // For setting up category amounts
      let categories = {};
      for (let i = 0; i < data.length; i++) {
        if (categories[data[i].category]) {
          categories[data[i].category] += data[i].amount;
        } else {
          categories[data[i].category] = data[i].amount;
        }
      }
      let catArray = [];
      for (var key in categories) {
        catArray.push({name: key, value: categories[key]})
      }
      this.setState({category: catArray})
    })
  }

  send() {
    let category = $('#category')[0].value;
    let item = $('#item')[0].value;
    let amount = $('#amount')[0].value;
    $.ajax({
      url: "/",
      method: "POST",
      data:{
        category: category,
        item: item,
        amount: amount
      },
      success:() => {
        setTimeout(this.get(),500);
      },
      error:() => {
        console.log("Error")
      }
    })
  }

  render () {
    return (<div>
      <h1>Monthly Expense Report</h1>
      <ItemAdd send={this.send}/>
      <ChartView categories={this.state.category} total={this.state.total}/>
      <TableView items={this.state.items} total={this.state.total} categories={this.state.category}/>
    </div>)
  }
}

export default App;