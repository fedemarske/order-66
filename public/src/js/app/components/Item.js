var Item = (function($, Modal){

	'use strict';

	function Item(options){
		this.description = options.description;
		this.imgSrc = options.img || 'http://via.placeholder.com/320x320';
		this.createDom();
	}

	Item.prototype.create = function(){
		this.el.append(this.img);
		this.el.append(this.span);
		this.el.append(this.btnBlock);
		this.el.addClass('item');

		return this.el;
	}

	Item.prototype.createDom = function(){
		this.el = $('<li>');
		this.img = $('<img>').addClass('list-img').attr({
			'src': this.imgSrc,
			'width': '130px',
			'heigth': '100px'	
		});
		this.span = $('<span>').text(this.description);
		this.edit = $('<button>').text('Edit').click(this.editHandler.bind(this));
		this.delete = $('<button>').text('Delete').click(this.deleteHandler.bind(this));
		this.btnBlock = $('<div>').addClass('btn-group').append(this.edit, this.delete);
	}

	Item.prototype.editHandler = function() {
		Modal.open(true, {
			description: this.description,
			imgSrc: this.imgSrc
		});
	}

	Item.prototype.deleteHandler = function() {

	}

	return Item;

})(jQuery, Modal);