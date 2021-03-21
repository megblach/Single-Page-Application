import $ from 'jquery';
import axios from 'axios';

export const roomsDetail = (roomId) => {
    const article = $('<article>Loading...</article>');

    // POBIERAMY POJEDYNCZY POKOJ (WG. JEGO ID) Z SERWERA
    axios
        .get(`http://localhost:3000/rooms/${roomId}`)
        .then(response => response.data)
        .then(room => {
            const {name, beds, guests, price, description} = room;
            // WYTWARZAMY ZAWARTOSC `article`
            article.empty()
                .append($(`<h2>${name}</h2>`))
                .append($(`<p><strong>Beds</strong> ${beds} | <strong>Guests</strong> ${guests}</p>`))
                .append($(`<p><strong>${price.toFixed(2)} zł</strong></p>`))
                .append($(`<p>${description}</p>`)
            );
        });

    return article;
};