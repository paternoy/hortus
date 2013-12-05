
window.Category = Backbone.AssociatedModel.extend({
 	urlRoot: "api2/categories",
    defaults: {
        id: null,
        name: ""
    }
});

window.CategoryCollection = Backbone.Collection.extend({
    model: Category,
    url: "api2/categories"
});

window.Plant = Backbone.AssociatedModel.extend({
	urlRoot: "api2/plants",
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
    url: "api2/plants"
});

