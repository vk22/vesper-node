$(document).ready(function($) {
	
	// $('body').height($(window).height());

	$("#gallery-no-thumb").royalSlider({
		keyboardNavEnabled: true,
		imageScaleMode: 'fill',
		globalCaption:true,
		loop: true,
		arrowsNavAutoHide: false
	});
	$('#gallery-thumbs').royalSlider({
		controlNavigation: 'thumbnails',
		keyboardNavEnabled: true,
		imageScaleMode: 'fill',
		globalCaption:true,
		loop: true,
		arrowsNavAutoHide: false,
		thumbs: {
			appendSpan: true,
			firstMargin: true,
			paddingBottom: 4
		}
	});
	$(function()
	{
		$('.scroll-pane').jScrollPane();
	});

	$('.btn-navbar-toggle').click(function () {
		if ($('.left-col').hasClass('hidden')) {
			$('.left-col').css("left","0px");
			$('.left-col').removeClass('hidden');
			$('.left-col').addClass('show');
		} else {
			$('.left-col').css("left","-195px");
			$('.left-col').removeClass('show');
			$('.left-col').addClass('hidden');
		}
	});
	// scroll body to 0px on click
	$('.btn-navbar-toggle').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});


var flat = {};
flat = { fill: "#ffffff", stroke: "none", opacity: ".0" }
var coordsElem = '';
var areasArray = [];
var flats = [];
var fasadGroup = [];
var houseNum = null;
var houseType = null;
var houseSquareH = null;
var houseSquareA = null;
var housePlan = null;
var houseToReserve = null;
var houseSold = null;
var houseReserved = null;
var houseM2 = null;
var houseAr = null;
var closeText = null;
var otherFloor = null;
var disableTooltip = false;

