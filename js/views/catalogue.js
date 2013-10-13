window.CatalogueView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var plants = this.model.models;
        var len = plants.length;
//        var startPos = (this.options.page - 1) * 8;
//        var endPos = Math.min(startPos + 8, len);
        $(this.el).html(this.template());

        for (var i = 0; i < len; i++) {
            $('.thumbnails', this.el).append(new CatalogueItemView({model: plants[i]}).render().el);
        }

//        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.CatalogueItemView = Backbone.View.extend({

    tagName: "li",

    className: "span4",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});