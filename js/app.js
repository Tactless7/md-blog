(function(){
	"use strict";
	var app = {
		menu: null,
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
				},
				error: function(){
					console.log('error JSON');
				},
				complete: function(){
					console.log('complete');
				}
			});
		},
		getFile: function(page){
			$.ajax({
				url: 'http://192.168.1.40:1337' + page,
				type: 'GET',
				success: function(data){
					console.log('success');
					this.article = data;
					app.display(app.transformMd(data));
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
		display: function(html){
			$('#md').html(html);
		},
		displayMenu: function(data){
			app.menu = data.menu;
			for(let i = 0; i < app.menu.length ; i++){
				$('#menu').append('<div class="ui column"><button id="btn'+i+'">' + app.menu[i].title +'</button></div>');
				$('#btn'+i+'').on('click', function(){
					app.getFile(app.menu[i].path);i 
				});
				console.log('listener ' + i);
			}
		}
	};


	$(document).ready(function(){
		app.init();
	});
})();