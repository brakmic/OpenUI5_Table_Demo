jQuery.sap.declare('advarics.util.Logger');
jQuery.sap.require('advarics.settings.Globals');
/**
 * Logging helper module
 * @module Logging
 * @namespace advarics.util.Logging
 */
advarics.util.Logger = {
    write: function (msg) {
        var date = new Date();
        if (window.console && advarics.settings.Globals.WITH_LOGGING) {
            console.log('[' + date.toLocaleTimeString(advarics.settings.Globals.LOCALE) + '], ' + msg);
         }
     }
};
