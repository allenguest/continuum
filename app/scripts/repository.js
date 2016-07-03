var Repository = {
	_prodData : [],
	_data : null,
	_selectedRepository : null,
	_productionRepository : null,
	_renderers : [],
	_activeRenderIndex : null,
	load : function(url, success, fail) {
		$.getJSON(url)
			.done(function(json) {
			success(json);
		})
		.fail(function( jqxhr, textStatus, error ) {
			fail( 'Request Failed: [' + url + '] ' + textStatus + ', ' + error + '. Try checking JSON validity using http://jsonlint.com/');
		})
	},
	registerRenderer : function(id, renderer, title) {
		Repository._renderers.pushIfUnique({'id':id.toUpperCase(),'renderer':renderer,'title':title}, function(e) { return e.id === id.toUpperCase()});
	},
	initialize : function(selRepositories, repositories, id) {
		$(selRepositories).empty();
		for (var i=0;i<repositories.length;i++) {
			if (repositories[i].isProduction && 1 === repositories[i].isProduction) Repository._productionRepository = repositories[i];
			$(selRepositories).append('<option value=\'' + repositories[i].path + '\'>' + repositories[i].description + '</option>');
		}
		
		Repository._selectedRepository = repositories[0].path;
		Repository._activeRenderer = id;
		Repository.refresh();
	},
	refresh : function() {
		Repository._data = new Object();
		Repository._data.components = [];
		Repository.load(Repository._selectedRepository + '?uuid=' + Repository.generateUUID(),
			function(json) { 
				if (Repository._productionRepository.path != Repository._selectedRepository)
				{
					// load the production one and perform a delta between that result and json
					Repository.load(Repository._productionRepository.path + '?uuid=' + Repository.generateUUID(),
						function(jsonProd) {
							for (var i=0;i<json.components.length;i++) {
								var component = json.components[i];
								if (jsonProd.components.inArray(function(e) { 
									return JSON.stringify(e) === JSON.stringify(component); 
								})) {
									var index = Repository._data.components ? index = Repository._data.components.length : 0;
									Repository._data.components[index] = component;
								}
							}
							Repository.render(Repository._activeRenderer, $('.container-fluid'), function(msg) { Repository.alert('#alertModal', 'Error', msg); }); 
						},
						function(msg) { Repository.alert('#alertModal', 'Error', msg); });
					
				} else {
					Repository._data = json;
					Repository.render(Repository._activeRenderer, $('.container-fluid'), function(msg) { Repository.alert('#alertModal', 'Error', msg); }); 
				}
			}, 
			function(msg) { Repository.alert('#alertModal', 'Error', msg); });
	},
	render : function(id, canvas, fail) {
		Repository._activeRenderIndex = Repository._renderers.inArray(function(e) { return e.id === id.toUpperCase(); });
		if (Repository._activeRenderIndex >= 0) {
			Repository._activeRenderer = id;
			Repository._renderers[Repository._activeRenderIndex].renderer.setSearchText($('#search').val());
			Repository._renderers[Repository._activeRenderIndex].renderer.render(canvas, Repository._data);
			Repository.setContainerTitle(Repository._renderers[Repository._activeRenderIndex].title);
			return;
		}
		fail('Unable to render. Renderer [' + id + '] not registered');
	},
	handleRepositoryClick : function(inputElement) {
		Repository._selectedRepository = $(inputElement).val();
		Repository.refresh();
	},
	handleNavigationClick : function(renderer) {
		Repository._activeRenderer = renderer;
		Repository.refresh();
		document.getElementsByClassName('nav-trigger')[0].checked = false;
	},
	handleSearchRequest : function(inputElement) {
		Repository._renderers[Repository._activeRenderIndex].renderer.searchFor(inputElement.value);
	},
	getSelectedRepositoryPath : function() {
		return Repository._selectedRepository;
	},
	setContainerTitle : function(title) {
		$('.container-title').text(title);
	},
	alert : function(modalDialog, title, text) {
		$(modalDialog).find('.modal-title').text(title);
		$(modalDialog).find('.modal-body').text(text);
		var options = { 'backdrop' : 'true', 'keyboard' : 'true' };
		$(modalDialog).appendTo('body').modal(options);
	},
	generateUUID : function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
}

Array.prototype.inArray = function(comparer) {
	for (var i=0; i < this.length; i++) {
		if (comparer(this[i])) return i;
	}
	return -1;
}

Array.prototype.pushIfUnique = function(element, comparer) {
	if (this.inArray(comparer) < 0) this.push(element);
}

String.prototype.indexOfInsensitive = function (s, b) {
    return this.toLowerCase().indexOf(s.toLowerCase(), b);
}
