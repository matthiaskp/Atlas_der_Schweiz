$( document ).ready(function() {

	$('input').focus(function () {
		$(this).parent().css('width','100%');
		$(this).css('width','20%');
		$('.menu').hide();
		$('.livesearch').show();
	})
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

	// --------------------------------SEARCH

	String.prototype.score = function(abbreviation,offset) {
	  offset = offset || 0 // TODO: I think this is unused... remove
	 
	  if(abbreviation.length == 0) return 0.9
	  if(abbreviation.length > this.length) return 0.0

	  for (var i = abbreviation.length; i > 0; i--) {
	    var sub_abbreviation = abbreviation.substring(0,i)
	    var index = this.indexOf(sub_abbreviation)


	    if(index < 0) continue;
	    if(index + abbreviation.length > this.length + offset) continue;

	    var next_string       = this.substring(index+sub_abbreviation.length)
	    var next_abbreviation = null

	    if(i >= abbreviation.length)
	      next_abbreviation = ''
	    else
	      next_abbreviation = abbreviation.substring(i)
	 
	    var remaining_score   = next_string.score(next_abbreviation,offset+index)
	 
	    if (remaining_score > 0) {
	      var score = this.length-next_string.length;

	      if(index != 0) {
	        var j = 0;

	        var c = this.charCodeAt(index-1)
	        if(c==32 || c == 9) {
	          for(var j=(index-2); j >= 0; j--) {
	            c = this.charCodeAt(j)
	            score -= ((c == 32 || c == 9) ? 1 : 0.15)
	          }

	          // XXX maybe not port this heuristic
	          // 
	          //          } else if ([[NSCharacterSet uppercaseLetterCharacterSet] characterIsMember:[self characterAtIndex:matchedRange.location]]) {
	          //            for (j = matchedRange.location-1; j >= (int) searchRange.location; j--) {
	          //              if ([[NSCharacterSet uppercaseLetterCharacterSet] characterIsMember:[self characterAtIndex:j]])
	          //                score--;
	          //              else
	          //                score -= 0.15;
	          //            }
	        } else {
	          score -= index
	        }
	      }
	   
	      score += remaining_score * next_string.length
	      score /= this.length;
	      return score
	    }
	  }
	  return 0.0
	}

	jQuery.fn.liveUpdate = function(list){
		list = jQuery(list);

		if ( list.length ) {
			var rows = list.children('li'),
				cache = rows.map(function(){
					return this.innerHTML.toLowerCase();
				});
				
			this
				.keyup(filter).keyup()
				.parents('form').submit(function(){
					return false;
				});
		}
			
		return this;
			
		function filter(){
			var term = jQuery.trim( jQuery(this).val().toLowerCase() ), scores = [];
			
			if ( !term ) {
				rows.show();
			} else {
				rows.hide();

				cache.each(function(i){
					var score = this.score(term);
					if (score > 0) { scores.push([score, i]); }
				});

				jQuery.each(scores.sort(function(a, b){return b[0] - a[0];}), function(){
					jQuery(rows[ this[1] ]).show();
				});
			}
		}
	};
	$('#suchFeld').liveUpdate('.searchlist');

	$(".filterlist li input").click(function() {
		console.log($(this).val());
		if ($(this).is(":checked")){
			$('.'+ $(this).val()).css('display','inline-block')
		}
		else{
			$('.'+ $(this).val()).css('display','none')
		}
	});
});
