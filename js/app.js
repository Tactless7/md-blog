(function(){
	"use strict";
	var app = {
		article: null,
		init:function(){
			this.getFile();
		},
		getFile: function(){
			$.ajax({
				url: 'http://192.168.1.21:1337/alice.md',
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
			$.ajax({
				url: 'http://192.168.1.21:1337/menu.json',
				type: 'GET',
				success: function(data){
					console.log('success');
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
		transformMd: function(text){
			var converter = new showdown.Converter(),
			html = converter.makeHtml(text);
			return html;
		},
		displayAlice: function(html){
			$('#md').html(html);
		},
	};


	$(document).ready(function(){
		app.init();
	});
})();