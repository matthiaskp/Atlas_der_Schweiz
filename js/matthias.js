$(document).ready(function() {

////////////////////////////GUI
$("#menuButton").click( function() {
		$(".menuContainer").addClass("menuContainerVisible").removeClass("menuContainerHidden");
		$("#menuButton").hide().delay(500).fadeOut(500);
		console.log("menu Button gedrückt");
	});	


////////////////////////////Menu	

var menuLevelActive = 1;
var lastMenu;
var menuTitel;

$(".menu > ul").addClass("menuIsHidden");
	//$(".menu > ul").css("width", $(window).width()/5);
$("#width").addClass("menuIsVisible").removeClass("menuIsHidden");
	
$(".menu > ul > li > a").click(function(e){
	console.log("------- click ------")
	e.preventDefault();
	if(menuLevelActive!=1){
		$(".menu > ul > li > a").removeClass("menuLinkActive");
		$(this).addClass("menuLinkActive");
	};
	

	var linkTo = $(this).attr("linkTo");
	menuLevelClicked = parseInt($(this).parent().parent().attr("menuLevel"));
	
	console.log("menuLevelClicked: "  + menuLevelClicked)

	for (var i = (menuLevelClicked+1) ; i <= 5; i++) {
		//console.log("levels removed");
		$("[menuLevel='"+i+"']").addClass("menuIsHidden").removeClass("menuIsVisible");
	};


/////////////Abschliessen der Click-Funktion
$("#" + linkTo).addClass("menuIsVisible").removeClass("menuIsHidden");

manageTitleAndBc($(this), menuLevelActive, menuLevelClicked); /////////////Anpassen des Menu-Titels
menuLevelActive = menuLevelClicked+1;
console.log("menuLevelActive:   " + menuLevelActive);
lastMenu = linkTo;
checkMenuLevel(menuLevelActive);
});

/////////////Zurück-Button
$("#zurueckButton").click(function(e){
	e.preventDefault();

	for (var i = (menuLevelActive) ; i <= 5; i++) {
		console.log("click");
		//$("[menuLevel='"+i+"']").addClass("menuIsHidden").delay(500).removeClass("menuIsVisible");
		window.setTimeout(function(){$("[menuLevel='"+i+"']").addClass("menuIsHidden").removeClass("menuIsVisible");}, 1000);
	};
	$("#kartenvorschau").hide();
	menuLevelActive--;
	manageTitleAndBc(null, menuLevelActive, null);
	checkMenuLevel(menuLevelActive);
});

//////////////////////////// Schliessen Button

$("#menu_schliessen").click(function(e){
	
	$("#menuButton").show().delay(500).fadeIn(500);
	$(".menu > ul").addClass("menuIsHidden");
	menuLevelActive = 1;
	checkMenuLevel(menuLevelActive,null);
	$(".menuContainer").removeClass("menuContainerVisible two-fifth").addClass("menuContainerHidden one-fifth");
});

//////////////////////////// Kartenvorschau 
$("ul[menulevel=5] > li > a").click(function(e){
	e.preventDefault();
	console.log("kartenvorschau wird gewechselt");
	var karte = $(this).attr("linkTo");
	$("#kartenvorschau > img").attr("src", "../img/kartenvorschau/" + karte + ".png");
	$("#kartenvorschau").show();
	getKartenFarben(karte);
});



//////////////////////////// Check Menu Level Function
$("#button_karte_auswaehlen").click(function(e){
	e.preventDefault();
	var kartenauswahl = $("#kartenvorschau > img").attr("src");
	$(".hintergrund").css('background-image', 'url(/' + kartenauswahl + ')');
	$("#kartenFarben").show();
});

$("#kartenvorschau > img").click(function(e){
	e.preventDefault();
	var kartenauswahl = $("#kartenvorschau > img").attr("src");
	$(".hintergrund").css('background-image', 'url(/' + kartenauswahl + ')');
	$("#kartenFarben").show();
});


//////////////////////////// Check Menu Level Function

function checkMenuLevel (menuLevelActive, menuTitel){
	switch (menuLevelActive) {
		case 1:
			$("#zurueckButton").fadeOut();
			$("#suchFeld").fadeIn();
			$(".menu > ul > li > a").removeClass("menuLinkActive");
			$("#menuTitel").text("").fadeOut();
			$(".menu").css("left", "-0%");
			//$("[menuLevel='3']").addClass("menuIsHidden").removeClass("menuIsVisible");
			console.log("switch case 1");
			$(".menuContainer").addClass("one-fifth").removeClass("two-fifth");
			break;
		case 2:
			$("#zurueckButton").fadeIn();
			$("#suchFeld").fadeOut();
			$(".menu").css("left", "-100%");
			$(".menu").css("width", "500%");
			console.log("switch case 2");
			$(".menuContainer").addClass("one-fifth").removeClass("two-fifth");
			
			//console.log("Menu: margin-left auf -20% gestellt");
			//$("[menuLevel='4']").addClass("menuIsHidden").removeClass("menuIsVisible");
			break;
		case 3:
			$(".menu").css("left", "-50%");
			$(".menu").css("width", "250%");
			$(".menuContainer").removeClass("one-fifth").addClass("two-fifth");
			//$(".menuContainer").addClass("two-fifth").removeClass("one-fifth");
			//console.log("Menu: margin-left auf -100% belassen");
			//$("[menuLevel='5']").addClass("menuIsHidden").removeClass("menuIsVisible");
			break;
		case 4:
			$(".menu").css("left", "-100%");
			//console.log("Menu: margin-left auf -60% gestellt");
			break;
		case 5:
			$(".menu").css("left", "-150%");
			//console.log("Menu: margin-left auf -80% gestellt");
			break;
	}
};



function manageTitleAndBc (clickedLink, menuLevelActive, menuLevelClicked) {
	if(menuLevelClicked==5){
		return;
	};

	if(clickedLink != null){	
		var linkTo = clickedLink.attr("linkTo")
		// menuTitel = linkTo.toLowerCase().replace(/\b[a-z]/g, function(letter) {
  //   			return letter.toUpperCase(); 
  //   		});
		menuTitel = clickedLink.text();
	};

	if(menuLevelActive==1){
		$("#menuTitel").html("<h3>" + menuTitel + "</h3>" );
		$("#menuTitel > h3").prepend("<img src=\"../img/icons/icon_" + linkTo + ".png\" />");
		$("#menuTitel").fadeIn().delay(500);
	}

	// else if (menuLevelClicked<menuLevelActive){
	// 	for (var i = menuLevelClicked; i <= 6; i++) {
	// 		$('.bc_level_' + i ).remove();
	// 		console.log(" BC-Level Removed:   " + '.bc_level_' + (i))
	// 	};
	// 	$("#menuTitel").append('<span class="bc_level_' + menuLevelClicked + '">' + menuTitel + '</span>' );
	// }
	// else{
	// 	for (var i = menuLevelActive; i <= 6; i++) {
	// 		$('.bc_level_' + i ).remove();
	// 		console.log(" BC-Level Removed:   " + '.bc_level_' + (i))
	// 	};
	// 	$("#menuTitel").append('<span class="bc_level_' + menuLevelActive + '">' + menuTitel + '</span>' );
	// };
	}

});

