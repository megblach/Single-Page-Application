import $ from "jquery";
import { header } from "../../common/header";
import { shoppingCartView } from "../booking/booking";

export const shoppingCart = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $("<h2>Home</h2>");
  const p = $(
    "<p>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna.<p>"
  );

  fragment.append(h2, p, shoppingCartView());

  return fragment;
};
