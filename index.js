require('./src/styles.scss');

$(document).ready(function(){
	let table-name = '';
	let hola = "hola";

	$(".add-tableInput").on('focus',() => {
		$(".add-tableInput").addClass('active');
		$(".add-tableBtn").addClass('active');
	});

	console.log(table-name);
});