app.Plant = Backbone.Model.extend({

    urlRoot: "api/plants",

    defaults: {
        idPlant: null,
        name: "",
        species: "",
        description: "",
        picture: "img/thumbnails/empty.jpg"
    }
});

app.PlantCollection = Backbone.Collection.extend({

    model: app.Plant,

    url: "api/plants"

});