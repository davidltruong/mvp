import React from 'react';

const ItemAdd = (props) => (
    <form form onSubmit={(e) => {
      e.preventDefault();
      props.send();
    }} id="add">
      <div>
        <label>Category</label>
        <input id="category" type="text"></input>
      </div>
      <div>
        <label>Item</label>
        <input id="item" type="text"></input>
      </div>
      <div>
        <label>Amount</label>
        <input id="amount" type="Number" step="0.01"></input>
      </div>
      <div>
        <input id="submit" type="submit" ></input>
      </div>
    </form>
)

export default ItemAdd;