'use strict'
var serverApiAddr = "http://localhost:8080/second-hand-trade";



$(() => {
	console.log('111');
	$('.container > header').load(`${serverApiAddr}/html/header.html`)
	$('.container > footer').load(`${serverApiAddr}/html/footer2.html`)
});