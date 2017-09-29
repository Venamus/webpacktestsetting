require('./assets/stylesheets/styles.scss');


$(document).ready( function() {

	$(".btn-default").on("click",function(e){
		e.preventDefault();
		const tableNames = $(".form-control").val();
		const $generatedTable = `<div class="col-sm-4 col-md-3"><div class="panel panel-default"><div class="panel-heading">${tableNames}</div><div class="panel-body"><table class="items-holder"></table></div><div class="panel-footer"><input type="text" class="form-control add-tableRow table-input" placeholder="Enter new item..."><button class="btn btn-primary btn-block table-btn">Add</button></div></div></div>`;

		$(".tables-container").append($generatedTable);
	});
	$("body").on('click','.table-btn', function() {
		const $parentTable = $(this).parent().parent();
		const rowValue = $parentTable.find(".table-input").val();
		const $selectedTable = $parentTable.find(".items-holder");

		$selectedTable.append(`<tr><td>${rowValue}</td></tr>`)
	});
	$("body").on('click','tr', function() {
		const $parentTable = $(this).parent().parent();
		const $selectedTable = $parentTable.find(".items-holder");
		$selectedTable.find($(this)).after('<div class="row-comment"><td><input type="text" class="form-control " placeholder="Enter new Comment..."></div>');
	});
	$("body").on("focusout",'.row-comment', function() {
		$(this).addClass("not-active");
	});
	$("body").on("focus",'.row-comment', function() {
		$(this).removeClass("not-active");
	});
});