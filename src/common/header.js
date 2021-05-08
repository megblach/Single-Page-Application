import $ from 'jquery';
import user from './assets/user.png'

const title = 'IT SPA';

const logOut = () => {
    loggedUserComponent.hide();
    window.location.reload(true);
}

export const loggedUserComponent = $(`
<form id="logOut">
<img src=${user} id="logged-in" alt="user" />
<p id="displayLogin" class="text-info"></p>
<button type="button" id="logOutButton" class="btn btn-info">Wyloguj</button>
</form>
`);

const headerComponent = $(`
<header>
<h1>${title}</h1>
</header>
`);


loggedUserComponent.hide();
loggedUserComponent.on('click', logOut)




export const header = () => {
    const headerElement = $('<header></header>');
    headerElement.append(headerComponent, loggedUserComponent);

    return headerElement;
};







