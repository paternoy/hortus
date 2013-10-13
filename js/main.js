var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "catalogue",
        "catalogue"         : "catalogue"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    catalogue: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var plantList = new PlantCollection();
        plantList.fetch({success: function(){
            $("#content").html(new CatalogueView({model: plantList, page: p}).el);
        }});
//        this.headerView.selectMenuItem('home-menu');
    },


});

utils.loadTemplate(['HeaderView','CatalogueView','CatalogueItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});