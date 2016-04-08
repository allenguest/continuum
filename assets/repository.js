var Repository = {
  _data : null,
  _renderers : [],
  _activeRenderIndex : null,
  load : function(url, success, fail) {
    $.getJSON(url)
      .done(function(json) {
        Repository._data = json;
        success();
      })
      .fail(function( jqxhr, textStatus, error ) {
        fail( "Request Failed: [" + url + "] " + textStatus + ", " + error + ". Try checking JSON validity using http://jsonlint.com/");
      })
  },
  registerRenderer : function(id, renderer, title) {
	Repository._renderers.pushIfUnique({"id":id.toUpperCase(),"renderer":renderer,"title":title}, function(e) { return e.id === id.toUpperCase()});
  },
  render : function(id, canvas, fail) {
	Repository._activeRenderIndex = Repository._renderers.inArray(function(e) { return e.id === id.toUpperCase(); });
	if (Repository._activeRenderIndex >= 0) {
		Repository._renderers[Repository._activeRenderIndex].renderer.setSearchText($("#search").val());
		Repository._renderers[Repository._activeRenderIndex].renderer.render(canvas, Repository._data);
		Repository.setContainerTitle(Repository._renderers[Repository._activeRenderIndex].title);
		return;
	}
	fail("Unable to render. Renderer [" + id + "] not registered");
  },
   handleNavigationClick : function(id) {
	Repository.load("data/current_state.js", 
        function() { Repository.render(id, $(".container-fluid"), function(msg) { Repository.alert("#alertModal", "Error", msg); }); }, 
        function(msg) { Repository.alert("#alertModal", "Error", msg); });
    document.getElementsByClassName("nav-trigger")[0].checked = false;
  },
  handleSearchRequest : function(inputElement) {
	  Repository._renderers[Repository._activeRenderIndex].renderer.searchFor(inputElement.value);
  },
  setContainerTitle : function(title) {
	  $(".container-title").text(title);
  },
  alert : function(modalDialog, title, text) {
    $(modalDialog).find(".modal-title").text(title);
    $(modalDialog).find(".modal-body").text(text);
    var options = { "backdrop" : "true", "keyboard" : "true" };
    $(modalDialog).appendTo("body").modal(options);
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
