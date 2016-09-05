// состояния домов
var flat = {};
flat = { fill: "#ffffff", stroke: "none", opacity: ".0" }
var coordsElem = '';
var areasArray = [];
var buildings = [];
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

$(document).ready(function () {
areasLen = $("#plan area").length;
one_area = $("#plan area");
// создаем svg-область с заданными размерами
var paper = Raphael("map", 660, 425);
var attr = {
fill: "#fff",
stroke: "none",
'opacity': 0,
cursor: "pointer"
};
// в цикле заносим в массив св-ва каждой area
for (var i = 0; i < areasLen; i++) {
areasArray.push(one_area.eq(i));
// разбиваем строку координат из area с занесением в массив для дальнейшей модификации
var coordsBuildingOneArea = areasArray[i].attr("coords").split(",");
// модифицируем строку координат для каждой path
var coordsBuildingModified = "";
var crdBuildArrLen = coordsBuildingOneArea.length;
for (var k = 0; k < crdBuildArrLen; k++) {
if (k == 1) {
coordsBuildingModified = coordsBuildingModified + coordsBuildingOneArea[k] + "L";
}
else {
coordsBuildingModified = coordsBuildingModified + coordsBuildingOneArea[k] + " ";
}
}
coordsBuildingModified = "M" + coordsBuildingModified + "z";

// создаем path для каждого строения
buildings[i] = paper.path(areasArray[i].attr("coords")).attr(attr);
if (areasArray[i].attr("class") == "flat") {
buildings[i].attr(flat)
}
}
var path = "#map path";
if ($.browser.msie)
path = "#map >div>.rvml";
// для одинакового показа индекса в ие и человеческих браузерах
$("#map defs").remove();
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
&& event.pageY < top + divToolTip.height() + 20)
return;
toolTipState = -1;
divToolTip.fadeOut();
});
$(path).mouseout(function () { toolTipState = 0; setTimeout(closeToolTip, 100); });
$(path).mousemove(function (e) {
	if (disableTooltip) return;
	var width = divToolTip.width();
	divToolTip.css("left", (e.pageX + width + 1 > w ? e.pageX - width - 1 : e.pageX - 80) + "px")
	divToolTip.css("top", e.pageY - 25 + "px");
})
$(path).mouseover(function (e) {
	  if (disableTooltip) return;
	  if (!(divToolTip.css("display") != "none" && toolTipState != 0)) {
	  toolTipState = -1;
	  ind = $(this).index();
	  var area = areasArray[ind - 1];
	  var data = null;
	  var content = '<p>' + area.attr("alt") + '<p>';
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
});


window.onload = function () {

$('path').eq(0).click( function(){
  $('#tip1').show();
});

$('path').eq(1).click( function(){
  $('#tip3').show();
});

$('path').eq(2).click( function(){
  $('#tip2').show();
});

$('path').eq(3).click( function(){
  $('#tip4').show();
});

}






