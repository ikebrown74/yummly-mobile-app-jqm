define([
    'backbone',
    'underscore',
    'text!templates/jQmPageTemplate.html'
], function(Backbone, _, jQmPageTemplate) {

    var View = Backbone.View.extend({
        initialize: function() {

        },

        tagName: 'div',

        attributes: {
            'data-role': 'page'
        },

        setHeaderView: function(view, addBackButton) {
            this.headerView = view;
            
            if (addBackButton) {
                $.mobile.page.prototype.options.addBackBtn = true;
            } else {
                $.mobile.page.prototype.options.addBackBtn = false;
            }
        },

        setFooterView: function(view) {
            this.footerView = view;
        },

        setContentView: function(view) {
            this.contentView = view;
        },

        render: function() {
            this.$el.html(_.template(jQmPageTemplate));

            if (this.headerView) {
                this.$('[data-role="header"]').html(this.headerView.render().$el.children());
            } else {
                this.$('[data-role="header"]').remove();
            }
            if (this.contentView) {
                this.$('[data-role="content"]').html(this.contentView.render().$el);
            }
            if (this.footerView) {
                this.$('[data-role="footer"]').html(this.footerView.render().$el.children());
            } else {
                this.$('[data-role="footer"]').remove();
            }

            this.$('[data-role="page"]').on( "pagecreate", $.proxy( this.onPageCreate, this ) );

            return this;
        },

        navigate: function(transition) {
            var page = this.render();

            transition || $.mobile.defaultPageTransition;

            // Add the page to the DOM
            $('body').append(page.$el);

            // Programatically changes to the page
            $.mobile.changePage( page.$el , { changeHash: false, transition: transition } );
        },

        onPageCreate: function() {
            var that = this;
            console.log('Create event ' + that.cid );
        }

    });

    return View;
});