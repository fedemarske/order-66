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
		    	console.log(this)
		    	var item = {
					description: $(this).data().description,
					img: $(this).data().imgSrc
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

	var getList = function(){
		return list;
	}

	return {
		init: init
	};

})(jQuery, Lockr);
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
	}

	List.prototype.cleanList = function(){
		this.items = [];
	}

	App.List = List;

})(jQuery, App, Lockr);
(function($, App){

	var el,
		inputImg,
		tagImg,
		textDesc,
		list;

	var init = function(listIns){
		el = $('#add-item-modal');
		inputImg = $('#img-input-item');
		tagImg = $('#img-tag-item');
		textDesc = $('#desc-item');
		list = listIns;


		/*Events Modal*/

		$('#btn-cancel-modal').click(closeModal)
		
		window.onclick = function(event) {
		    if (event.target == el[0]) {
		       	closeModal();
		    }
		}.bind(this);

		$('#btn-submit-modal').click(submit);

		$('#img-anchor-item').click(function(){
			inputImg.click();
		}.bind(this))

		inputImg.on('change', inputImgHandler.bind(this));
	}

	var getEl = function(){
		return el;
	}

	var open = function(isEdit, item){
		if (isEdit) {
			textDesc.val(item.description);
			tagImg.attr('src', item.imgSrc);
		}
		el.show();
	}

	var submit = function(){
		var itemToAdd = {
			uid: guidGenerator(),
			description: textDesc.val(),
			img: getBase64Image(tagImg[0])
		};
		list.addItem(itemToAdd);
		closeModal();
	}

	var cleanForm = function(){
		inputImg.val('');
		tagImg.attr('src', 'http://via.placeholder.com/320x320');
		textDesc.val('');
	}

	var closeModal = function(){
		cleanForm();
		el.hide();
	}

	var inputImgHandler = function(evt){

	    var tgt = evt.target,
        	files = tgt.files,
        	img = new Image();
        	
        if (!files[0].name.match(/.(jpg|jpeg|png|gif)$/i)){
    		alert('not an image')
    		inputImg.val('');
    		return false;
        }

        img.src = window.URL.createObjectURL( files[0] );

        img.onload = function() {
            var width = img.naturalWidth,
                height = img.naturalHeight;

            window.URL.revokeObjectURL( img.src );

            if( width <=  320 && height <= 320 ) {
			    if (FileReader && files && files.length) {
			        var fr = new FileReader();
			        fr.onload = function () {
						tagImg.attr('src', fr.result);
			        }
			        fr.readAsDataURL(files[0]);
			    }
            }else{
            	alert('image with more than 320x320px')
            	inputImg.val('');
            }
        };

	}

	var getBase64Image = function(img) {
	    var canvas = document.createElement("canvas");
	    canvas.width = img.width;
	    canvas.height = img.height;

	    var ctx = canvas.getContext("2d");
	    ctx.drawImage(img, 0, 0);

	    var dataURL = canvas.toDataURL("image/png");

	    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}

	function guidGenerator() {
	    var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}

	App.Modal = {
		init: init,
		getEl: getEl,
		open: open
	}

})(jQuery, App)