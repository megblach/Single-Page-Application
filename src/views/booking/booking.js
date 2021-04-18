import $ from 'jquery';
const shoppingCart = [
  { itemId: 7, quantity: 1 },
  { itemId: 8, quantity: 2 },
];

export const shoppingCartView = () => {
  //return "Helloworld";
      return $('<table></table>').append(shoppingCart.map((item)=>$('<tr><td>'+item.itemId+'</td></tr>')))
};