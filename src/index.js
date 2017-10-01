require('./assets/stylesheets/styles.scss');


$(document).ready( function() {

	$(".btn-default").on("click",function(e){
		e.preventDefault();
		const tableNames = $(".form-control").val();
		const $generatedTable = `<div class="col-sm-4 col-md-3"><div class="panel panel-default"><div class="panel-heading">${tableNames}</div><div class="panel-body"><table class="items-holder"></table></div><div class="panel-footer"><input type="text" class="form-control add-tableRow table-input" placeholder="Enter new item..."><button class="btn btn-primary btn-block table-btn">Add</button></div></div></div>`;

		$(".tables-container").append($generatedTable);
	});
	$("body").on('click','.row-insertedComment', function() {
		const $parentTable = $(this).parent().parent();
		const $tableHeader = $parentTable.parent().parent().find('.panel-heading').text();
		const $infoTable = `<div class="col-sm-4 col-md-3 table-info-container"><div class="panel panel-default"><div class="panel-heading">Tables Info</div><div class="panel-body"><table class="info-holder"><th>${"Name of table: "+$tableHeader}</th></table><table class="info-holder"><th>Comments</th></table></div><div class="panel-footer"><input type="text" class="form-control add-tableRow table-input" placeholder="Enter new Comment..."><button class="btn btn-primary btn-block table-btn">Enter new Comment</button></div></div></div>`;

		if ($infoTable.length) {
				return console.log("hola")
		} if($infoTable.length === 0 ){
			$("body").append($infoTable);
		}
	});
	$("body").on('click','.btn', function() {
		const $parentTable = $(this).parent().parent();
		const rowValue = $parentTable.find(".table-input").val();
		const $selectedTable = $parentTable.find(".items-holder");
		const $selectedInfo = $parentTable.find(".info-holder");

		$selectedInfo.append(`<tr><td class="row-insertedComment">${rowValue}</td></tr>`);
		$selectedTable.append(`<tr><td class="row-insertedComment">${rowValue}</td></tr>`);

	});
});