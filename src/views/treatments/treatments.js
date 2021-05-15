import $ from 'jquery';
import axios from 'axios';

export const treatments = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Treatments</h2>');
    const section = $(`
        <section>
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

                const h4 = $(`<h4>${name}</h4>`);

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
                    <article>
                        <p><strong>Area</strong> ${area} | <strong>Time</strong> ${time}</p>
                        <p><strong>${price.toFixed(2)} zł</strong></p>
                    </article>
                `);

                article.prepend(h4);// DOCZEPIAMY `h4` SPOWROTEM DO `article`

                return article;
            });
            // DOCZEPIAMY WYTWORZONE ARTYKUŁY DO SEKCJI
            section.empty().append(articles);
        });

    fragment.append(h2, section);

    return fragment;
};