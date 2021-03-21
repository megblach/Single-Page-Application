import $ from 'jquery';
import axios from 'axios';

const required = value => {
    //                         OR                OR
    return value === undefined || value === null || value === '';
};

const short = value => {
    //                              AND
    return typeof value === 'string' && value.length < 6;
};

export const signUp = () => {
    const form = $(`
        <form name="signUp" autocomplete="off" novalidate>
            <div>
                <label for="login">Login</label>
                <input id="login" type="text" />
                <p id="login-required" class="text-danger">Login is required.</p>
            </div>

            <div>
                <label for="password">Password</label>
                <input id="password" type="password" />
                <p id="password-required" class="text-danger">Password is required.</p>
                <p id="password-short" class="text-danger">Password is too short.</p>
            </div>

            <button type="button">Sign up</button>
        </form>
    `);

    const errorMessages = {
        login: {
            required: form.find('#login-required')
        },
        password: {
            required: form.find('#password-required'),
            short: form.find('#password-short')
        }
    };
    
    // UKRYWAMY WSZYSTKIE WIADOMOSCI O BLEDACH ZANIM POKAZEMY FORMULARZ UZYTKOWNIKOWI
    errorMessages.login.required.hide();
    errorMessages.password.required.hide();
    errorMessages.password.short.hide();

    form.find('button').on('click', event => {
        event.preventDefault();

        const login = form.find('#login').val();
        const password = form.find('#password').val();

        const loginIsRequired = required(login);
        const passwordIsRequired = required(password);
        const passwordIsShort = short(password);

        loginIsRequired ? errorMessages.login.required.show() : errorMessages.login.required.hide();
        passwordIsRequired ? errorMessages.password.required.show() : errorMessages.password.required.hide();
        passwordIsShort ? errorMessages.password.short.show() : errorMessages.password.short.hide();

        if (!loginIsRequired && !passwordIsRequired && !passwordIsShort) {
            axios.post('http://localhost:3000/users', {
                l: login,
                p: password
            });
        }

        console.log(login, password);
    });

    return form;
};