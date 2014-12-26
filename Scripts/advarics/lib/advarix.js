/**
 * advarix Library
 * @module advarix
 */
jQuery.sap.declare('advarix');
(function () {
    /**
     * advarix library
     * structure taken from: https://gist.github.com/blainsmith/da32eb0f0862e40cc201
      */

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `advarix` variable.
  var previousLib = root.advarix;
  
  // Create a safe reference to the advarix object for use below.
  var advarix = function(obj) {
    if (obj instanceof advarix) return obj;
    if (!(this instanceof advarix)) return new advarix(obj);
    this.libWrapped = obj;
  };
  
  // Export the advarix object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `advarix` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = advarix;
    }
    exports.advarix = advarix;
  } else {
    root.advarix = advarix;
  }
  
  // Current version.
  advarix.VERSION = '0.0.1';
  
  /**
  * LIBRARY CODE - BEGIN -
  **/

  advarix.Toolbelt = {
      /**
       * Empties an HTMLElement
       * @param elementId
       */
      empty: function (elementId) {
          var element = document.getElementById(elementId);
          if(element instanceof HTMLElement) {
              while (element.firstChild) {
                  element.removeChild(element.firstChild);
              }
          }
      },

      bind: function (fThis, f) {
          return function () {
              return f.apply(fThis, arguments);
          };
      },

      getRandom: function (max) {
          var maxVal = max || 99999,
              rand = Math.floor(Math.random() * maxVal);
          return rand;
      }
  };

  /**
  * LIBRARY CODE - END -
  **/
  
  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, advarix registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
      define('advarix', [], function () {
        return advarix;
    });
  }
}.call(this));
