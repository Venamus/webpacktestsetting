require('./assets/stylesheets/styles.scss');


$(document).ready( function() {

	//Generate Table on Body
	$(".btn-default").on("click",function(e){
		e.preventDefault();
		const tableNames = $(".form-control").val();
		const $generatedTable = `<div class="col-sm-4 col-md-3"><div class="panel panel-default"><div class="panel-heading">${tableNames}</div><div class="panel-body"><table class="items-holder"></table></div><div class="panel-footer"><input type="text" class="form-control add-tableRow table-input" placeholder="Enter new item..."><button class="btn btn-primary btn-block table-btn">Add</button></div></div></div>`;

		$(".tables-container").append($generatedTable);
	});
	// $("body").on('click','.row-insertedComment', function() {
	// 	const $parentTable = $(this).parent().parent();
	// 	const $tableHeader = $parentTable.parent().parent().find('.panel-heading').text();
	// 	let currentComments = {};

	// 	currentComments.commetns

	// 	$(".info-holder").text(``);
	// 	$(".info-holder").append(`<tr><td>${"Name of table: "+$tableHeader}</td></tr>`);

	// });

	//Insert InfoTable on Body
	let currentComments = {};
	$('body').on('click','.row-insertedComment',function(){
		currentComments = $(this).data('comments');
		console.log(currentComments);
	});


	//Insert Comments on Tables function
	$("body").on('click','.btn', function() {
		const $parentTable = $(this).parent().parent(); //Going into parents div.
		const rowValue = $parentTable.find(".table-input").val(); //Getting the value from the input.
		const $selectedTable = $parentTable.find(".items-holder"); //Finding the table on the parent and storing them into a variable.
		const $selectedInfo = $parentTable.find(".info-holderComments"); //Finding the Table of the comments and sotring them into a variable.

		//Append Comments.
		$selectedInfo.append(`<tr><td>${rowValue}</td></tr>`);
		$selectedTable.append(`<tr><td class="row-insertedComment">${rowValue}</td></tr>`);
	});
});