import $ from 'jquery';
import { loggedUserComponent, logOutButton } from '../../navigation/navbar'




const myForm = $(`
<div class="form-group">
<form class="form" id="myForm" autocomplete="off" type="submit">
<input type="email" class="form-control" id="email" placeholder="Adres Email"required></br>
<input type="password" class="form-control" id="password" placeholder="Hasło" required> </br>
<button type="submit" class="btn btn-info">Zaloguj</button>
</form>
</div>
`);

const messages = $(`
<form>
<div id="login-successful" class="alert alert-success" role="alert">Zalogowano</div>
<div id="password-incorrect" class="alert alert-danger" role="alert">Nieprawidłowe hasło</div>
<div id="no-user" class="alert alert-danger" role="alert">Nie znaleziono użytkownika</div>
</form>
`)


const loginMessages = {
    login: {
        successful: messages.find('#login-successful'),
        passwordIncorrect: messages.find('#password-incorrect'),
        noUser: messages.find('#no-user')
    }
}

loginMessages.login.successful.hide();
loginMessages.login.passwordIncorrect.hide();
loginMessages.login.noUser.hide();





export const displayLogin = () => {
    document.getElementById("displayLogin").innerHTML = document.querySelector('#email').value;

}

myForm.find("button").on("click", displayLogin)



export const signin = () => {
    const fragment = $( document.createDocumentFragment() );
    const h2 = $('<h2>Zaloguj Się do konta IT SPA</h2>');
    
myForm.find("button").on("click", (event) => {
    
    event.preventDefault();

        fetch('http://localhost:3000/users')
        .then(function (response){
            return response.json();
        })
        .then(function (obj) {
        let dataBase = JSON.stringify(obj);
        let dataParse = JSON.parse(dataBase);
        let indexEmail = dataParse.findIndex(obj => obj.l === email.value);
        let passIndex = dataParse.findIndex(obj => obj.p === password.value);
        let passValue = dataParse[indexEmail].p;
        let passAuth = (passIndex !== -1);
        let authSync = (passValue === password.value);
        
        

        if((email.value === dataParse[indexEmail].l && authSync === true)) {
            loginMessages.login.successful.show();
            loginMessages.login.passwordIncorrect.hide();
            loginMessages.login.noUser.hide();
            

            h2.hide();
            myForm.hide();
            {
                loggedUserComponent.show()
                logOutButton.show();
            };


        } else if (passAuth === false && authSync === false) {
            loginMessages.login.passwordIncorrect.show();
            loginMessages.login.noUser.hide();

        }  
        
            
        })
        
        .catch(function(error) {
            loginMessages.login.passwordIncorrect.hide();
            loginMessages.login.noUser.show();
        })

});

    fragment.append(h2, myForm, messages)

    return fragment;
};