$(document).ready(function($) {
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


			fasad.setViewBox(920, 25, 1000, 1000,true);
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

			fasad.image('../img/fasad.png', 0, 0, 2848, 836);	

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
					window.location.href = 'http://'+baseURL+'/project-floor1.html';
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

			// var divHfasad = $('#fasad').height();
			// var divWfasad = $('#fasad').width();

			// var fasad = new Raphael("fasad",divWfasad, divHfasad);


			// fasad.setViewBox(920, 25, 1000, 1000,true);
			// fasad.setSize(divWfasad, divHfasad);
			// fasad.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

			// $(window).resize(function() {

			// 	var divHfasad = $('#fasad').height();
			// 	var divWfasad = $('#fasad').width();

			// 	fasad.setSize(divWfasad, divHfasad);

			// });

			// var attrEtaj = {
			// 	fill: "#AB3F19",
			// 	stroke: 1,
			// 	'opacity': 0.1,
			// 	cursor: "pointer"
			// };

			// var attrEtajSelect = {
			// 	fill: "#AB3F19",
			// 	stroke: 1,
			// 	'opacity': 0.5,
			// 	cursor: "pointer"
			// };

			// fasad.image('../img/fasad.png', 0, 0, 2848, 836);

			// var etajNumGroup = {};

			// etajNumGroup.a = fasad.path("M29.56,655.6L2802.52 655.6 2802.52 536.08 29.56 536.08 29.56 655.6 z").attr(attrEtaj);
			// etajNumGroup.b = fasad.path("M29.56,534.56L2802.52 534.56 2802.52 390.44 29.56 390.44 29.56 534.56 z").attr(attrEtaj);
			// etajNumGroup.c = fasad.path("M29.56,388.56L2802.52 388.56 2802.52 287.44 29.56 287.44 29.56 388.56 z").attr(attrEtaj);
			// etajNumGroup.d = fasad.path("M2799.4,271.6l0.24-115.44l4.8-9.36   c0,0-90.96-24.72-163.68,0.48l3.12,8.88l-1.68,16.8h-405.6c0,0-7.2-13.2-7.92-32.88c0,0,2.52-13.48,7.92-17.28   c0,0-42.98-25.7-137.04,0l2.4,5.52l1.2,4.08l0.88,1.993h3.44l-0.48,7.367l-6.96,30.96l-1720.8,0.24c0,0-3.597-10.075-4.56-31.2   c0,0,0.56-12.66,7.44-18.96c0,0-68.98-24.2-136.8,0l1.92,3.12l0.48,2.4l0.48,3.36l1.32,2.713H253l-0.24,7.367l-6.96,31.2H29.56   v111.6h2769.599l13.921,0.773l5.52-1.253c0,0-0.24-3.6,4.32-6l2.4-2.4L2799.4,271.6z").attr(attrEtaj);


			// for (var key in etajNumGroup) {
			// 	etajNumGroup[key].mouseover(function () {
			// 		this.animate(attrEtajSelect, 100, "linear");
			// 	});

			// 	etajNumGroup[key].mouseout(function () {
			// 		this.animate(attrEtaj, 100, "linear");
			// 	});

			// 	etajNumGroup[key].click(function()  {
			// 		window.location.href = 'http://'+baseURL+'/project-floor1.html';
			// 	});
			// }




	}


	if($("#floor1").length>0) {

		/* Этажи */

		var divHfloor = $('#floor1').height() + 400 ;
		var divWfloor = $('#floor1').width();

		var areasLen = $("#map area").length;
		var one_area = $("#map area");

		var floor1 = new Raphael("floor1", divWfloor, divHfloor);

		floor1.setViewBox(250, 0, 430, 430, true);
		floor1.setSize(divWfloor, divHfloor);
		floor1.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

		$(window).resize(function () {

			var divHfloor = $('#floor1').height();
			var divWfloor = $('#floor1').width();

			floor1.setSize(divWfasad, divHfloor);

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

		floor1.image('../img/floor1.png', 0, 0, 903, 431);	

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
			flats[i] = floor1.path(areasArray[i].attr("coords")).attr(attrFlat);
				if (areasArray[i].attr("class") == "flat") {
					flats[i].attr(attrFlat)
				}
		}

		for (var key in flats) {
			flats[key].mouseover(function () {
				this.animate(attrFlatSelect, 100, "linear");
			});

			flats[key].mouseout(function () {
				this.animate(attrFlat, 100, "linear");
			});

			flats[0].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n1.html';
			});

			flats[1].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n2.html';
			});

			flats[2].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n10.html';
			});	

			flats[3].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n11.html';
			});

			flats[4].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n9.html';
			});

			flats[5].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n12.html';
			});	

			flats[6].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n14.html';
			});

			flats[7].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n13.html';
			});

			flats[8].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n33.html';
			});	

			flats[9].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n32.html';
			});	

			flats[10].click(function()  {
				window.location.href = 'http://'+baseURL+'/project-apart-n31.html';
			});												
		
		}	



		var path = "#floor1 path";

		// для одинакового показа индекса в ие и человеческих браузерах
		$("#floor1 defs").remove();
		$("body").append("<div class=\"toolTipFloorInfo\" id=\"divToolTip\"></div>")
		$("body").append("<div id=\"divPlans\"></div>")
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


		// var divHfloor = $('#floor1').height() + 400 ;
		// var divWfloor = $('#floor1').width();


		// var floor1 = new Raphael("floor1", divWfloor, divHfloor);


		// floor1.setViewBox(250, 0, 430, 430, true);
		// floor1.setSize(divWfloor, divHfloor);
		// floor1.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

		// $(window).resize(function () {

		// 	var divHfloor = $('#floor1').height();
		// 	var divWfloor = $('#floor1').width();

		// 	floor1.setSize(divWfasad, divHfloor);

		// });

		// var attrFlat = {
		// 	fill: "#AB3F19",
		// 	stroke: 1,
		// 	'opacity': 0.1,
		// 	cursor: "pointer"
		// };

		// var attrFlatSelect = {
		// 	fill: "#AB3F19",
		// 	stroke: 1,
		// 	'opacity': 0.5,
		// 	cursor: "pointer"
		// };

		// floor1.image('../img/floor1.png', 0, 0, 903, 431);

		// var etajFlatGroup = {};

		// etajFlatGroup.a = floor1.path("M24.833,170.5L53.833 228.5 57.333 228.5 70.333 228.5 70.333 235.667 165.333 235.667 165.333 176.333 126.333 176.333 95.083 137.667 24.833 170.5 z").attr(attrFlat);
		// etajFlatGroup.b = floor1.path("M70.333,307.5L165.333 307.5 165.333 236.667 70.333 236.667 70.333 307.5 z").attr(attrFlat);
		// etajFlatGroup.c = floor1.path("M167.833,307.5L167.833 176.333 221.667 176.333 221.667 232.667 275.667 232.667 275.667 307.5 167.833 307.5 z").attr(attrFlat);
		// etajFlatGroup.d = floor1.path("M222.833,176.333L387.083 176.333 387.083 233.75 222.833 233.75 222.833 176.333 z").attr(attrFlat);
		// etajFlatGroup.e = floor1.path("M276.833,249.25L276.833 307.5 388.583 307.5 388.583 249.25 276.833 249.25 z").attr(attrFlat);
		// etajFlatGroup.f = floor1.path("M428.583,176.333L428.583 233.75 538.833 233.75 538.833 176.333 428.583 176.333 z").attr(attrFlat);
		// etajFlatGroup.g = floor1.path("M428.583,249.667L428.583 307.083 538.833 307.083 538.833 249.667 428.583 249.667 z").attr(attrFlat);
		// etajFlatGroup.h = floor1.path("M540.333,176.333L594.333 176.333 594.333 307.083 540.333 307.083 540.333 176.333 z").attr(attrFlat);
		// etajFlatGroup.i = floor1.path("M595.833,176.333L595.833 307.083 696.833 307.083 696.833 230 646.333 230 646.333 176.333 595.833 176.333 z").attr(attrFlat);
		// etajFlatGroup.j = floor1.path("M698.333,249.333L698.333 307.083 853.333 305.667 873 267.667 802.667 131.333 748.333 160.333 763 188.667 750.667 210 770 221 754.667 249.333 698.333 249.333 z").attr(attrFlat);
		// etajFlatGroup.k = floor1.path("M801.333,128.667L742.667 13.667 653.667 60.333 651 71.167 648.333 73.333 700.333 178.667 705.667 180.333 801.333 128.667 z").attr(attrFlat);

		// for (var key in etajFlatGroup) {
		// 	etajFlatGroup[key].mouseover(function () {
		// 		this.animate(attrFlatSelect, 100, "linear");
		// 	});

		// 	etajFlatGroup[key].mouseout(function () {
		// 		this.animate(attrFlat, 100, "linear");
		// 	});

		// 	etajFlatGroup.a.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n1.html';
		// 	});

		// 	etajFlatGroup.b.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n2.html';
		// 	});

		// 	etajFlatGroup.c.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n10.html';
		// 	});	

		// 	etajFlatGroup.d.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n11.html';
		// 	});

		// 	etajFlatGroup.e.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n9.html';
		// 	});

		// 	etajFlatGroup.f.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n12.html';
		// 	});	

		// 	etajFlatGroup.g.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n14.html';
		// 	});

		// 	etajFlatGroup.h.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n13.html';
		// 	});

		// 	etajFlatGroup.i.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n33.html';
		// 	});	

		// 	etajFlatGroup.j.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n32.html';
		// 	});	

		// 	etajFlatGroup.k.click(function()  {
		// 		window.location.href = 'http://'+baseURL+'/project-apart-n31.html';
		// 	});												
		// }
	}

});
