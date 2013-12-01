CBR.Controllers.Index = new Class({
    Extends: CBR.Controllers.BaseController,

    initialize: function (options) {
        this.parent(options);
    },

    run: function () {
        this.initElements();

        // TODO if (!Modernizr.input.required) {
            this._initValidation();
        //}

        this._initEvents();
    },

    initElements: function () {
        this.parent();

        this.$form = jQuery("form");
    },

    _initValidation: function () {
        this.validator = new CBR.Services.Validator({
            fieldIds: [
                "text"
            ]
        });
    },

    _initEvents: function () {


        // TODO if (!Modernizr.input.required) {
            this.$form.submit(jQuery.proxy(this._doSubmit, this));
        //}
    },

    _doSubmit: function (e) {
        return this.validator.isValid();
    }
});
