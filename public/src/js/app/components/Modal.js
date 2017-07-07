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