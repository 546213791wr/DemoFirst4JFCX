jQuery(document).ready(function($){
	//open popup
//	$('.cd-popup-trigger').on('click', function(event){
//		event.preventDefault();
//		$('.cd-popup').addClass('is-visible');
//	});
	
	//close popup
//	$('.cd-popup').on('click', function(event){
//		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
//			event.preventDefault();
//			$(this).removeClass('is-visible');
//		}
//	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
    
    //open window
	$('.cd-window-trigger').on('click', function(event){
		event.preventDefault();
		$('.cd-window').addClass('is-visible');
	});
	
	//close window
	$('.cd-window').on('click', function(event){
		if( $(event.target).is('.cd-window-close') || $(event.target).is('.cd-window') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close window when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-window').removeClass('is-visible');
	    }
    });
    
});