import React from 'react';

const totalFinder = (cat, array) => {
  let total;
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === cat) {
      total = array[i].value;
    }
  }
  return total;
}

const TableView = (props) => (
  <div>
    {
      props.items.map((category, index) => {
        let key = ''
        for (let cat in category) {
          key = cat
        }
        return (
          <div>
            <h2>{key}</h2>
            <table border="1px solid black" >
              <thead>
                <tr>
                  <th><strong>Item</strong></th>
                  <th><strong>Amount</strong></th>
                  <th><strong>Category</strong></th>
                  <th><strong>%/Category</strong></th>
                  <th><strong>%/Total</strong></th>
                </tr>
              </thead>
              {
                category[key].map((item, index) => {
                  return (
                  <tbody>
                    <tr>
                      <td>{item.item}</td>
                      <td>${item.amount}</td>
                      <td>{item.category}</td>
                      <td>{`${Math.floor((item.amount/(totalFinder(item.category, props.categories)))*100)}%`}</td>
                      <td>{`${Math.floor((item.amount/props.total)*100)}%`}</td>
                    </tr>
                  </tbody>
                  )
                })
              }
            </table>
            <br></br>
          </div>
        )
      })
    }
  </div>
)

export default TableView;