window.Category = Backbone.AssociatedModel.extend({
 	urlRoot: configurationProperties.apiRoot+"/categories",
    defaults: {
        id: null,
        name: ""
    }
});

window.CategoryCollection = Backbone.Collection.extend({
    model: Category,
    url: configurationProperties.apiRoot+"/categories"
});

window.Plant = Backbone.AssociatedModel.extend({
	urlRoot: configurationProperties.apiRoot+"/plants",
    defaults: {
        id: null,
        name: "",
        species: "",
        description: "",
        picture: "img/thumbnails/empty.jpg",
        categories:null
    },
	relations: [{
		type: Backbone.Many,
		key: 'categories',
		relatedModel: 'Category'
	}]
});

window.PlantCollection = Backbone.Collection.extend({
    model: Plant,
    url: configurationProperties.apiRoot+"/plants"
});

