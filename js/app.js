(function(){
	"use strict";
	var app = {
		article: null,
		init:function(){
			this.getMenu();
		},
		getMenu: function(){
			$.ajax({
				url: 'http://192.168.1.40:1337/menu.json',
				type: 'GET',
				success: function(data){
					console.log('success');
					app.displayMenu(data);
					console.log(data.menu[0].title);
					console.log(data.menu[0].path);
				},
				error: function(){
					console.log('error JSON');
				},
				complete: function(){
					console.log('complete');
				}
			});
		},
		getAlice: function(){
			$.ajax({
				url: 'http://192.168.1.40:1337/alice.md',
				type: 'GET',
				success: function(data){
					console.log('success');
					this.article = data;
					app.displayAlice(app.transformMd(data));
				},
				error: function(){
					console.log('error');
				},
				complete: function(){
					console.log('complete');
				}
			});

		},
		transformMd: function(text){
			var converter = new showdown.Converter(),
			html = converter.makeHtml(text);
			return html;
		},
		displayAlice: function(html){
			$('#md').html(html);
		},
		displayMenu: function(data){
			for(var i = 0; i < data.menu.length ; i++){
				$('#menu').append('<a href="192.168.1.40:1337' + data.menu[i].path + '"><button>' + data.menu[i].title +'</button></a>');
			}
		}
	};


	$(document).ready(function(){
		app.init();
	});
})();