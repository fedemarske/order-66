var appInit = (function($){

	var init = function(){
		var list = new List(),
			modal = $('#add-item-modal');

		$('#main-list').append(list.create());

		$("ul.main-list-items").sortable();

		$('#counter').text(list.getCounter());

		$('#add-item-btn').click(function(){
			modal.show();
		})

		window.onclick = function(event) {
		    if (event.target == modal[0]) {
		        modal.hide();
		    }
		}
	}

	return {
		init: init
	};

})(jQuery);