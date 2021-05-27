import $ from "jquery";

$(document).on("submit", "#myform", (ev) => validate(ev));

const validate = (ev) => {
    ev.preventDefault();
    let name = $("#name")[0].value;
    let subject = $("#subject")[0].value;
    let phone = $("#phone")[0].value;
    let email = $("#email")[0].value;
    let message = $("#message")[0].value;
    let error_message = $("#error_message")[0];

    error_message.style.padding = "10px";

    // moze byc wiecej niz jeden blad w formularzu,
    // cza pokazac wszystkie
    let text = [];
    if (name.length < 10) {
        text.push("Proszę podać imię");
    }
    if (subject.length < 10) {
        text.push("Proszę wpisać temat wiadomości");
    }
    if (isNaN(phone) || phone.length != 9) {
        text.push("Proszę wpisać poprawny numer telefonu");
    }
    if (email.indexOf("@") === -1 || email.length < 6) {
        text.push("Proszę wpisać poprawny adres email");
    }
    if (message.length >= 140) {
        text.push("Maxymalnie 140 znaków");
    }
    if (message.length === 0) {
        text.push("Wiadomosc nie moze byc pusta");
    }

    if (text !== null) {
        error_message.innerHTML = text.join("<br/>");
        return false;
    } else {
    alert("Formularz wypełniony poprawnie!");
    }
};