function getKartenFarben (kartenName){
	var kartenFarben = [
		{name: 'entwicklung_bevoelkerung_jaehrliche_angaben', farben: ['#be3c14','#d88d53','#f2de91','#a6aba3','#384da6']},
		{name: 'entwicklung_volkszaehlungen', farben: ['#be3c14','#d88d53','#f2de91','#a6aba3','#384da6']},
		{name: 'stand_bevoelkerung_jaehrliche_angaben', farben: ['#f8f88d','#f56431','#94441e','#32230b']},
		{name: 'stand_volkszaehlungen', farben: ['#f8f88d','#f56431','#94441e','#32230b']},
		{name: 'bevoelkerungsdichte_aktuell', farben: ['#be3c14','#d6854c','#f9f2a1']},
		{name: 'dichte_volkszaehlungen', farben: ['#be3c14','#d6854c','#f9f2a1']},
		{name: 'bevoelkerungsverteilung', farben: ['#ffffdd','#f8e247','#ffaa13','#913806','#5b0000','#0b0b0b']}
		];

		// {name: 'entwicklung_bevoelkerung_jaehrliche_angaben', farben: [#be3c14,#d88d53,#f2de91,#a6aba3,#384da6]},
		// {name: 'entwicklung_volkszaehlungen', farben: [#be3c14,#d88d53,#f2de91,#a6aba3,#384da6]},
		// {name: 'stand_bevoelkerung_jaehrliche_angaben', farben: [#f8f88d,#f56431,#94441e,#32230b]},
		// {name: 'stand_volkszaehlungen', farben: [#be3c14,#d88d53,#f2de91,#a6aba3,#384da6]},
		// {name: 'bevoelkerungsdichte_aktuell', farben: [#be3c14,#d6854c,#f9f2a1]},
		// {name: 'dichte_volkszaehlungen', farben: [#be3c14,#d6854c,#f9f2a1]},
		// {name: 'bevoelkerungsverteilung', farben: [#ffffdd,#f8e247,#ffaa13,#913806,#5b0000,#0b0b0b]},
		// ];

// var kartenFarben = [
// 		{name: 'entwicklung_bevoelkerung_jaehrliche_angaben', farben: [be3c14,d88d53,f2de91,a6aba3,384da6]},
// 		{name: 'entwicklung_volkszaehlungen', farben: [be3c14,d88d53,f2de91,a6aba3,384da6]},
// 		{name: 'stand_bevoelkerung_jaehrliche_angaben', farben: [f8f88d,f56431,94441e,32230b]},
// 		{name: 'stand_volkszaehlungen', farben: [be3c14,d88d53,f2de91,a6aba3,384da6]},
// 		{name: 'bevoelkerungsdichte_aktuell', farben: [be3c14,d6854c,f9f2a1]},
// 		{name: 'dichte_volkszaehlungen', farben: [be3c14,d6854c,f9f2a1]},
// 		{name: 'bevoelkerungsverteilung', farben: [ffffdd,f8e247,ffaa13,913806,5b0000,0b0b0b]},
// 		];
	console.log("Kartenname: " +  kartenName);
	var result = _.where(kartenFarben, {name: kartenName});
	var aktuelleKartenFarben = result[0].farben;
	console.log(aktuelleKartenFarben);
	$(".kartenFarbe").css("height", (100/aktuelleKartenFarben.length) +"%");
	for (var i = 0; i <= aktuelleKartenFarben.length; i++) {
		$("#kartenFarben").append("<span class=\"kartenFarbe\" id=\"kartenFarbe" + i + "\"> </span>");
		$("#kartenFarbe" + i).css("background-color", aktuelleKartenFarben[i]);
	};

};

