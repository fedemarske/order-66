(function($, App, Lockr){

	'use strict';

	function List(){
		this.items = this.getItems();
		this.el = $('<ul>').addClass('main-list-items');
	}

	List.prototype.getItems = function(){

		if(typeof Lockr.get('items-list') === 'undefined'){
			Lockr.set('items-list', []);
		}	

		return Lockr.get('items-list');
	}

	List.prototype.create = function(){

		$.each(this.items, function(index, value){
			var item = new App.Item(value, this);
			this.el.append(item.create())
		}.bind(this))

		return this.el;
	}

	List.getInstance = function(){
		return this;
	}

	List.prototype.getCounter = function(){
		return this.items.length;
	}

	List.prototype.addItem = function(item){
		this.items.push(item);
		Lockr.set('items-list', this.items);
		this.reRender();
	}

	List.prototype.reRender = function(){
		this.el.html('');
		this.create();
		$('#counter').text(this.getCounter());
	}

	List.prototype.cleanList = function(){
		this.items = [];
	}

	App.List = List;

})(jQuery, App, Lockr);