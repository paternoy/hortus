window.Plant = Backbone.Model.extend({

    urlRoot: "api/plants",

    defaults: {
        idPlant: null,
        name: "",
        species: "",
        description: "",
        picture: "img/thumbnails/empty.jpg"
    }
});

window.PlantCollection = Backbone.Collection.extend({

    model: Plant,

    url: "api/plants"

});

window.Category = Backbone.Model.extend({

    urlRoot: "api/categories",

    defaults: {
        id: null,
        name: ""
    }
});

window.CategoryCollection = Backbone.Collection.extend({

    model: Category,

    url: "api/categories"

});