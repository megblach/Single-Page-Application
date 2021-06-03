import $ from "jquery";
import axios from "axios";
import { addRoomToShoppingCartWidget } from "../booking/booking";
import { cartSummary, hideButton } from '../treatments/treatments'


export const overYearMessage = $(`<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Data pobytu nie może być dłuższa niż rok</div>`);
export const notPastMessage = $(`<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Wybierz datę w przyszłości</div>`);
export const backAfterMessage = $(`<div class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> Wybierz datę powrotu po dacie wyjazdu</div>`);


overYearMessage.hide();
notPastMessage.hide();
backAfterMessage.hide();
cartSummary.hide();

hideButton();

export const rooms = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $("<h2>Dostępne pokoje</h2>");
  const section = $(`
        <section class="rooms-container">
            Loading...
        </section>
    `);

  // POBIERAMY LISTE POKOI Z SERWERA
  axios
    .get("http://localhost:3000/rooms")
    .then((response) => response.data)
    .then((rooms) => {
      const articles = rooms.map((room) => {
        const { id, name, beds, guests, price } = room;

        const h4 = $(`<h4>${name}</h4>`);

        h4.on("click", (event) => {
          event.preventDefault();

          const navigationEvent = new CustomEvent("navigation", {
            detail: {
              view: "rooms-detail",
              roomId: id,
            },
          });

          document.dispatchEvent(navigationEvent);
        });

        const article = $(`
                    <div class="article-room container-fluid">
                    <p><strong>Łóżka</strong> ${beds} | <strong>Goście</strong> ${guests}</p>
                    <article>
                        <p><strong>${price.toFixed(2)} zł / doba</strong></p>
                    </article>
                    </div>
                `);

        article.prepend(h4); // DOCZEPIAMY `h4` SPOWROTEM DO `article`
        article.append(addRoomToShoppingCartWidget(id));
        

        return article;
      });
      // DOCZEPIAMY WYTWORZONE ARTYKUŁY DO SEKCJI
      section.empty().append(articles);
    });

  fragment.append(h2, overYearMessage, notPastMessage, backAfterMessage, cartSummary, section);

  return fragment;
};
