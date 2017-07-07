(function($, App, Lockr){

	'use strict';

	function Item(options, listIns){
		console.log(options)
		this.description = options.description;
		this.imgSrc = options.img.indexOf('data:image/png;base64,') !== -1 ? options.img : 'data:image/png;base64,' + options.img;
		this.uid = options.uid || '';
		this.list = listIns;
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
		this.el.data(this)
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
		App.Modal.open(true, {
			description: this.description,
			imgSrc: this.imgSrc
		});
	}

	Item.prototype.deleteHandler = function() {
		var items = this.list.items,
			itemToDelete = items.map(function(e) { return e.uid; }).indexOf(this.uid);

		items.splice(itemToDelete, 1);
		Lockr.rm('items-list');
		Lockr.set('items-list', items);
		this.list.reRender();
	}

	App.Item = Item;

})(jQuery, App, Lockr);