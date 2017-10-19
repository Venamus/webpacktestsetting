
import './assets/stylesheets/styles.scss'
import shortid from 'shortid';
import './vendor/jquery-ui';

const $itemBtnTpl = $('<button class="btn  btn-success btn-block row-insertedComment"></button>');
let currentItem = {};


$(document).ready( function() {
	//Generate Table on Body
	$(".addTable-btn").on("click",function(e){
		e.preventDefault();

		const tableNames = $(".form-control").val();
		const $generatedTable = `<div class="col-sm-4 col-md-3 separated-table"><div class="panel panel-default"><div class="panel-heading">${tableNames}</div><div class="panel-body"><table class="items-holder"></table></div><div class="panel-footer"><form action="" class="itemForm"><input type="text" class="form-control add-tableRow table-input" placeholder="Enter new item..." required><button class="btn btn-primary btn-block table-btn">Add</button></form></div></div>`;

		$(".tables-container").append($generatedTable);
	});


	//Click on Any Row..................................

	$('body').on('click','.row-insertedComment',function(e){


		e.preventDefault()

		const $nameofTable = $(".info-holder"); //Going into parents div.
		const $nameofTableComments = $(".info-holderComments");

		currentItem = JSON.parse($(this).data('element'));
		$nameofTable.html(`<tr><td>${currentItem.title}</td></tr>`);
		$(".info-holderComments").html('');
		$('#datepicker-13').val(currentItem.date)

		// loop comments
		for (var i = 0; i < currentItem.commentsArray.length; i++) {
			$('.info-holderComments').append(`<tr><td>${currentItem.commentsArray[i]}</td></tr>`);
		}

	});

	//DatePicker.........................................
	$('#datepicker-13').on('click',function()	{

		$('#datepicker-13').datepicker();
		$('#datepicker-13').datepicker("show");

	});

	$('#datepicker-13').on('change',function()	{

		const d = new Date();
		const daySlicer = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
		const itemId = currentItem.id;
		const $currentTable = $('.items-holder');

		currentItem.date = $('#datepicker-13').val();
		$(`#${currentItem.id}`).data( 'element',`${JSON.stringify(currentItem)}`  );

		console.log(currentItem);

		if (daySlicer == currentItem.date) {
			$currentTable.find(`#${itemId}`).removeClass('btn-primary');
			$currentTable.find(`#${itemId}`).addClass('btn-danger');
		}else{
			$currentTable.find(`#${itemId}`).removeClass('btn-danger');
			$currentTable.find(`#${itemId}`).addClass('btn-primary');
		}
	});


	//Function Swap places for Tables.........................................
	$('body').on('mousedown','.panel-default',function(){
		$('.panel-default').draggable({
			revert: true
		});
		$('.separated-table').droppable({
			accept: '.panel-default',
			drop: function(event, ui) {
		    if ($(this).length > 0) {
		      var move = $(this).children().detach();
		      $(ui.draggable).parent().append(move);
		    }
		      $(this).append($(ui.draggable));
		    }
		});
	})

	//Drag Button.........................................
	$("body").on('mousedown','.row-insertedComment',function(){
		$(".row-insertedComment").sortable({ handle: 'button', cancel: '' }).disableSelection(); 
	});


	// function setItems(currentItem){....................
	$('.addComment-btn').on('click', function(e){
		let arrayHelper = $('.comments-input').val();
		const $commentsInput = $('.comments-input');

		$('.info-holderComments').append(`<tr><td>${arrayHelper}</td></tr>`);
		currentItem.commentsArray.push(arrayHelper);


		// Setear currentItem como data del objeto seleccionado....................
		$(`#${currentItem.id}`).data( 'element',`${JSON.stringify(currentItem)}`  );
		$commentsInput.val('');
	})
	// }


	//Insert Comments on Tables function............
	$("body").on('submit','.itemForm', function(e) {
		e.preventDefault();

		const $parentTable = $(this).parent().parent(); //Going into parents div.
		const $selectedTable = $parentTable.find(".items-holder"); //Finding the table on the parent and storing them into a variable.
		const $btn = $itemBtnTpl.clone();
		const newItem = {
			id: shortid.generate(),
			title: $parentTable.find(".table-input").val(),
			commentsArray: [],
			date: ''
		};


		if (newItem.title == "") {
			alert("Necesita Agregar un Valor");
			return;
		};

		$btn.attr('id', newItem.id);
		$btn.text(newItem.title);
		$btn.data('element',`${JSON.stringify(newItem)}`);
		$selectedTable.append($btn);
		$parentTable.find(".table-input").val('');
	});
});