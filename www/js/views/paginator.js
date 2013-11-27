app.Paginator = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        var html = '';
        for (var i=0; i < pageCount; i++) {
        	// sometimes append is shit
        	html += "<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#catalogue/page/"+(i+1)+"'>" + (i+1) + "</a></li>";
        }
        
        // Sometimes we need setElement to avoid the tagName, className etc...
        this.setElement(html);

        return this;
    }
});