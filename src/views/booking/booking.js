import $ from "jquery";
import axios from "axios";
import "../../it-spa.scss";
import { cartSummary } from "../treatments/treatments";

import {overYearMessage, notPastMessage, backAfterMessage} from '../rooms/rooms'
let shoppingCart = [
  //{ itemId: 2, itemType: 'treatment', quantity: 1},
  //{ itemId: 4,itemType: 'treatment', quantity: 2},
];



export const addToShoppingCartWidget = (itemId, itemType) => {
  const button = $(
    `<button type="button" class="btn btn-success addbutton" id="liveToastBtn">Do koszyka</button>`
  ).on("click", () => {
    const item = shoppingCart.find(
      (i) => i.itemId == itemId && i.itemType == itemType
    );
    if (item) {
      item.quantity++;
      cartSummary.show();


    } else {
      shoppingCart.push({ itemId, itemType, quantity: 1 });
      cartSummary.show();


    }
  });
  return button;
};

export const addRoomToShoppingCartWidget = (itemId) => {
  const itemType = 'room' 
  const button = $(
    `<button type="button" class="btn btn-success addbutton" id="liveToastBtn">Do koszyka</button>`
  ).on("click", () => {
    const item = shoppingCart.find(
      (i) => i.itemId == itemId && i.itemType == itemType
    );
    if (item) {
      item.quantity++;
      cartSummary.show();


    } else {
      shoppingCart.push({ itemId, itemType, quantity: 1 });
      cartSummary.show();



    }
  });
  
  const dateFrom = $(
    `<input type="date" required/>`
  )

  
  dateFrom.on("change", (event) => {
    const value = new Date(event.target.value)
    console.log(value)
    const currentDate = new Date()
    if (value < currentDate) {
      
      notPastMessage.show();
      overYearMessage.hide();
      backAfterMessage.hide();
      event.target.value=null
    } 
  })
  const dateTo = $(
    `<input type="date" required/>`
  )
  dateTo.on("change", (event) => {
    const value = new Date(event.target.value)
    const fromDate = new Date(dateFrom.val())
    const limitDate = new Date(fromDate.getFullYear()+1, fromDate.getMonth(), fromDate.getDate())
    if (value > limitDate) {
      overYearMessage.show();
      backAfterMessage.hide();
      notPastMessage.hide();
      event.target.value=null

    } else if (value < fromDate) {
      
      backAfterMessage.show();
      overYearMessage.hide();
      notPastMessage.hide();
    } 
  })

  return $(`<form></form>`).append(dateFrom).append(dateTo).append(button)
};

const getItem = ({ itemId, itemType }, treatments, rooms) => {
  if (itemType == "treatment")
    return treatments.filter((treatment) => treatment.id == itemId)[0];
  if (itemType == "room") return rooms.filter((room) => room.id == itemId)[0];
};



export const shoppingCartView = () => {
  const shoppingCartContent = (table, treatments, rooms) => {
    const rows = shoppingCart.map((item) =>
      $(`
      <tr class="cartsinglecontainer" data-id="${item.itemId}" data-type="${
        item.itemType
      }">
        <td class="single-treatment-name">${
          getItem(item, treatments, rooms).name
        }</td>
        <td><input class="numberinput" value="${
          item.quantity
        }" type="number" min="0"></td>
        <td class="numberinput">${
          getItem(item, treatments, rooms).price * item.quantity
        }</td>
        <td><button type="button" class="btn btn-outline-danger bi bi-trash trashbtn"></button></td>
      </tr>
    `)
    );

    const summary = $(`
    <tr>
      <th></th>
      <th>SUMA</th>
      <th>${shoppingCart
        .map((item) => getItem(item, treatments, rooms).price * item.quantity)
        .reduce((acc, value) => acc + value, 0)}</th>
      <th></th>
    </tr>
`);

    table.empty().append(rows).append(summary);
    table.find("input").on("change", (event) => {
      const itemId = $(event.target).parent().parent().data("id");
      const itemType = $(event.target).parent().parent().data("type");
      const item = shoppingCart.find(
        (i) => i.itemId == itemId && i.itemType == itemType
      );
      item.quantity = Math.max(1, parseInt(event.target.value));
      shoppingCartContent(table, treatments, rooms);
      console.log(shoppingCart);
    });
    table.find("button").on("click", (event) => {
      // alert($(event.target).data("id"))
      const itemId = $(event.target).parent().parent().data("id");
      const itemType = $(event.target).parent().parent().data("type");
      shoppingCart = shoppingCart.filter(
        (item) => !(item.itemId == itemId && item.itemType == itemType)
      );
      shoppingCartContent(table, treatments, rooms);
    });
  };

  const table = $('<table class="cartcontainer"></table>');
  Promise.all([
    axios
      .get(`http://localhost:3000/treatments`)
      .then((response) => response.data),
    axios.get(`http://localhost:3000/rooms`).then((response) => response.data),
  ]).then(([treatments, rooms]) => {
    shoppingCartContent(table, treatments, rooms);
  });

  return table;
};
