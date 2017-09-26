require('./assets/stylesheets/styles.scss');

$(document).ready(function(){
	let tablename = '';
	let $tableTodo = `<div class="tables-container"><table class="table table-stripped"><tr><th>${tablename}</th></tr><tr><td><button>Add</button></td></tr></table></div>`
	let tableRowInput = '';

	$('.add-tableRow').on('focus',() => {
		$('.add-tablerowBtn').addClass('active');
		$('.add-tableRow').addClass('active')
	});

	$('.add-tableInput').on('focus',() => {
		$('.add-tableInput').addClass('active');
		$('.add-tableBtn').addClass('active');
	});

	$('.add-tableBtn').click(() => {
		$('.add-tableInput').removeClass('active');
		$('.add-tableBtn').removeClass('active');
		tablename = $('.add-tableInput').val();

		console.log(tablename);
		$(document).html($tableTodo);

	});
});