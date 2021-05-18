import $ from 'jquery';
import axios from 'axios';

let shoppingCart =  [
  //{ itemId: 2, itemType: 'treatment', quantity: 1},
  //{ itemId: 4,itemType: 'treatment', quantity: 2},
];




export const addToShoppingCartWidget = (itemId, itemType) => {
  const button= $(`<button type="button">Dodaj</button>`)
    .on('click', ()=>{
      const item=shoppingCart.find((i)=>i.itemId==itemId && i.itemType==itemType)
      if  (item)  {
        item.quantity++;
      }
      else  {
        shoppingCart.push({ itemId, itemType, quantity: 1 })
      }
    })
  return button
}

const getItem = ({itemId,itemType}, treatments, rooms ) => {
  if (itemType == 'treatment')
    return treatments.filter(treatment => treatment.id == itemId)[0]
  if (itemType == 'room')
    return rooms.filter(room => room.id == itemId)[0]
}
export const shoppingCartView = () => {
  //return "Helloworld";
  const shoppingCartContent = (table, treatments, rooms) => {
      const rows= shoppingCart.map((item)=>$(`
      <tr data-id="${item.itemId}" data-type="${item.itemType}">
      <td>${getItem(item, treatments, rooms).name}</td>
      <td><input value="${item.quantity}" type="number" min="0"></td>
      <td>${getItem(item, treatments, rooms).price*item.quantity}</td>
      <td><button type="button">Usuń produkt</button>
      
    </tr>`))
    const summary=$(`
    <tr>
      <th></th>
      <th>SUMA</th>
      <th>${shoppingCart.map((item)=>getItem(item, treatments, rooms).price*item.quantity).reduce((acc, value)=>acc+value, 0)}</th>
      <th></th>
    </tr>
`)
    table.empty().append(rows).append(summary)
    table.find('input').on('change', (event)=>{
      const itemId= $(event.target).parent().parent().data("id")
      const itemType= $(event.target).parent().parent().data("type")
      const item=shoppingCart.find((i)=> i.itemId == itemId && i.itemType == itemType)
      item.quantity=Math.max(1,parseInt(event.target.value))
      shoppingCartContent(table,treatments, rooms)
      console.log(shoppingCart)

    })
    table.find('button').on('click',(event)=>{
     // alert($(event.target).data("id"))
      const itemId=$(event.target).parent().parent().data("id")
      const itemType= $(event.target).parent().parent().data("type")
      shoppingCart=shoppingCart.filter((item)=>!(item.itemId == itemId && item.itemType == itemType))
      shoppingCartContent(table,treatments, rooms)
    })
  };

   const table= $('<table></table>')
   Promise.all([
    axios.get(`http://localhost:3000/treatments`).then(response => response.data),
    axios.get(`http://localhost:3000/rooms`).then(response => response.data)
  ]).then(([treatments, rooms]) => {
    shoppingCartContent(table, treatments, rooms)
  })
   
  return table
};