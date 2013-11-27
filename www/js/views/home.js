app.HomeView = Backbone.View.extend( {
	render : function(eventName) {
		$(this.el).html(this.template());
		return this;
	}
});