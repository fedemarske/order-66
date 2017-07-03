var appInit = (function($){

	var init = function(){
		var list = new List();

		$('#main-list').append(list.create());
	}

	return {
		init: init
	};

})(jQuery);