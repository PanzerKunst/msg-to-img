CBR.Controllers.Index = new Class({
    Extends:CBR.Controllers.BaseController,

    initialize:function (options) {
        this._redirectToHttps();
        this.parent(options);
    },

    run:function () {
        this.initElements();

        // TODO if (!Modernizr.input.required) {
        this._initValidation();
        //}

        this._initEvents();
    },

    initElements:function () {
        this.parent();

        this.$form = jQuery("[action='/picturize']");
        this.$textarea = jQuery("#text");

        if (Modernizr.localstorage) {
            this.$textarea.val(localStorage.getItem("text"));
        }
    },

    // TODO: remove when it's possible to detect "https" from Play
    _redirectToHttps:function () {
        var url = location.href;
        var protocolHostSeparator = "://";
        var indexOfProtocolHostSeparator = url.indexOf(protocolHostSeparator);
        var protocol = url.substring(0, indexOfProtocolHostSeparator);

        if (protocol === "http") {
            var hostAndPort = url.substring(indexOfProtocolHostSeparator + protocolHostSeparator.length);
            var hostPortSeparator = ":";
            var indexOfHostPortSeparator = hostAndPort.indexOf(hostPortSeparator);
            var host = hostAndPort;
            if (indexOfHostPortSeparator > -1) {
                host = hostAndPort.substring(0, indexOfHostPortSeparator);
            }
            location.replace("https" + protocolHostSeparator + host);
        }
    },

    _initValidation:function () {
        this.validator = new CBR.Services.Validator({
            fieldIds:[
                "text"
            ]
        });
    },

    _initEvents:function () {
        // TODO if (!Modernizr.input.required) {
        this.$form.submit(jQuery.proxy(this._doSubmit, this));
        //}

        if (Modernizr.localstorage) {
            this.$textarea.keyup(jQuery.proxy(this._saveText, this));
        }
    },

    _doSubmit:function (e) {
        if (Modernizr.localstorage) {
            localStorage.clear();
        }

        return this.validator.isValid();
    },

    _saveText:function (e) {
        localStorage.setItem("text", this.$textarea.val());
    }
});
