var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "catalogue",
        "catalogue"         : "catalogue",
        "catalogue/cat/:category": "catalogue",
        "catalogue/:id"     : "details"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    catalogue: function(category,page) {
    	alert(category);
        var p = page ? parseInt(page, 10) : 1;
        var plantList = new PlantCollection();
        plantList.fetch({success: function(){
            $("#content").html(new CatalogueView({model: plantList, page: p}).el);
        }});
//        this.headerView.selectMenuItem('home-menu');
    },
    
    details: function (id) {
        var plant = new Plant({id: id});
        plant.fetch({success: function(model, response){
            $("#content").html(new DetailsView({model: model}).el);
        }});
//        this.headerView.selectMenuItem();
    }


});

utils.loadTemplate(['HeaderView','CatalogueView','CatalogueItemView','DetailsView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});