var Item = (function($){

	'use strict';

	function Item(options){
		this.description = options.description;
		this.imgSrc = options.img || 'http://via.placeholder.com/320x320';
		this.createDom();
		//this.position = options.position;
	}

	Item.prototype.create = function(){
		this.el.append(this.img);
		this.el.append(this.span);
		this.el.addClass('item')

		return this.el;
	}

	Item.prototype.createDom = function(){
		this.el = $('<li>');
		this.img = $('<img>').addClass('list-img').attr({
			'src': this.imgSrc,
			'width': '100px',
			'heigth': '100px'	
		});
		this.span = $('<span>').text(this.description);
	}

	return Item;

})(jQuery);