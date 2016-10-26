(function(){
	"use strict";
	var app = {
		menu: null,
		article: null,
		config: {},
		init:function(){
			this.config = window.appConfig;
			var self = this;
			$('#menu').on('click', 'a', function(event){
				event.preventDefault();
				self.getFile($(this).attr('href'));
				return false;
			});
			this.get('/menu.json', this.displayMenu.bind(this));
		},
		get: function(path, cb){
			$.ajax({
				url: this.config.url + path,
				type: 'GET',
				success: cb,
				error: function(){
					console.log('error JSON');
				}
			});
		},
		getFile: function(page){
			this.get(page, this.displayFile.bind(this));
		},
		displayFile: function(data){
			this.article = data;
			app.transformMd(data);
		},
		transformMd: function(text){
			var converter = new showdown.Converter();
			var html = converter.makeHtml(text);
			
			$('#md').html(html);
		},
		displayMenu: function(data){
			this.menu = data.menu;
			for(var i = 0; i < this.menu.length ; i++){
				$('#menu').append('<a href="' + this.menu[i].path +'">' + this.menu[i].title +'</a>');
				
			}
		}
	};


	$(document).ready(function(){
		app.init();
	});
})();
