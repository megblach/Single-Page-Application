import $ from 'jquery';
import axios from 'axios';

export const signin = () => {
    const fragment = $( document.createDocumentFragment() );
    const h2 = $('<h2>Zaloguj Się do konta IT SPA</h2>');
    const myForm = $(`
    <form class="form" id="myForm" autocomplete="off">
    <input type="email" id="userEmail" placeholder="Adres Email" required>
    <input type="password" id="userPassword" placeholder="Hasło" required> 
    <button type="submit">Zaloguj</button>
    </form>
    `);
    
myForm.find("button").on("click", (event) => {
    
    event.preventDefault();

        fetch('http://localhost:3000/users')
        .then(function (response){
            return response.json();
        })
        .then(function (obj) {
            console.log(obj);
            
        })
        
        .catch(function(error) {
            console.error('something went wrong');
            console.error(error);
        })

        console.log('button works')
});
   




   





    fragment.append(h2, myForm)

    return fragment;
};









  