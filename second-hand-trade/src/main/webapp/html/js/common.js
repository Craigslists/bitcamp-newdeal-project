'use strict'
var serverApiAddr = "http://localhost:8080/second-hand-trade";


$(() => {
    $('footer').load(`${serverApiAddr}/html/footer.html`);
});

