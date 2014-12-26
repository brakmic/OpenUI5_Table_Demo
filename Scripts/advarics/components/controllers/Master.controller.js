/**
 * This is the master controller
 * @namespace advarics.components.controllers.Master
 * 
 */
jQuery.sap.declare('advarics.components.controllers.Master');
jQuery.sap.require('advarics.components.controllers.Base');
'use strict';

advarics.components.controllers.Base.extend('advarics.components.controllers.Master', {
    /**
    * Called when a controller is instantiated and its View controls (if available) are already created.
    * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
    * @memberOf advarics.components.controllers.Master
    */
    onInit: function () {
        advarics.util.Logger.write('MasterController.onInit');
        
        if (sap.ui.Device.system.phone) {
            advarics.util.Logger.write('Device is a phone. Returning from MasterController.onInit');
            return;
        }
        this._bus = this.getEventBus();
        this._router = this.getRouter(this);
        this._router.attachRoutePatternMatched(this.onRouteMatched, this);
        this._view = this.getView();
        this._view.setModel(sap.ui.getCore().getModel('northwind'));
        this._view.setModel(sap.ui.getCore().getModel('i18n'), 'i18n');
        this._view.setModel(sap.ui.getCore().getModel('device'), 'device');
    },

    /**
    * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
    * (NOT before the first rendering! onInit() is used for that one!).
    * @memberOf advarics.components.controllers.Master
    * @function onBeforeRendering
    */
    onBeforeRendering: function () {
        advarics.util.Logger.write('MasterController.onBeforeRendering');
    },

    /**
    * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
    * This hook is the same one that SAPUI5 controls get after being rendered.
    * @memberOf advarics.components.controllers.Master
    * @function onAfterRendering
    */
    onAfterRendering: function () {
        advarics.util.Logger.write('MasterController.onAfterRendering');
        
    },

    /**
    * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
    * @memberOf advarics.components.controllers.Master
    * @function onExit
    */
    onExit: function () {
        advarics.util.Logger.write('MasterController.onExit');
    },
    /**
    * Check if route matched
    * param {object} oEvent Event object
    * @memberOf advarics.components.controllers.Master
    * @function onRouteMatched
    */
    onRouteMatched: function (oEvent) {
        var sName = oEvent.getParameter('name');

        if (sName !== 'main') {
            advarics.util.Logger.write('MasterController.onRouteMatched > wrong route: ' + sName);
            return;
        }

        //navigate to the detail view
        this._router.navToWithoutHash({
            currentView: this._view,
            targetViewName: 'advarics.views.detail',
            targetViewType: 'XML'
        });
    },
    /**
     * This function is the click handler for the product list in the master view
     * @memberOf advarics.components.controllers.Master
     * @function onSelect
     */
    onSelect: function (oEvent) {
        var path = oEvent.getParameter('listItem').getBindingContext().getPath().substr(1);
        advarics.util.Logger.write('MasterController.onSelect > ' + path);
        //let router navigate to the detail page
        //more info: https://sapui5.netweaver.ondemand.com/sdk/docs/api/symbols/sap.ui.core.routing.Router.html#navTo
        this._router.navTo("product", {
            from: "master",
            product: path,
            tab: "detail"
        }, true);
        
    },
    /**
     * This function is the handler for search requests.
     * @memberOf advarics.components.controllers.Master
     * @function onSearch
     */
    onSearch: function (oEvent) {
        advarics.util.Logger.write('MasterController.onSearch');
        var query = oEvent.getParameter('query');
        if (query) {
            advarics.util.Logger.write('Searching for ' + query);
        }
    },
    /**
     * This function gets called at the first load and preselects the first item in the list.
     * @memberOf advarics.components.controllers.Master
     * @function selectFirstItem
     */
    selectFirstItem: function () {
        advarics.util.Logger.write('MasterController.selectFirstItem');
        var list = this._view.byId("list");
        var items = list.getItems();
        if(sap.ui.Device.system.phone &&
             items.length > 0 &&
             !list.getSelectedItem()) {
            list.setSelectedItem(items[0], true);
            advarics.util.Logger.write('MasterController.selectFirstItem > ' + items[0]);
        }
    }

});