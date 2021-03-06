define([
    'jquery',
    'backbone',
    'underscore',
    'app/views/RecipeListItemView'
], function($, Backbone, _, RecipeListItemView) {
    var View = Backbone.View.extend({
        tagName: 'ul',

        className: 'recipesList',

        attributes: {
        },

        initialize: function() {
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
        },

        addAll: function() {
            this.$el.empty();
            this.collection.each(this.addOne, this);  
        },

        addOne: function(recipe) {
            var view = new RecipeListItemView({
                model: recipe
            });

            this.$el.prepend(view.render().$el);
        }        
    });

    return View;
});