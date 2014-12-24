/**
 * Format-Helper module
 * @module advarics.util.Formatter
 * @namespace advarics.util.Formatter
 */
jQuery.sap.declare('advarics.util.Formatter');
/**
 * @namespace Formatter
 */
advarics.util.Formatter = {
    /**
     * Capitalize the first letter in a given string
     * @function upperCaseFirstChar
     * @param {string} sStr a string value
     * @returns String with capitalized first letter
     */
    uppercaseFirstChar: function (sStr) {
        if (sStr) {
            return sStr.charAt(0).toUpperCase() + sStr.slice(1);
        }
    },
    /**
     * Get the discontinued status state
     * @function discontinuedStatusState
     * @param {date} sDate a date value
     * @returns String indicator
     */
    discontinuedStatusState: function (sDate) {
        return sDate ? "Error" : "None";
    },

    discontinuedStatusValue: function (sDate) {
        return sDate ? "Discontinued" : "";
    },

    currencyValue: function (value) {
        if (value) {
            return parseFloat(value).toFixed(2);
        }
    }
};