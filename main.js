var express = require('express'),
	app = express(),
	server;


var store = {
	index: {
		page: "home",
		title: "Проекты",
		content: "Проекты bla bla bla"
	},
	about: {
		page: "about",
		title: "О компании",
		content1: "Vesper – российская частная инвестиционная компания, специализирующаяся на инвестициях в проекты разной стадии готовности в премиальном сегменте жилой недвижимости, в том числе предполагающих реновацию исторических зданий.",
		content2: "Vesper была основана россиийскими бизнесменами Денисом Китаевым и Борисом Азаренко. Портфель компании оценивается в 60 млн. долл. и включает такие клубные объекты в Москве как St.Nickolas на Никольской улице, клубный дом «Булгаков» в районе Патриарших прудов, «Дом Гельриха» в Пречистенском переулке и др.",
		img: "img/vesper-map.jpg"
	},	
	partners: {
		page: "partners",
		title: "Партнеры",
		content1: "Для работы над проектами мы создаем международные команды, привлекая лучших специалистов. с нами работают ведущие российские и международные компании, привнося свой опыт и экспертизу в создание по истине эксклюзивных объектов недвижимости.",
		partnersList: ['John McAslan & Partners','Swanke Hayden Connell Architects (SHCA)', 'Цимайло Ляшенко и Партнеры','А-Б студия','ТПО Резерв','Генеральная Дирекция Центр','Группа компаний Спектрум','PSP-FARMAN Holding','ФОДД']
	},		
	video: {
		page: "video",
		title: "Видео",
		content1: "Видео - bla bla bla"
	},	
	contacts: {
		page: "contacts",
		title: "Контакты",
		content1: "Контакты - bla bla bla",
		img: "img/contact-map.jpg"
	}	
} 

var storeProject = {
	project: {
		page: "project",
		title: "О проекте",
		content1: "о Проекте bla bla bla"
	},
	gallery: {
		page: "gallery",
		title: "Галерея",
		content1: "Vesper – российская частная инвестиционная компания, специализирующаяся на инвестициях в проекты разной стадии готовности в премиальном сегменте жилой недвижимости, в том числе предполагающих реновацию исторических зданий.",
		content2: "Vesper была основана россиийскими бизнесменами Денисом Китаевым и Борисом Азаренко. Портфель компании оценивается в 60 млн. долл. и включает такие клубные объекты в Москве как St.Nickolas на Никольской улице, клубный дом «Булгаков» в районе Патриарших прудов, «Дом Гельриха» в Пречистенском переулке и др."
		
	},	
	place: {
		page: "place",
		title: "Местоположение",
		content1: "Для работы над проектами мы создаем международные команды, привлекая лучших специалистов. с нами работают ведущие российские и международные компании, привнося свой опыт и экспертизу в создание по истине эксклюзивных объектов недвижимости."
	},		
	arch: {
		page: "arch",
		title: "Архитектура",
		content1: "arch - bla bla bla"
	},	
	team: {
		page: "team",
		title: "Команда",
		content1: "team - bla bla bla"
	}	
} 


app.set('view engine', 'jade');

app.use(function(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

app.use(express.static(__dirname +'/public'));

app.get('/project', function (req, res) {
	var page = req.params.page, data;
	if (!page) page = 'project';
	data = storeProject[page];
	data.links = Object.keys(storeProject);
	res.render('project', data);
});

app.get('/index', function (req, res) {
	var page = req.params.page, data;
	if (!page) page = 'index';
	data = store[page];
	data.links = Object.keys(store);
	data.titles = Object.getOwnPropertyNames(store);

	function parseOb (obj) {

		if (obj['title']!==undefined)
		data.titles.push(obj['title']);

	    for (var key in obj) {
	        if (typeof(obj[key])=='object') {
	            parseOb(obj[key])
		    }
	    }
	 
	};

	data.titles = [];
	parseOb(store);

	menuObj = {}

	function addToObj (arr1,arr2) {
	 
	    for (i = 0; i < arr1.length; i++) {
	        menuObj[arr1[i]] = '';
	    }
	    for (i = 0; i < arr2.length; i++) {
	        menuObj[arr1[i]] = arr2[i];
	    }   

	}

	addToObj(data.titles,data.links);
	res.render('index', data);
});

app.get('/:page?', function (req, res) {
	var page = req.params.page, data;
	if (!page) page = 'page';
	data = store[page];
	if (!data) {
		res.redirect('/');
		return;
	}
	data.links = Object.keys(store);
	data.partnersList = store.partners.partnersList;
	console.log(data.partnersList);
	res.render('page', data);
});


server = app.listen (3000, function() {
	console.log('listen 3000');
});