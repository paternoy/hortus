window.CatalogueView = Backbone.View.extend({

    initialize: function () {
    	 var that = this;
        $.when(this.model.plants.fetch(),this.model.categories.fetch())
        .done(function () {
        	if(that.model.activeCategoryId!=null){
        		var categoryId = that.model.activeCategoryId;
        		that.model.plants = new PlantCollection(that.model.plants.filter(function (plant) {
    	    		var b = plant.get('categories').findWhere({'id':categoryId})!=null;
    	    	    return b;
    	    	}));
        	}
        	that.render();
        });
    },

    render: function () {
        $(this.el).html(this.template());
        this.renderCategories();
        this.renderItems();
// $(this.el).append(new Paginator({model: this.model, page:
// this.options.page}).render().el);
        return this;
    },
    
    renderCategories: function() {
    	var that = this;
    	if(this.model.activeCategoryId==null){
    		$('#category-menu li:first').addClass('active');
    	}
    	this.model.categories.each(function(category){
    		var categoryItem = $('<li><a href="#catalogue/category/'+category.get('id')+'">'+category.get('name')+'</a></li>');
    		$('#category-menu',that.el).append(categoryItem);
    		if(category.get('id')==that.model.activeCategoryId) {
    			categoryItem.addClass('active');
    		}
    	});
    },
    
    renderItems: function() {
    	var that = this;
    	this.model.plants.each(function(plant){
    		$('.thumbnails', this.el).append(new CatalogueItemView({model: plant}).render().el);
    	});
    }
    	
});

window.CatalogueItemView = Backbone.View.extend({

    tagName: "li",

    className: "catalogue-item col-md-4",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});