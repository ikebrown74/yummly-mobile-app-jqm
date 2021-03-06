define([
    'backbone',
    'underscore',
    'text!templates/homeHeaderTemplate.html',
    'app/helpers/config'
], function(Backbone, _, homeHeaderTemplate, config) {
    var View = Backbone.View.extend({
        initialize: function() {
        },

        render: function() {
            var template = _.template(homeHeaderTemplate, { title: config.appName });
            if (this.model) {
                template = _.template(homeHeaderTemplate, { title: this.model.get('name') });
            }
            
            this.$el.html(template);

            return this;
        }
    });

    return View;
});