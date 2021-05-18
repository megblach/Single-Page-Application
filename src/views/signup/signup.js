import 'regenerator-runtime/runtime';
import $ from 'jquery';


export const signup = () => {


    const fragment = $( document.createDocumentFragment() );

    const h2 = $('<h2>Zarejestruj Się</h2>');


    const registerForm = $(`
    <div class="form-group">
    <div class="regForm">
        <form name="fetch">
            <input type="email" id="email" name="l" class="form-control" placeholder="Email" required> </br>
            <input type="password" id="password" name="p" class="form-control" placeholder="Hasło" required></br>
            <input type="password" id="confirmPassword" class="form-control" placeholder="Powtórz Hasło" required></br>
            <div id="register-completed" class="alert alert-success" role="alert">Dziękujemy za Rejestrację w IT SPA!</div>
            <div id="email-taken" class="alert alert-danger" role="alert">Podany adres Email jest zajęty</div>
            <div id="password-wrong" class="alert alert-danger" role="alert">Hasła muszą być takie same</div>
            <div id="password-validate" class="alert alert-danger" role="alert">Hasło musi mieć minimum 8 znaków</div>



            <button type="submit" class="btn btn-info">Załóż Konto</button>
        </form>
    </div>
    </div>

    `);

    const formMessages = {
        register: {
            completed: registerForm.find('#register-completed'),
            emailTaken: registerForm.find('#email-taken'),
            passwordWrong: registerForm.find('#password-wrong'),
            passwordValidate: registerForm.find('#password-validate')


        }
    }

    formMessages.register.completed.hide();
    formMessages.register.emailTaken.hide();
    formMessages.register.passwordWrong.hide();
    formMessages.register.passwordValidate.hide();




    const postForm = body => {
        return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
        });
    };

    const regValidate = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/users', {
            method: "GET"})
        .then(function (response) {
            return response.json();
        })
        .then(function (obj) {
            let dataBase = JSON.stringify(obj);
            let dataParse = JSON.parse(dataBase);
            let indexEmail = dataParse.findIndex(obj => obj.l === email.value);
            let registerCheck = (indexEmail === -1 && email.value !== '');
            let emptyEmail = (email.value === '');
            let passwordMatch = (password.value === confirmPassword.value);
            let passwordValidate = (password.value.length >=8);
            
            if (registerCheck === true && emptyEmail === false && passwordMatch === true && passwordValidate === true) {
                handleSubmit(event);
            
            } else if (registerCheck === false) {
                formMessages.register.completed.hide();
                formMessages.register.emailTaken.show();
                formMessages.register.passwordWrong.hide();
                formMessages.register.passwordValidate.hide();


            } else if (passwordMatch === false) {
                formMessages.register.completed.hide();
                formMessages.register.passwordWrong.show();
                formMessages.register.emailTaken.hide();
                formMessages.register.passwordValidate.hide();


            } else if (passwordValidate === false) {
                formMessages.register.passwordValidate.show();
                formMessages.register.completed.hide();
                formMessages.register.passwordWrong.hide();
                formMessages.register.emailTaken.hide();




            }
            })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));      
        const res = await postForm(body);
        const data = await res.json();
        formMessages.register.emailTaken.hide();
        formMessages.register.passwordWrong.hide();
        formMessages.register.passwordValidate.hide();
        formMessages.register.completed.show();


    };


    registerForm.on('submit', regValidate);
    fragment.append(h2, registerForm)
    return fragment;

};


