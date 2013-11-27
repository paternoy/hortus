var app = {

	views : {},

	models : {},
	
	content : function() {
		return $("#content");
	},
	
	loggedIn : function() {
		return !($.cookie('userId') === null || $.cookie('userId') === undefined);
	},
	
	loadShell : function() {
		app.shellView = new app.ShellView();
		$('body').append(app.shellView.render().el);
	},
	
	handleBackButton: function() {
		// Handle back button throughout the application
		$('.back').on('click', function(event) {
			Backbone.history.back();
			return false;
		});
	}
};

app.Router = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "catalogue"         : "catalogue",
        "catalogue/:id"     : "details"
    },

    initialize: function () {
    	app.loadShell();
    	app.handleBackButton();
    },
    
    home: function () {
		app.homeView = new app.HomeView();
		app.homeView.render();
		app.content().html(app.homeView.el);
	},

    catalogue: function(page) {
    	
        var p = page ? parseInt(page, 10) : 1;
        var plantList = new app.PlantCollection();
        plantList.fetch({success: function(){
            app.content().html(new app.CatalogueView({model: plantList, page: p}).el);
        }});
        
        app.shellView.selectMenuItem('catalogue-menu');
    },
    
    details: function (id) {
        var plant = new app.Plant({id: id});
        plant.fetch({success: function(model, response){
        	app.content().html(new app.DetailsView({model: model}).el);
        }});
//        this.headerView.selectMenuItem();
    }

});

$(document).ready(
		function() {
			utils.loadTemplates(['ShellView', 'HomeView', 'CatalogueView','CatalogueItemView','DetailsView'], function() {
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