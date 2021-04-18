import $ from 'jquery';
import axios from 'axios';

let shoppingCart = [
  { itemId: 2, quantity: 1 },
  { itemId: 4, quantity: 2 },
];

export const shoppingCartView = () => {
  //return "Helloworld";
  const shoppingCartContent = (table,treatments) => {
      const rows= shoppingCart.map((item)=>$(`<tr>
      <td>${treatments.filter(treatment => treatment.id == item.itemId)[0].name}</td>
      <td>${item.quantity}</td>
      <td>0</td>
      <td><button type="button" data-id="${item.itemId}">Usuń produkt</button>
      
    </tr>`))
    table.empty().append(rows)
    table.find('button').on('click',(event)=>{
     // alert($(event.target).data("id"))
      const itemId=$(event.target).data("id")
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