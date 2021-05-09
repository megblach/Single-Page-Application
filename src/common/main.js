import $ from 'jquery';
import { home, rooms, roomsDetail, contact, aboutus } from '../views';

// const viewMap = new Map([
//     ['home', home],
//     ['rooms', rooms],
//     ['rooms-detail', roomsDetail]
// ]);

// viewMap.get('home') // -> zwraca fn home
// viewMap.get('xyz123') // -> zwraca undefined

export const main = () => {
    const mainElement = $('<main></main>');
    mainElement.append(home());// NA START POKAZUJEMY CHOCIAZ WIDOK `HOME`

    document.addEventListener('navigation', event => {
        // const { detail } = event; <-- DESTRUKTURYZACJA OBIEKTU
        const detail = event.detail; // NP. { view: 'home' } LUB { view: 'rooms' }

        switch (detail.view) {
            case 'home':
                mainElement.empty().append(home());
                break;

            case 'rooms':
                mainElement.empty().append(rooms());
                break;

            case 'rooms-detail':
                const roomId = detail.roomId;
                mainElement.empty().append(roomsDetail(roomId));
                break;

            case 'contact':
                    mainElement.empty().append(contact(contact));
                    break;

            case 'aboutus':
                        mainElement.empty().append(aboutus(contact));
                        break;

            default:
                const oops = $('<h2>Oops, coś poszło nie tak!</h2>');
                mainElement.empty().append(oops);
        }
    });

    return mainElement;
};
