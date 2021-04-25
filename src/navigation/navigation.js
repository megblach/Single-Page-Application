import $ from 'jquery';

// nasz callback to, tzw. higher-order function
function callback(view) {
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

    const homeButton = $('<button type="button">Strona Główna</button>');
    homeButton.on('click', callback('home'));
    
    const roomsButton = $('<button type="button">Pokoje</button>');
    roomsButton.on('click', callback('rooms'));

    const signInButton = $('<button type="button">Zaloguj</button>');
    signInButton.on('click', callback('signin'));

    const signUpButton = $('<button type="button">Rejestracja</button>');
    signUpButton.on('click', callback('signup'));

    nav.append(homeButton, roomsButton, signInButton, signUpButton);

    fragment.append(nav);

    return fragment;
};
