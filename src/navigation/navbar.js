import $ from "jquery";
import './navbar.css'
// import {logOut, loggedUserComponent} from '../common/header'



// nasz callback to, tzw. higher-order function
export function callback(view) {
    return function (event) {
        event.preventDefault();

        const navigationEvent = new CustomEvent("navigation", {
            detail: {
                view: view,
            },
        });

        document.dispatchEvent(navigationEvent);
    };
}


export const loggedUserComponent = $(`
<form id="logOut" class="loggedComponent">
<p id="displayLogin" class="text-white" class="loginText"></p>
</form>
`);

export const logOutButton = $('<button type="button" id="logOutButton" class="btn btn-danger logOutButton">Wyloguj</button>')




export const navigationbar = () => {
    const fragment = $(document.createDocumentFragment());
    const navbar = $('<nav class="navbar navbar-expand-lg navbar-dark bg-dark component"></nav>');
    const loggedComponent = $('<div class="logComp"></div>')

    
    const brandButton = $('<a class="navbar-brand" href="#">IT SPA</a>')
    brandButton.on("click", callback("home"));

    const aboutButton = $('<a class="nav-link text-light">O nas</a>')
    aboutButton.on("click", callback("aboutus"));

    const homeButton = $('<a class="nav-link text-light">Strona Główna</a>')
    homeButton.on("click", callback("home"));

    const roomsButton = $('<a class="nav-link text-light">Pokoje</a>')
    roomsButton.on("click", callback("rooms"));

    const treatmentsButton = $('<a class="nav-link text-light">Zabiegi</a>')
    treatmentsButton.on("click", callback("treatments"));

    const shoppingCartButton = $('<a class="nav-link text-light">Koszyk</a>')
    shoppingCartButton.on("click", callback("shoppingcart"));

    const contactButton = $('<a class="nav-link text-light">Kontakt</a>');
    contactButton.on("click", callback("contact"));

    const signInButton = $('<a class="nav-link text-light">Logowanie</a>');
    signInButton.on('click', callback('signin'));

    const signUpButton = $('<a class="nav-link text-light">Rejestracja</a>');
    signUpButton.on('click', callback('signup'));

    const logOut = () => {
        loggedUserComponent.hide();
        logOutButton.hide();
        window.location.reload(false);
        
    }
    logOutButton.hide();  
    loggedUserComponent.hide();
    logOutButton.on('click', logOut)


    loggedComponent.append(
        loggedUserComponent,
        logOutButton
        )

    navbar.append(
        brandButton, 
        homeButton, 
        aboutButton, 
        roomsButton, 
        treatmentsButton, 
        shoppingCartButton,
        contactButton,
        signInButton,
        signUpButton,
        loggedComponent
        )

    fragment.append(navbar);

    return fragment;
};