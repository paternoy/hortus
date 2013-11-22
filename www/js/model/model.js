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