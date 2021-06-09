import $ from 'jquery';
import axios from 'axios';
import {addToShoppingCartWidget} from '../booking/booking';


export const cartSummary = $(`

<div class="alert alert-success fade show" id="summary" role="alert">
<i class="bi bi-cart-check"/> 
Dodano do koszyka! <strong>Zamknij</strong>
</div>`)

cartSummary.on('click', () => {
    cartSummary.hide();
})

export const treatments = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Zabiegi w IT SPA</h2>');


    const section = $(`
        <section class="treatments-container">
            Loading...
        </section>
    `);

    // POBIERAMY LISTE POKOI Z SERWERA
    axios
        .get('http://localhost:3000/treatments')
        .then(response => response.data)
        .then(treatments => {
            const articles = treatments.map(treatment => {
                const {id, name, area, time, price} = treatment;

                const h4 = $(`<h4 class="treatment-name">${name}</h4>`);

                h4.on('click', event => {
                    event.preventDefault();

                    const navigationEvent = new CustomEvent('navigation', {
                        detail: {
                            view: 'treatment-detail',
                            treatmentId: id
                        }
                    });

                    document.dispatchEvent(navigationEvent);
                });
                
                const article = $(`
                    <article class="article-treatment container-fluid">
                        <p><strong>Część Ciała</strong> ${area} <br/> <strong>Czas Trwania</strong> ${time}</p>
                        <p><strong>${price.toFixed(2)} zł</strong></p>
                    </article>
                `);

                article.prepend(h4);// DOCZEPIAMY `h4` SPOWROTEM DO `article`
                article.append(addToShoppingCartWidget(id,'treatment'));

                return article;
            });
            // DOCZEPIAMY WYTWORZONE ARTYKUŁY DO SEKCJI
            section.empty().append(articles);
        });

    fragment.append(h2, cartSummary, section);

    return fragment;
};