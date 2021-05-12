import $ from 'jquery';
import axios from 'axios';

let shoppingCart = [
  { itemId: 2, quantity: 1 },
  { itemId: 4, quantity: 2 },
];

export const shoppingCartView = () => {
  //return "Helloworld";
  const shoppingCartContent = (table,treatments) => {
      const rows= shoppingCart.map((item)=>$(`
      <tr data-id="${item.itemId}">
      <td>${treatments.filter(treatment => treatment.id == item.itemId)[0].name}</td>
      <td><input value="${item.quantity}" type="number" min="0"></td>
      <td>${treatments.filter(treatment => treatment.id == item.itemId)[0].price*item.quantity}</td>
      <td><button type="button">Usuń produkt</button>
      
    </tr>`))
    const summary=$(`
    <tr>
      <th></th>
      <th>SUMA</th>
      <th>${shoppingCart.map((item)=>treatments.filter(treatment => treatment.id == item.itemId)[0].price*item.quantity).reduce((acc, value)=>acc+value, 0)}</th>
      <th></th>
    </tr>
`)
    table.empty().append(rows).append(summary)
    table.find('input').on('change', (event)=>{
      const itemId=$(event.target).parent().parent().data("id")
      const item=shoppingCart.find((i)=>i.itemId==itemId)
      item.quantity=parseInt(event.target.value)
      shoppingCartContent(table,treatments)
      console.log(shoppingCart)

    })
    table.find('button').on('click',(event)=>{
     // alert($(event.target).data("id"))
      const itemId=$(event.target).parent().parent().data("id")
      shoppingCart=shoppingCart.filter((item)=>item.itemId!=itemId)
      shoppingCartContent(table,treatments)
    })
  };

   const table= $('<table></table>')
   axios.get(`http://localhost:3000/treatments`)
   .then(response => response.data)
   .then(treatments => {
    shoppingCartContent(table, treatments)
   })
   
  return table

  

};