import $ from 'jquery';
import { header } from '../../common/header';
import image1 from './img1.html';
import image2 from './img2.html';
import image3 from './img3.html';
import image4 from './img4.html';
import './home.css';

export const home = () => {
    const fragment = $( document.createDocumentFragment() );

    const memberPartial = '<div class="member"> \
                <h1>Projekt Spa</h1> \
                <h2>Pokoje</h2> \
                <h1 class="is-hidden">Relaks</h1> \
                <h2 class="is-hidden">Zabiegi Spa</h2> \
            </div>';

    const elements = {
        h2: '<h2>Home 2</h2>',
        section1: `<section class= "hotel">  \
                ${image1} \
                ${image2} \
                ${image3} \
                ${image4} \
                ${memberPartial} \
            </section>`
    };

    for (const element in elements) {
        fragment.append($(elements[element]));
    }

    return fragment;
};