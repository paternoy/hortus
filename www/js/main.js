var app = {

	views : {},

	models : {},
	
	content : function() {
		return $("#content");
	},
	
	loggedIn : function() {
		return !($.cookie('userId') === null || $.cookie('userId') === undefined);
	}
};

app.Router = Backbone.Router.extend({

    routes: {
        ""                  : "catalogue",
        "catalogue"         : "catalogue",
        "catalogue/:id"     : "details"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    catalogue: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var plantList = new PlantCollection();
        plantList.fetch({success: function(){
            app.content().html(new CatalogueView({model: plantList, page: p}).el);
        }});
//        this.headerView.selectMenuItem('home-menu');
    },
    
    details: function (id) {
        var plant = new Plant({id: id});
        plant.fetch({success: function(model, response){
        	app.content().html(new DetailsView({model: model}).el);
        }});
//        this.headerView.selectMenuItem();
    }

});

$(document).ready(
		function() {
			utils.loadTemplates(['HeaderView','CatalogueView','CatalogueItemView','DetailsView'], function() {
				app.router = new app.Router();
				Backbone.history.start();
			});

			// Tell jQuery to watch for any 401 or 403 errors and handle them
			// appropriately
			$.ajaxSetup( {
				statusCode : {
					401 : function() {
						// Redirect the to the login page.
						app.router.navigate('sign-in', {
							trigger : true
						});
					},
					403 : function() {
						// 403 -- Access denied
						app.router.navigate('access-denied', {
							trigger : true
						});
					},
					404 : function() {
						// 404 -- File not found
						app.router.navigate('page-not-found', {
							trigger : true
						});
					}
				}
			});
		});