import $ from 'jquery';
import { signin } from '../../src/views/signin/signin'

// nasz callback to, tzw. higher-order function
export function callback(view) {
    return function (event) {
        event.preventDefault();

        const navigationEvent = new CustomEvent('navigation', {
            detail: {
                view: view
            }
        });

        document.dispatchEvent(navigationEvent);
    }
}

export const navigation = () => {
    const fragment = $(document.createDocumentFragment());
    const nav = $('<nav></nav>');


    const homeButton = $('<button type="button">Strona główna</button>');

    homeButton.on('click', callback('home'));
    
    const roomsButton = $('<button type="button">Pokoje</button>');
    roomsButton.on('click', callback('rooms'));


    const signInButton = $('<button type="button">Zaloguj</button>');
    signInButton.on('click', callback('signin'));

    const signUpButton = $('<button type="button">Rejestracja</button>');
    signUpButton.on('click', callback('signup'));

    nav.append(homeButton, roomsButton, signInButton, signUpButton);

    const treatmentButton = $('<button type="button">Zabiegi</button>');
    treatmentButton.on('click', callback('treatments'));

    const aboutButton = $('<button type="button">O nas</button>');
    aboutButton.on('click', callback('about'));

    const contactButton = $('<button type="button">Kontakt</button>');
    contactButton.on('click', callback('contact'));
    
    nav.append(homeButton, roomsButton, treatmentButton, aboutButton, contactButton);

    fragment.append(nav);

    return fragment;
};
