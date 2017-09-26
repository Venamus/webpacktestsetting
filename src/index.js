require('./assets/stylesheets/styles.scss');


$(document).ready(function(){
	var tablename = '';
	var tableTodo = '<div class="panel panel-primary"><table class="table table-striped experiment"><tr><th>'+tablename+'</th></tr><tr><td class="draggable-row"><input class="completed-taskBox" type="checkbox"></td></tr></table></div>'

	$(".input-table").on('focus', function(){
		$('.input-table').addClass('active');
		$('.add-tableBtn').addClass('active');
	});

	$('.add-tableBtn').click(function(){
		$('.input-table').removeClass('active');
		$('.add-tableBtn').removeClass('active');
		tablename = $('.input-table').val();

		$(document).html(tableTodo);

	});
});