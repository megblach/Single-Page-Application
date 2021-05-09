import $ from 'jquery';

export function validate(){
    let name = $(document.getElementById("name").value);
    let subject = $(document.getElementById("subject").value);
    let phone = $(document.getElementById("phone").value);
    let email = $(document.getElementById("email").value);
    let message = $(document.getElementById("message").value);
    let error_message = $(document.getElementById("error_message"));
    
    error_message.style.padding = "10px";
    
    let text;
    if(name.length < 10){
      text = "Proszę podać imię";
      error_message.innerHTML = text;
      return false;
    }
    if(subject.length < 10){
      text = "Proszę wpisać temat wiadomości";
      error_message.innerHTML = text;
      return false;
    }
    if(isNaN(phone) || phone.length != 10){
      text = "Proszę wpisać poprawny numer telefonu";
      error_message.innerHTML = text;
      return false;
    }
    if(email.indexOf("@") == -1 || email.length < 6){
      text = "Proszę wpisać poprawny adres email";
      error_message.innerHTML = text;
      return false;
    }
    if(message.length <= 140){
      text = "Maxymalnie 140 znaków";
      error_message.innerHTML = text;
      return false;
    }
    alert("Formularz wypełniony poprawnie!");
    return true;
  }