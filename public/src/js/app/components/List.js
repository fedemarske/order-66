var List = (function($, Item){

	'use strict';

	function List(){
		this.items = this.getItems();
		this.el = $('<ul>').addClass('main-list-items');
	}

	List.prototype.getItems = function(){
		return [{
			description: 'sarasa 1'
		},{
			description: 'sarasa 2'
		},{
			description: 'sarasa 3'
		},{
			description: 'sarasa 4'
		}]
	}

	List.prototype.create = function(){

		$.each(this.items, function(index, value){
			var item = new Item(value);
			this.el.append(item.create())
		}.bind(this))

		return this.el;
	}

	List.prototype.getCounter = function(){
		return this.items.length;
	}

	return List;

})(jQuery, Item);