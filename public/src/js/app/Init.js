var app = (function($){

	var list;

	var init = function(){
		Modal.init();

		list = new List();

		$('#main-list').append(list.create());

		$("ul.main-list-items").sortable();

		$('#counter').text(list.getCounter());

		$('#add-item-btn').click(function(){
			Modal.open(false);
		})

	}

	var getList = function(){
		return list;
	}

	return {
		init: init
	};

})(jQuery);