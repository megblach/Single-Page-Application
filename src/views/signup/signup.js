import 'regenerator-runtime/runtime';
import $, { unique } from 'jquery';

export const signup = () => {


    const fragment = $( document.createDocumentFragment() );

    const h2 = $('<h2>Zarejestruj Się</h2>');
    const h3 = $('<h3>Dzięki za rejestrację</h3>');


    const registerForm = $(`
    <div class="regForm">
        <form name="fetch">
            <input type="email" name="l" placeholder="Email">
            <input type="password" id="password" name="p" placeholder="Hasło">
            <input type="password" id="confirmPassword" placeholder="Powtórz Hasło">
            <button type="submit">Submit</button>
        </form>
    </div>

    
    `);

    const regForm = document.querySelector('.form');
    const form = document.forms.fetch;

    const postForm = body => {
        return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.value === confirmPassword.value) {
        const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));      
        const res = await postForm(body);
        const data = await res.json();
        alert('Dziękujemy za rejestrację w IT SPA!');
        
        } else {
            alert('Hasła nie są takie same')
        }
    
        
        
    };
    

    

    registerForm.on('submit', handleSubmit);
    

    



    fragment.append(h2, registerForm)

    return fragment;



};


