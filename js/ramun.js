$( document ).ready(function() {
	function onoffswitchinit (argument) {
		$(".onoffswitch-label").click(function(){
			var ebene = $(this).siblings('.onoffswitch-checkbox').attr('data-layer');
			if ($(this).siblings('.onoffswitch-checkbox').is(":checked")){
	  			$('#'+ ebene).animate({opacity: 0},300);
			}
			else{
				$('#'+ ebene).animate({opacity: 1},300);
			}
		});
	};
	


	var layercount = 0;

	function sliderinit () {
		$('.controls .opacityslider:first').slider({ 
			range: "min",
	        min: 0, 
	        max: 1, 
	        step: 0.01,
	        value: 1,
	    	orientation: "horizontal",
		    slide: function(e,ui){
		     		var ebene= $(this).data("slider")
		       		$('#' + ebene).css('opacity', ui.value)		//slider change
		       //      $('#'+ ebene).css('visibility', 'visible');	//slider unhide
		    }             
		});
	};

	$( ".layercontainer" ).sortable({
		axis: 'y',
		scroll: false,
		tolerance: 'pointer',
		cursor: 'pointer',
		dropOnEmpty: true,
		connectWith: '.layercontainer',
	    start: function(event, ui) {
	        var start_pos = ui.item.index();
	        ui.item.data('start_pos', start_pos);
	    },
	    update: function(event, ui) {
	    	var layers= $('.layer')
	    	var arr=$(".layercontainer").find( layers );      	
	    	
	    	jQuery.each( arr, function() {
	    		console.log($(this));
	    		var ebene= $(this).attr('data-layer');
	    		console.log("bewegte ebene: " + ebene);
	    		$('#'+ ebene).css('z-index',($(this).index()*-10-1));
			});
	    }
	});

	var layerControlObject = {
		// nameId: "five",
		layerTitle: "Empty",
		layerClass: "layer-0", 
		layerIcon: "themen", 
		imageBackground: "background-image: url(px/Verkehr.png)"
	};

	function newLayer () {
		layercount ++;
		var layerclass = "layer-"+layercount;
		layerControlObject.layerClass = layerclass;

		var karte = $('.menuLinkActive').attr('linkTo');
		
		var kartenname = $("#kartenvorschau > img").attr("src");
		layerControlObject.imageBackground = 'url(' + kartenname + ')';

		var templateString = $("#layerTemplate").html();
		var layerAppend = _.template(templateString, layerControlObject);
	    var $newLayer = $(layerAppend)
	    $(".layercontainer").prepend($newLayer);

	    sliderinit();
	    onoffswitchinit();
	    getKartenFarben(karte, layerclass);

	    var bgLayerString = $("#bgLayerTemplate").html();
	    var bgLayerAppend = _.template(bgLayerString, layerControlObject);
	    $(".bglayercontainer").append(bgLayerAppend);

	    //PORTLETS
		$newLayer.click(function() {
			$(".layer.is-expanded").not($(this)).each(function(){									//reset
				$(this).children( ".controls" ).toggleClass('is-expanded', function(){
					$(this).parent().removeClass( "is-expanded");
						//console.log("reset");
				});	
			});

			$(this).toggleClass('is-expanded').children('.controls').toggleClass('is-expanded');

			/*$(".layer.is-expanded").not($(this).parent()).each(function(){									//reset
				$(this).children( ".controls" ).slideToggle(500, function(){
					$(this).parent().removeClass( "is-expanded");
						//console.log("reset");
					});	
				});
			if ($(this).parent().hasClass("is-expanded")){												//hide
				$(this).next( ".controls" ).slideToggle(500, function(){
					$(this).parent().removeClass( "is-expanded");
						//console.log("hidden");
					});	
			}
			else {
				$(this).parent().addClass( "is-expanded");
				$(this).parent().children( ".controls" ).slideToggle();
					//console.log("is-expanded");
			}*/

		});
	};

	$( "#button_karte_auswaehlen" ).click(function(){
		layerControlObject.layerTitle = $('.menuLinkActive').text();
		newLayer();
	});
});