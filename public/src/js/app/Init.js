var App = (function($, Lockr){

	var list;

	var init = function(){
		list = new App.List();

		App.Modal.init(list);

		$('#main-list').append(list.create());

		sortableInit();

		//$("ul.main-list-items").sortable();

		$('#counter').text(list.getCounter());

		$('#add-item-btn').click(function(){
			App.Modal.open(false);
		})

	}

	var sortableInit = function(){
		var adjustment;

		$("ul.main-list-items").sortable({
		  group: 'simple_with_animation',
		  pullPlaceholder: false,
		  nested: false,
		  // animation on drop
		  onDrop: function  ($item, container, _super) {
		    var $clonedItem = $('<li/>').css({height: 0});
		    $item.before($clonedItem);
		    $clonedItem.animate({'height': $item.height()});

		    $item.animate($clonedItem.position(), function  () {
		      $clonedItem.detach();
		      _super($item, container);
		    });

		    var items = [];

		    container.el.find('li.item').each(function(){
		    	var item = {
					description: $(this).data().description,
					img: $(this).data().imgSrc,
					uid: $(this).data().uid
				}
		    	items.push(item);
		    })

			list.items = items;
			Lockr.rm('items-list');
			Lockr.set('items-list', items);

		  },

		  // set $item relative to cursor position
		  onDragStart: function ($item, container, _super) {
		    var offset = $item.offset(),
		        pointer = container.rootGroup.pointer;

		    adjustment = {
		      left: pointer.left - offset.left,
		      top: pointer.top - offset.top
		    };

		    _super($item, container);
		  },
		  onDrag: function ($item, position) {
		    $item.css({
		      left: position.left - adjustment.left,
		      top: position.top - adjustment.top
		    });
		  }
		});
	}


	return {
		init: init
	};

})(jQuery, Lockr);