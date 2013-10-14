$( document ).ready(function() {
	function onoffswitchinit (argument) {
		$(".onoffswitch-label").click(function(){
			var ebene = $(this).siblings('.onoffswitch-checkbox').attr('data-layer');
			if ($(this).siblings('.onoffswitch-checkbox').is(":checked")){
	  			$('#'+ ebene).css('visibility', 'hidden');
			}
			else{
				$('#'+ ebene).css('visibility', 'visible');
			}
		});
	};
	


	var layercount = 0;

	function sliderinit () {
		$('.opacityslider:first').slider({ 
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
	    		$('#'+ ebene).css('z-index',($(this).parent().index()*-10-1));
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
		layerControlObject.layerClass = "layer-"+layercount;
		
		var kartenname = $("#kartenvorschau > img").attr("src");
		layerControlObject.imageBackground = 'url(' + kartenname + ')';

		var templateString = $("#layerTemplate").html();
		var layerAppend = _.template(templateString, layerControlObject);
	    $(".layercontainer").prepend(layerAppend);
	    sliderinit();
	    onoffswitchinit();

	    var bgLayerString = $("#bgLayerTemplate").html();
	    var bgLayerAppend = _.template(bgLayerString, layerControlObject);
	    $(".bglayercontainer").append(bgLayerAppend);
	}

	$( "#button_karte_auswaehlen" ).click(function(){
		layerControlObject.layerTitle = $('.menuLinkActive').text();
		newLayer();
	});
});