
import './assets/stylesheets/styles.scss'
import shortid from 'shortid';
import './vendor/jquery-ui';

const $itemBtnTpl = $('<button class="btn  btn-success btn-block row-insertedComment"></button>');
let currentItem = {};
let dragSrcEl = null;
let dragDropDataElements = [];

$(document).ready( function() {

	//Generate Table on Body
	$(".addTable-btn").on("click",function(e){
		e.preventDefault();

		let tableCounter = $('.separated-table').length + 1;
		const tableNames = $(".form-control").val();
		const $generatedTable = $(`<div id="target" class="col-sm-4 col-md-3 separated-table"><div class="panel panel-default draggablePanel" draggable="true"><div class="panel-heading">${tableNames}</div><div class="panel-body"><table class="items-holder"></table></div><div class="panel-footer"><form action="" class="itemForm"><input type="text" class="form-control add-tableRow table-input" placeholder="Enter new item..." required><button class="btn btn-primary btn-block table-btn">Add</button></form></div></div>`);
		const generatedPanel = $generatedTable.find('.draggablePanel')[0];

		$('.row-container').css('width',(320 * tableCounter));
		$(".tables-container").append($generatedTable);
		swapPlaces( [ generatedPanel ] );
	});

	$('.addTable-form').on('focus',function(){
		$('.table-info-container').removeClass('active');
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
		$('.table-info-container').addClass('active');
	});

	//DatePicker.........................................
	$('#datepicker-13').on('click',function()	{

		$('#datepicker-13').datepicker();
		$('#datepicker-13').datepicker("show");

	});

	$('#datepicker-13').on('change',function()	{

		const d = new Date();
		const daySlicer = d.getMonth() + 1 + '/' + '0' + d.getDate() + '/' + d.getFullYear();
		const itemId = currentItem.id;
		const $currentTable = $('.items-holder');

		currentItem.date = $('#datepicker-13').val();
		$(`#${currentItem.id}`).data( 'element',`${JSON.stringify(currentItem)}`  );

		if (daySlicer > currentItem.date) {
			$currentTable.find(`#${itemId}`).removeClass('btn-primary');
			$currentTable.find(`#${itemId}`).addClass('btn-danger');
		}else{
			$currentTable.find(`#${itemId}`).removeClass('btn-danger');
			$currentTable.find(`#${itemId}`).addClass('btn-primary');
		}
	});


	//Function Swap places for Tables.........................................
	// $('body').on('mousedown','.panel-default',function(){
	// 	$('.panel-default').draggable({
	// 		revert: true
	// 	});
	// 	$('.separated-table').droppable({
	// 		accept: '.panel-default',
	// 		drop: function(event, ui) {
	// 	    if ($(this).length > 0) {
	// 	      var move = $(this).children().detach();
	// 	      $(ui.draggable).parent().append(move);
	// 	    }
	// 	      $(this).append($(ui.draggable));
	// 	    }
	// 	});
	// })

	//Drag Button.........................................
	$("body").on('mousedown','.row-insertedComment',function(){
		$('.row-insertedComment').draggable( {cancel:false, revert: true} );
		$('.items-holder').droppable({
			accept: '.row-insertedComment',
			drop: function(event, ui) {
				if ($(this).length > 1000) {
					var move = $(this).children().detach();
	 	     		$(ui.draggable).parent().append(move);
				}
				$(this).append( $(ui.draggable) )
			}
		});
	});


	// function setItems(currentItem)....................
	$('.addComment-btn').on('click', function(e){
		let arrayHelper = $('.comments-input').val();
		const $commentsInput = $('.comments-input');

		$('.info-holderComments').append(`<tr><td>${arrayHelper}</td></tr>`);
		currentItem.commentsArray.push(arrayHelper);


		// Setear currentItem como data del objeto seleccionado....................
		$(`#${currentItem.id}`).data( 'element',`${JSON.stringify(currentItem)}`  );
		$commentsInput.val('');
	})

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

	$('body').on('focus','.table-input',function(){

		$('.table-info-container').removeClass('active');
	});

	swapPlaces( document.querySelectorAll('.draggablePanel') );
});

function swapPlaces( els ){
	const cols = els;

	function handleDragStart(e) {
	  this.style.opacity = '0.4';
	  const elementsData = []; // Arreglo de Objetos

	  // ----------------------------------------------------------//
	  // ----------------------------------------------------------//
	  // Loop todos los botones de este elemento y agarrar el data //
		$(this).find('.row-insertedComment').each( function(){
			elementsData.push( JSON.parse( $(this).data('element')) );
		});

		e.dataTransfer.setData('text', JSON.stringify(elementsData) );

	  dragSrcEl = this;

	  e.dataTransfer.effectAllowed = 'move';
	  e.dataTransfer.setData('text/html', this.innerHTML);
	}

	function handleDragOver(e) {
	  if (e.preventDefault) {
	    e.preventDefault();
	  }

	  e.dataTransfer.dropEffect = 'move';

	  return false;
	}

	function handleDragEnter(e) {
	  this.classList.add('over');
	}

	function handleDragLeave(e) {

	  this.classList.remove('over');
	}

	function handleDrop(e) {

	  if (e.stopPropagation) {
	    e.stopPropagation();
	  }

	  // this es el elemento donde hago drop
	  $(this).find('row-insertedComment').each( function (){
	  	// Get Data from all the buttons in drop element: this
	  	e.dataTransfer.getData('text', JSON.stringify(dragDropDataElements) );
	  	// And push them to dragDropDataElements[]
	  	dragDropDataElements.push( JSON.parse( $(this).data('element') ));
	  });

	  if (dragSrcEl != this) {

	    dragSrcEl.innerHTML = this.innerHTML;

	    this.innerHTML = e.dataTransfer.getData('text/html');

	    // Loop e.dataTransfer.getData('text') y asignar cada data a cada boton de this
	    e.dataTransfer.getData('text').each( function(){
	    	e.dataTransfer.setData('text', )
	    });
	    // Loop dragDropDataElements[] y asignar cada data a cada boton de dragSrcEl

	    // setear dragDropDataElements = []
	  }

	  return false;
	}

	function handleDragEnd(e) {
	  // this/e.target is the source node.
	  this.style.opacity = '1';
	  [].forEach.call(cols, function (col) {
	    col.classList.remove('over');
	  });
	}

	[].forEach.call(cols, function(col) {
	  col.addEventListener('dragstart', handleDragStart, false);
	  col.addEventListener('dragenter', handleDragEnter, false)
	  col.addEventListener('dragover', handleDragOver, false);
	  col.addEventListener('dragleave', handleDragLeave, false);
	  col.addEventListener('drop', handleDrop, false);
	  col.addEventListener('dragend', handleDragEnd, false);
	});
}