$(function(){

	var baseURL = document.location.href.split("/")[2];

	if($("#fasad").length>0) {

			/* Фасад */


			var divHfloor = $('#fasad').height();
			var divWfloor = $('#fasad').width();

			var areasLen = $("#map area").length;
			var one_area = $("#map area");

			var fasad = new Raphael("fasad", divWfloor, divHfloor);


			fasad.setViewBox(255, -25, 1200, 1200,true);
			fasad.setSize(divWfloor, divHfloor);
			fasad.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

			$(window).resize(function () {

				var divHfloor = $('#fasad').height();
				var divWfloor = $('#fasad').width();

				fasad.setSize(divWfloor, divHfloor);

			});

			var attrFlat = {
				fill: "#AB3F19",
				stroke: 1,
				'opacity': 0.1,
				cursor: "pointer"
			};

			var attrFlatSelect = {
				fill: "#AB3F19",
				stroke: 1,
				'opacity': 0.5,
				cursor: "pointer"
			};

			fasad.image('../img/fasad_new.jpg', 0, 0, 1706, 1071);	

			// в цикле заносим в массив св-ва каждой area
			for (var i = 0; i < areasLen; i++) {
				areasArray.push(one_area.eq(i));
				
				// разбиваем строку координат из area с занесением в массив для дальнейшей модификации
				var coordsFlatOneArea = areasArray[i].attr("coords").split(",");
				
				// модифицируем строку координат для каждой path
				var coordsFlatModified = "";
				var crdBuildArrLen = coordsFlatOneArea.length;
					
				for (var k = 0; k < crdBuildArrLen; k++) {
					if (k == 1) {
							coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + "L";
						}
						else {
							coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + " ";
						}
				}

				coordsFlatModified = "M" + coordsFlatModified + "z";

				// создаем path для каждого строения
				fasadGroup[i] = fasad.path(areasArray[i].attr("coords")).attr(attrFlat);
					if (areasArray[i].attr("class") == "flat") {
						fasad[i].attr(attrFlat)
					}
			}

			for (var key in fasadGroup) {
				fasadGroup[key].mouseover(function () {
					this.animate(attrFlatSelect, 100, "linear");
				});

				fasadGroup[key].mouseout(function () {
					this.animate(attrFlat, 100, "linear");
				});

				fasadGroup[0].click(function()  {
					window.location.href = 'http://'+baseURL+'/project-floor2.html';
			 	});

			 	fasadGroup[1].click(function()  {
					window.location.href = 'http://'+baseURL+'/project-floor3.html';
			 	});

			 	fasadGroup[2].click(function()  {
					window.location.href = 'http://'+baseURL+'/project-floor4.html';
			 	});


			 	fasadGroup[3].click(function()  {
					window.location.href = 'http://'+baseURL+'/project-floor5.html';
			 	});			 	
			 	
			}	



			var path = "#fasad path";

			// для одинакового показа индекса в ие и человеческих браузерах
			$("#fasad defs").remove();
			$("body").append("<div class=\"toolTipFloorInfo onFasad\" id=\"divToolTip\"></div>")

			var divToolTip = $("#divToolTip");
			var toolTipState = -1;
			var w = $(window).width();
			divToolTip.mouseover(function () {
			toolTipState = 1;
			});
			divToolTip.mouseout(function (event) {
			var left = parseInt(divToolTip.css("left"));
			var top = parseInt(divToolTip.css("top"));
			if (event.pageX > left
			&& event.pageX < left + divToolTip.width()
			&& event.pageY > top
			&& event.pageY < top + divToolTip.height() + 0)
			return;
			toolTipState = -1;
			divToolTip.fadeOut();
			});
			$(path).mouseout(function () { toolTipState = 0; setTimeout(closeToolTip, 100); });
			$(path).mousemove(function (e) {
				if (disableTooltip) return;
				var width = divToolTip.width();
				divToolTip.css("left", (e.pageX + width + 1 > w ? e.pageX - width - 1 : e.pageX - 75) + "px")
				divToolTip.css("top", e.pageY - 100 + "px");
			})
			$(path).mouseover(function (e) {
				  if (disableTooltip) return;
				  if (!(divToolTip.css("display") != "none" && toolTipState != 0)) {
				  toolTipState = -1;
				  ind = $(this).index();
				  var area = areasArray[ind - 2];
				  var data = null;
				  var content = area.attr("alt");
				  divToolTip.html(content);
				  divToolTip.fadeIn();
				  }
			});
			function closeToolTip() {
				  if (toolTipState != 0)
				  return;
				  toolTipState = -1;
				  divToolTip.fadeOut();
			}

	}


	if($("#floor2").length>0) {

		/* Этажи */

		var divHfloor = $('#floor2').height() + 400 ;
		var divWfloor = $('#floor2').width();

		var areasLen = $("#map area").length;
		var one_area = $("#map area");

		var floorMap = new Raphael("floor2", divWfloor, divHfloor);

		floorMap.setViewBox(250, 0, 430, 430, true);
		floorMap.setSize(divWfloor, divHfloor);
		floorMap.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

		$(window).resize(function () {

			var divHfloor = $('#floor2').height();
			var divWfloor = $('#floor2').width();

			floorMap.setSize(divWfloor, divHfloor);

		});

		var attrFlat = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "pointer"
		};

		var attrFlatSelect = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.5,
			cursor: "pointer"
		};

		var attrFlatSold = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "default"
		};		

		floorMap.image('../img/floor2.png', 0, 0, 903, 431);	

		// в цикле заносим в массив св-ва каждой area
		for (var i = 0; i < areasLen; i++) {
			areasArray.push(one_area.eq(i));
			
			// разбиваем строку координат из area с занесением в массив для дальнейшей модификации
			var coordsFlatOneArea = areasArray[i].attr("coords").split(",");
			
			// модифицируем строку координат для каждой path
			var coordsFlatModified = "";
			var crdBuildArrLen = coordsFlatOneArea.length;
				
			for (var k = 0; k < crdBuildArrLen; k++) {
				if (k == 1) {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + "L";
					}
					else {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + " ";
					}
			}

			coordsFlatModified = "M" + coordsFlatModified + "z";

			// создаем path для каждого строения
			flats[i] = floorMap.path(areasArray[i].attr("coords")).attr(attrFlat);
				if (areasArray[i].attr("class") == "free") {
					flats[i].attr(attrFlat);

				}

				if (areasArray[i].attr("class") == "sold") {
					flats[i].attr(attrFlatSold);
				}
		}

		for (var key in flats) {
			flats[key].mouseover(function () {
				this.animate(attrFlatSelect, 100, "linear");
			});

			flats[key].mouseout(function () {
				this.animate(attrFlat, 100, "linear");
			});

			
			flats[9].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n32.html';
			});	


		}	



		var path = "#floor2 path";

		// для одинакового показа индекса в ие и человеческих браузерах
		$("#floor2 defs").remove();
		$("body").append("<div class=\"toolTipFloorInfo\" id=\"divToolTip\"></div>")

		var divToolTip = $("#divToolTip");
		var toolTipState = -1;
		var w = $(window).width();
		divToolTip.mouseover(function () {
		toolTipState = 1;
		});
		divToolTip.mouseout(function (event) {
		var left = parseInt(divToolTip.css("left"));
		var top = parseInt(divToolTip.css("top"));
		if (event.pageX > left
		&& event.pageX < left + divToolTip.width()
		&& event.pageY > top
		&& event.pageY < top + divToolTip.height() + 0)
		return;
		toolTipState = -1;
		divToolTip.fadeOut();
		});
		$(path).mouseout(function () { toolTipState = 0; setTimeout(closeToolTip, 100); });
		$(path).mousemove(function (e) {
			if (disableTooltip) return;
			var width = divToolTip.width();
			divToolTip.css("left", (e.pageX + width + 1 > w ? e.pageX - width - 1 : e.pageX - 75) + "px")
			divToolTip.css("top", e.pageY - 100 + "px");
		})
		$(path).mouseover(function (e) {
			  if (disableTooltip) return;
			  if (!(divToolTip.css("display") != "none" && toolTipState != 0)) {
			  toolTipState = -1;
			  ind = $(this).index();
			  var area = areasArray[ind - 2];
			  var data = null;
			  var content = area.attr("alt");
			  divToolTip.html(content);
			  divToolTip.fadeIn();
			  }
		});
		function closeToolTip() {
			  if (toolTipState != 0)
			  return;
			  toolTipState = -1;
			  divToolTip.fadeOut();
		}


	}

	if($("#floor3").length>0) {

		/* Этажи */

		var divHfloor = $('#floor3').height() + 400 ;
		var divWfloor = $('#floor3').width();

		var areasLen = $("#map area").length;
		var one_area = $("#map area");

		var floorMap = new Raphael("floor3", divWfloor, divHfloor);

		floorMap.setViewBox(250, 0, 430, 430, true);
		floorMap.setSize(divWfloor, divHfloor);
		floorMap.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

		$(window).resize(function () {

			var divHfloor = $('#floor3').height();
			var divWfloor = $('#floor3').width();

			floorMap.setSize(divWfloor, divHfloor);

		});

		var attrFlat = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "pointer"
		};

		var attrFlatSelect = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.5,
			cursor: "pointer"
		};

		var attrFlatSold = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "default"
		};

		 var flatText = {
	          'opacity': 1,
	          cursor: "pointer",
	          fill: "#fff",
	          'z-index': 99
	        }           


		floorMap.image('../img/floor3.png', 0, 0, 903, 431);	

		// в цикле заносим в массив св-ва каждой area
		for (var i = 0; i < areasLen; i++) {
			areasArray.push(one_area.eq(i));
			
			// разбиваем строку координат из area с занесением в массив для дальнейшей модификации
			var coordsFlatOneArea = areasArray[i].attr("coords").split(",");
			
			// модифицируем строку координат для каждой path
			var coordsFlatModified = "";
			var crdBuildArrLen = coordsFlatOneArea.length;
				
			for (var k = 0; k < crdBuildArrLen; k++) {
				if (k == 1) {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + "L";
					}
					else {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + " ";
					}
			}

			coordsFlatModified = "M" + coordsFlatModified + "z";

			// создаем path для каждого строения
			flats[i] = floorMap.path(areasArray[i].attr("coords")).attr(attrFlat);
				
				if (areasArray[i].attr("class") == "free") {
					flats[i].attr(attrFlat);

				}

				if (areasArray[i].attr("class") == "sold") {
					flats[i].attr(attrFlatSold);
				}

				// if (areasArray[i].attr("class") == "sold") {
                       
				// 	flats[i] = floor1.text(data.textcoor1,data.textcoor2,'продано').attr("font","18px 'Arial'").attr(flatText);
    
    //             }
		}

		for (var key in flats) {

			flats[key].mouseover(function () {
				this.animate(attrFlatSelect, 100, "linear");
			});

			flats[key].mouseout(function () {
				this.animate(attrFlat, 100, "linear");
			});

			flats[0].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n3.html';
			});								
		
		}	



		var path = "#floor3 path";

		// для одинакового показа индекса в ие и человеческих браузерах
		$("#floor3 defs").remove();
		$("body").append("<div class=\"toolTipFloorInfo\" id=\"divToolTip\"></div>")

		var divToolTip = $("#divToolTip");
		var toolTipState = -1;
		var w = $(window).width();
		divToolTip.mouseover(function () {
		toolTipState = 1;
		});
		divToolTip.mouseout(function (event) {
		var left = parseInt(divToolTip.css("left"));
		var top = parseInt(divToolTip.css("top"));
		if (event.pageX > left
		&& event.pageX < left + divToolTip.width()
		&& event.pageY > top
		&& event.pageY < top + divToolTip.height() + 0)
		return;
		toolTipState = -1;
		divToolTip.fadeOut();
		});
		$(path).mouseout(function () { toolTipState = 0; setTimeout(closeToolTip, 100); });
		$(path).mousemove(function (e) {
			if (disableTooltip) return;
			var width = divToolTip.width();
			divToolTip.css("left", (e.pageX + width + 1 > w ? e.pageX - width - 1 : e.pageX - 75) + "px")
			divToolTip.css("top", e.pageY - 100 + "px");
		})
		$(path).mouseover(function (e) {
			  if (disableTooltip) return;
			  if (!(divToolTip.css("display") != "none" && toolTipState != 0)) {
			  toolTipState = -1;
			  ind = $(this).index();
			  var area = areasArray[ind - 2];
			  var data = null;
			  var content = area.attr("alt");
			  divToolTip.html(content);
			  divToolTip.fadeIn();
			  }
		});
		function closeToolTip() {
			  if (toolTipState != 0)
			  return;
			  toolTipState = -1;
			  divToolTip.fadeOut();
		}


	}


	if($("#floor4").length>0) {

		/* Этажи */

		var divHfloor = $('#floor4').height() + 400 ;
		var divWfloor = $('#floor4').width();

		var areasLen = $("#map area").length;
		var one_area = $("#map area");

		var floorMap = new Raphael("floor4", divWfloor, divHfloor);

		floorMap.setViewBox(250, 0, 430, 430, true);
		floorMap.setSize(divWfloor, divHfloor);
		floorMap.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

		$(window).resize(function () {

			var divHfloor = $('#floor4').height();
			var divWfloor = $('#floor4').width();

			floorMap.setSize(divWfloor, divHfloor);

		});

		var attrFlat = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "pointer"
		};

		var attrFlatSelect = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.5,
			cursor: "pointer"
		};

		var attrFlatSold = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "default"
		};

		 var flatText = {
	          'opacity': 1,
	          cursor: "pointer",
	          fill: "#fff",
	          'z-index': 99
	        }           


		floorMap.image('../img/floor4.png', 0, 0, 903, 431);	

		// в цикле заносим в массив св-ва каждой area
		for (var i = 0; i < areasLen; i++) {
			areasArray.push(one_area.eq(i));
			
			// разбиваем строку координат из area с занесением в массив для дальнейшей модификации
			var coordsFlatOneArea = areasArray[i].attr("coords").split(",");
			
			// модифицируем строку координат для каждой path
			var coordsFlatModified = "";
			var crdBuildArrLen = coordsFlatOneArea.length;
				
			for (var k = 0; k < crdBuildArrLen; k++) {
				if (k == 1) {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + "L";
					}
					else {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + " ";
					}
			}

			coordsFlatModified = "M" + coordsFlatModified + "z";

			// создаем path для каждого строения
			flats[i] = floorMap.path(areasArray[i].attr("coords")).attr(attrFlat);
				
				if (areasArray[i].attr("class") == "free") {
					flats[i].attr(attrFlat);

				}

				if (areasArray[i].attr("class") == "sold") {
					flats[i].attr(attrFlatSold);
				}

				// if (areasArray[i].attr("class") == "sold") {
                       
				// 	flats[i] = floor1.text(data.textcoor1,data.textcoor2,'продано').attr("font","18px 'Arial'").attr(flatText);
    
    //             }
		}

		for (var key in flats) {

			flats[key].mouseover(function () {
				this.animate(attrFlatSelect, 100, "linear");
			});

			flats[key].mouseout(function () {
				this.animate(attrFlat, 100, "linear");
			});

			flats[0].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n5.html';
			});								
		
		}	



		var path = "#floor4 path";

		// для одинакового показа индекса в ие и человеческих браузерах
		$("#floor4 defs").remove();
		$("body").append("<div class=\"toolTipFloorInfo\" id=\"divToolTip\"></div>")

		var divToolTip = $("#divToolTip");
		var toolTipState = -1;
		var w = $(window).width();
		divToolTip.mouseover(function () {
		toolTipState = 1;
		});
		divToolTip.mouseout(function (event) {
		var left = parseInt(divToolTip.css("left"));
		var top = parseInt(divToolTip.css("top"));
		if (event.pageX > left
		&& event.pageX < left + divToolTip.width()
		&& event.pageY > top
		&& event.pageY < top + divToolTip.height() + 0)
		return;
		toolTipState = -1;
		divToolTip.fadeOut();
		});
		$(path).mouseout(function () { toolTipState = 0; setTimeout(closeToolTip, 100); });
		$(path).mousemove(function (e) {
			if (disableTooltip) return;
			var width = divToolTip.width();
			divToolTip.css("left", (e.pageX + width + 1 > w ? e.pageX - width - 1 : e.pageX - 75) + "px")
			divToolTip.css("top", e.pageY - 100 + "px");
		})
		$(path).mouseover(function (e) {
			  if (disableTooltip) return;
			  if (!(divToolTip.css("display") != "none" && toolTipState != 0)) {
			  toolTipState = -1;
			  ind = $(this).index();
			  var area = areasArray[ind - 2];
			  var data = null;
			  var content = area.attr("alt");
			  divToolTip.html(content);
			  divToolTip.fadeIn();
			  }
		});
		function closeToolTip() {
			  if (toolTipState != 0)
			  return;
			  toolTipState = -1;
			  divToolTip.fadeOut();
		}


	}


		if($("#floor5").length>0) {

		/* Этажи */

		var divHfloor = $('#floor5').height() + 400 ;
		var divWfloor = $('#floor5').width();

		var areasLen = $("#map area").length;
		var one_area = $("#map area");

		var floorMap = new Raphael("floor5", divWfloor, divHfloor);

		floorMap.setViewBox(250, 0, 430, 430, true);
		floorMap.setSize(divWfloor, divHfloor);
		floorMap.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

		$(window).resize(function () {

			var divHfloor = $('#floor5').height();
			var divWfloor = $('#floor5').width();

			floorMap.setSize(divWfloor, divHfloor);

		});

		var attrFlat = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "pointer"
		};

		var attrFlatSelect = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.5,
			cursor: "pointer"
		};

		var attrFlatSold = {
			fill: "#AB3F19",
			stroke: 1,
			'opacity': 0.1,
			cursor: "default"
		};

		 var flatText = {
	          'opacity': 1,
	          cursor: "pointer",
	          fill: "#fff",
	          'z-index': 99
	        }           


		floorMap.image('../img/floor5.png', 0, 0, 903, 431);	

		// в цикле заносим в массив св-ва каждой area
		for (var i = 0; i < areasLen; i++) {
			areasArray.push(one_area.eq(i));
			
			// разбиваем строку координат из area с занесением в массив для дальнейшей модификации
			var coordsFlatOneArea = areasArray[i].attr("coords").split(",");
			
			// модифицируем строку координат для каждой path
			var coordsFlatModified = "";
			var crdBuildArrLen = coordsFlatOneArea.length;
				
			for (var k = 0; k < crdBuildArrLen; k++) {
				if (k == 1) {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + "L";
					}
					else {
						coordsFlatModified = coordsFlatModified + coordsFlatOneArea[k] + " ";
					}
			}

			coordsFlatModified = "M" + coordsFlatModified + "z";

			// создаем path для каждого строения
			flats[i] = floorMap.path(areasArray[i].attr("coords")).attr(attrFlat);
				
				if (areasArray[i].attr("class") == "free") {
					flats[i].attr(attrFlat);

				}

				if (areasArray[i].attr("class") == "sold") {
					flats[i].attr(attrFlatSold);
				}

				// if (areasArray[i].attr("class") == "sold") {
                       
				// 	flats[i] = floor1.text(data.textcoor1,data.textcoor2,'продано').attr("font","18px 'Arial'").attr(flatText);
    
    //             }
		}

		for (var key in flats) {

			flats[key].mouseover(function () {
				this.animate(attrFlatSelect, 100, "linear");
			});

			flats[key].mouseout(function () {
				this.animate(attrFlat, 100, "linear");
			});

			flats[2].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n27.html';
			});		

			flats[3].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n28.html';
			});	

			flats[5].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n29.html';
			});		

			flats[8].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n40.html';
			});	

			flats[9].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n39.html';
			});													
		
		}	



		var path = "#floor5 path";

		// для одинакового показа индекса в ие и человеческих браузерах
		$("#floor5 defs").remove();
		$("body").append("<div class=\"toolTipFloorInfo\" id=\"divToolTip\"></div>")

		var divToolTip = $("#divToolTip");
		var toolTipState = -1;
		var w = $(window).width();
		divToolTip.mouseover(function () {
		toolTipState = 1;
		});
		divToolTip.mouseout(function (event) {
		var left = parseInt(divToolTip.css("left"));
		var top = parseInt(divToolTip.css("top"));
		if (event.pageX > left
		&& event.pageX < left + divToolTip.width()
		&& event.pageY > top
		&& event.pageY < top + divToolTip.height() + 0)
		return;
		toolTipState = -1;
		divToolTip.fadeOut();
		});
		$(path).mouseout(function () { toolTipState = 0; setTimeout(closeToolTip, 100); });
		$(path).mousemove(function (e) {
			if (disableTooltip) return;
			var width = divToolTip.width();
			divToolTip.css("left", (e.pageX + width + 1 > w ? e.pageX - width - 1 : e.pageX - 75) + "px")
			divToolTip.css("top", e.pageY - 100 + "px");
		})
		$(path).mouseover(function (e) {
			  if (disableTooltip) return;
			  if (!(divToolTip.css("display") != "none" && toolTipState != 0)) {
			  toolTipState = -1;
			  ind = $(this).index();
			  var area = areasArray[ind - 2];
			  var data = null;
			  var content = area.attr("alt");
			  divToolTip.html(content);
			  divToolTip.fadeIn();
			  }
		});
		function closeToolTip() {
			  if (toolTipState != 0)
			  return;
			  toolTipState = -1;
			  divToolTip.fadeOut();
		}


	}

});
