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

        this.$form = jQuery("[action='/picturize']");
        this.$textarea = jQuery("#text");

        if (Modernizr.localstorage) {
            this.$textarea.val(localStorage.getItem("text"));
        }
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

        if (Modernizr.localstorage) {
            this.$textarea.keyup(jQuery.proxy(this._saveText, this));
        }
    },

    _doSubmit: function (e) {
        if (Modernizr.localstorage) {
            localstorage.clear();
        }

        return this.validator.isValid();
    },

    _saveText: function(e) {
        localStorage.setItem("text", this.$textarea.val());
    }
});
