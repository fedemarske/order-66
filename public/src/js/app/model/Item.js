var Item = (function($){

	'use strict';

	function Item(options){
		this.description = options.description;
		//this.img = options.img;
		//this.position = options.position;
		this.el = $('<li>');
	}

	Item.prototype.create = function(){
		this.el.text(this.description);

		return this.el;
	}

	return Item;

})(jQuery);