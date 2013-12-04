window.CatalogueView = Backbone.View.extend({

    initialize: function () {
    	 var _thisView = this;
        $.when(this.model.plants.fetch(),this.model.categories.fetch())
        .done(function () {
//        	if(this.model.activeCategoryId!=null){
//        		this.model.plants.byCategory(this.model.activeCategoryId);
        		
//        	}
//        	if(_thisView.model.activeCategoryId!=null){
//        		_thisView.model.plants.reset(_thisView.model.plants.byCategory(_thisView.model.activeCategoryId)); 
//        	}
          _thisView.render();
        });
    },

    render: function () {
//    	alert('render');
    	var plants = this.model.plants;
//    	if(plants==null){
//    		plants=[];
//    	}
    	if(this.model.activeCategoryId!=null){
    		var categoryId = this.model.activeCategoryId;
	    	plants = new PlantCollection(plants.filter(function (plant) {
	    		var b = plant.get('categories').findWhere({'id':categoryId})!=null;
	    	    return b;
	    	}));
    	}
//        var len = plants.length;
        
        var categories = this.model.categories.models;
//        var startPos = (this.options.page - 1) * 8;
//        var endPos = Math.min(startPos + 8, len);
        $(this.el).html(this.template());
        for (var i = 0; i < categories.length; i++) {
        	var active = categories[i].get('id')==this.model.activeCategoryId;
        	var activeClass='';
        	if(active) activeClass = 'active'
        	$('#category-menu', this.el).append('<li class="'+activeClass+'"><a href="#catalogue/category/'+categories[i].get('id')+'">'+categories[i].get('name')+'</a></li>');
        }
        
        plants.each(function(plant){
        	$('.thumbnails', this.el).append(new CatalogueItemView({model: plant}).render().el);
        });
//        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);
        return this;
    }
    	
});

window.CatalogueItemView = Backbone.View.extend({

    tagName: "li",

    className: "span4",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});