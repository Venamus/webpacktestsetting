
import './assets/stylesheets/styles.scss'
import shortid from 'shortid';
import './vendor/jquery-ui';

const $itemBtnTpl = $('<button class="btn btn-success btn-block row-insertedComment"></button>');
let currenItem = {};



$(document).ready( function() {

	//Generate Table on Body
	$(".addTable-btn").on("click",function(e){
		e.preventDefault();
		const tableNames = $(".form-control").val();
		const $generatedTable = `<div class="col-sm-4 col-md-3"><div class="panel panel-default"><div class="panel-heading">${tableNames}</div><div class="panel-body"><table class="items-holder"></table></div><div class="panel-footer"><form action="" class="itemForm"><input type="text" class="form-control add-tableRow table-input" placeholder="Enter new item..." required><button class="btn btn-primary btn-block table-btn">Add</button></form></div></div>`;

		$(".tables-container").append($generatedTable);
	});

	$('body').on('click','.row-insertedComment',function(){

		currenItem = JSON.parse($(this).data('element'));
		console.log(currenItem);
		// setItems(currenItem);
	});

	// function setItems(currentItem) {

	// }


	//Insert Comments on Tables function
	$("body").find('.itemForm').on('submit', function(e) {
		e.preventDefault();

		const $parentTable = $(this).parent().parent(); //Going into parents div.
		const $selectedTable = $parentTable.find(".items-holder"); //Finding the table on the parent and storing them into a variable.
		const $btn = $itemBtnTpl.clone();
		const newItem = {
			id: shortid.generate(),
			title: $parentTable.find(".table-input").val(),
			commentsArray: []
		};


		if (newItem.title == "") {
			alert("Necesita Agregar un Valor");
			return;
		}

		$btn.attr('id', newItem.id);
		$btn.text(newItem.title);
		$btn.data('element',`${JSON.stringify(newItem)}`);
		$selectedTable.append($btn);
		$parentTable.find(".table-input").val('');
	});
});