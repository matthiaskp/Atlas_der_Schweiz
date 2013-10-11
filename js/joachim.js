$( document ).ready(function() {
	// INSTALL TO HOME SCREEN INFO
	if (window.navigator.standalone === false) {
	    $('.modalbox').text("Install this app on your Homescreen.")
	    console.log('install it!!');
	}
	// PREVENT SCROLLBOUNCE
	function stopScrolling( touchEvent ) { touchEvent.preventDefault(); }
	/*document.addEventListener( 'touchstart' , stopScrolling , false );*/
	document.addEventListener( 'touchmove' , stopScrolling , false );

	// SET BODY HEIGHT
	setBodySize();

	$( window ).resize(function() {
		setBodySize();
	});
	$( window ).on( "orientationchange", function( event ) {
		setBodySize();
	});
	function setBodySize () {
		var height = $(window).height();
		$('body').css('height',height);
	}
});