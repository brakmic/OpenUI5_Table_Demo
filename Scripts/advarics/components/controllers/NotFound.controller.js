/**
 * This is the controller for "not found" pages
 * @namespace advarics.components.controllers.NotFound
 * 
 */
jQuery.sap.declare('advarics.components.controllers.NotFound');
jQuery.sap.require('advarics.components.controllers.Base');
advarics.components.controllers.Base.extend("advarics.components.controllers.NotFound", {

    /**
    * Called when a controller is instantiated and its View controls (if available) are already created.
    * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
    * @memberOf advarics.controllers.notfound
    */
    onInit: function () {
        advarics.util.Logger.write('NotFoundController.onInit');
    },

    /**
    * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
    * (NOT before the first rendering! onInit() is used for that one!).
    * @memberOf advarics.controllers.notfound
    */
    onBeforeRendering: function () {

    },

    /**
    * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
    * This hook is the same one that SAPUI5 controls get after being rendered.
    * @memberOf advarics.controllers.notfound
    */
    onAfterRendering: function () {

    },

    /**
    * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
    * @memberOf advarics.controllers.notfound
    */
    onExit: function () {

    }

});