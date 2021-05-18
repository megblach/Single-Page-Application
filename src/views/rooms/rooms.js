import $ from 'jquery';
import axios from 'axios';
import {addToShoppingCartWidget} from '../booking/booking';

export const rooms = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Rooms</h2>');
    const section = $(`
        <section>
            Loading...
        </section>
    `);

    // POBIERAMY LISTE POKOI Z SERWERA
    axios
        .get('http://localhost:3000/rooms')
        .then(response => response.data)
        .then(rooms => {
            const articles = rooms.map(room => {
                const {id, name, beds, guests, price} = room;

                const h4 = $(`<h4>${name}</h4>`);

                h4.on('click', event => {
                    event.preventDefault();

                    const navigationEvent = new CustomEvent('navigation', {
                        detail: {
                            view: 'rooms-detail',
                            roomId: id
                        }
                    });

                    document.dispatchEvent(navigationEvent);
                });
                
                const article = $(`
                    <article>
                        <p><strong>Beds</strong> ${beds} | <strong>Guests</strong> ${guests}</p>
                        <p><strong>${price.toFixed(2)} zł</strong></p>
                    </article>
                `);

                article.prepend(h4);// DOCZEPIAMY `h4` SPOWROTEM DO `article`
                article.append(addToShoppingCartWidget(id,'room'));

                return article;
            });
            // DOCZEPIAMY WYTWORZONE ARTYKUŁY DO SEKCJI
            section.empty().append(articles);
        });

    fragment.append(h2, section);

    return fragment;
};