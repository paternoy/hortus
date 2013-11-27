app.ShellView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },
    
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    
    selectMenuItem: function(menuItem) {
        $('.navbar .nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    },
    
    hideMenu: function() {
    	$(".btn-navbar").click();
    }
});