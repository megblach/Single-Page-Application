import $ from "jquery";
import { shoppingCartView } from "../booking/booking";

export const shoppingCart = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $("<h2>Twój Koszyk</h2>");


  fragment.append(h2, shoppingCartView());

  return fragment;
};
