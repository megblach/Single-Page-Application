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

    const homeButton = $('<button type="button">Home</button>');
    homeButton.on('click', callback('home'));
    
    const roomsButton = $('<button type="button">Rooms</button>');
    roomsButton.on('click', callback('rooms'));
    
    nav.append(homeButton, roomsButton);

    fragment.append(nav);

    return fragment;
};
