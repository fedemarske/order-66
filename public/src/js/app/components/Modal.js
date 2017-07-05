var Modal = (function($){

	var el,
		inputImg,
		tagImg,
		textDesc;

	var init = function(){

		el = $('#add-item-modal');
		inputImg = $('#img-input-item');
		tagImg = $('#img-tag-item');
		textDesc = $('#desc-item');

		$('#btn-cancel-modal').click(closeModal())
		
		window.onclick = function(event) {
		    if (event.target == el[0]) {
		       	closeModal();
		    }
		}.bind(this);

		//$('#btn-submit-modal').click(submit());

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
            }
        };

	}

	return {
		init: init,
		getEl: getEl,
		open: open
	}

})(jQuery)