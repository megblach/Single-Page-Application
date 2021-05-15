
import $ from "jquery";
import {
    home,
    rooms,
    roomsDetail,
    contact,
    aboutus,
    treatment,
    signin,
    signup
} from "../views";


// const viewMap = new Map([
//     ['home', home],
//     ['rooms', rooms],
//     ['rooms-detail', roomsDetail]
// ]);

// viewMap.get('home') // -> zwraca fn home
// viewMap.get('xyz123') // -> zwraca undefined
export const main = () => {
    const mainElement = $("<main></main>");
    mainElement.append(home()); // NA START POKAZUJEMY CHOCIAZ WIDOK `HOME`

    document.addEventListener("navigation", (event) => {
        // const { detail } = event; <-- DESTRUKTURYZACJA OBIEKTU
        const {
            detail: { view, roomId },
        } = event;

        // nie trzeba powtarzac tej samej funkcji za kazdym razem
        const emptiedMain = mainElement.empty();

        switch (view) {
            case "home":
                emptiedMain.append(home());
                break;

            case "rooms":
                emptiedMain.append(rooms());
                break;

            case "rooms-detail":
                emptiedMain.append(roomsDetail(roomId));
                break;

            case "contact":
                emptiedMain.html(contact());
                break;


            case "aboutus":
                emptiedMain.html(aboutus());
                break;

            case "treatment":
                emptiedMain.append(treatment());
                break;
=======
            case 'signin':
                mainElement.empty().append(signin())
                break;

            case 'signup':
                mainElement.empty().append(signup())
                break;
        

            case 'contact':
                    const contactId = deatil.contactId;
                    mainElement.empty().append(contact(contactId));
                    break;



            default:
                const oops = $("<h2>Oops, coś poszło nie tak!</h2>");
                emptiedMain.append(oops);
        }
    });

    return mainElement;
};