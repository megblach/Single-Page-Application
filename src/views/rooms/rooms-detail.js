import $ from 'jquery';
import axios from 'axios';
import {callback} from '../../navigation/navbar'



export const roomsDetail = (roomId) => {
    const backButton = $('<button class="btn btn-light btn-sm">Wróć</button>')
    backButton.on("click", callback("rooms"));

    const article = $('<article class="room-center">Loading...</article>');

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
                .append($(`<p>${description}</p>`))
                .append(backButton)

        });


    return article;
};