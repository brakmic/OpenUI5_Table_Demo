/**
 * @namespace advarics.components.controllers.Detail
 * @name Detail
 */
jQuery.sap.declare('advarics.components.controllers.Detail');
jQuery.sap.require('advarics.components.controllers.Base');
advarics.components.controllers.Base.extend("advarics.components.controllers.Detail", {

    /**
    * Called when a controller is instantiated and its View controls (if available) are already created.
    * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
    * @memberOf advarics.components.controllers.detail
    * @function onInit
    */
    onInit: function () {
        advarics.util.Logger.write('DetailController.onInit');
        this.oInitialLoadFinishedDeferred = jQuery.Deferred();
        
        if (sap.ui.Device.system.phone) {
            //don't wait for the master on a phone
            this.oInitialLoadFinishedDeferred.resolve();
        } else {
            //here goes the whole messaging logic when dealing with massive amounts of data
            //but this example has only a few entries so there's no need to explicitely send/receive messages and
            //resolve 'promises'
            this._bus = this.getEventBus();
        }
        this._router = this.getRouter();
        this._router.attachRoutePatternMatched(this.onRouteMatched, this);
        this._view = this.getView();
        this._view.setModel(sap.ui.getCore().getModel('northwind'));
        this._view.setModel(sap.ui.getCore().getModel('i18n'), 'i18n');
        this._view.setModel(sap.ui.getCore().getModel('device'), 'device');
        
    },
    /**
    * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
    * (NOT before the first rendering! onInit() is used for that one!).
    * @memberOf advarics.controllers.detail
    * @function onBeforeRendering
    */
    onBeforeRendering: function () {
        advarics.util.Logger.write('DetailController.onBeforeRendering');
    },

    /**
    * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
    * This hook is the same one that SAPUI5 controls get after being rendered.
    * @memberOf advarics.components.controllers.detail
    * @function onAfterRendering
    */
    onAfterRendering: function () {
        advarics.util.Logger.write('DetailController.onAfterRendering');
    },

    /**
    * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
    * @memberOf advarics.components.controllers.detail
    * @function onExit
    */
    onExit: function () {
        advarics.util.Logger.write('DetailController.onExit');
    },
    /**
     * Called when there's a match with a known route (by changing the URL in browser window, for example)
     * @memberOf advarics.components.controllers.Detail
     * @function onRouteMatched
     */
    onRouteMatched: function (oEvent) {
        // when detail navigation occurs, update the binding context
        if (oEvent.getParameter("name") === "product") {

            var sProductPath = "/" + oEvent.getParameter("arguments").product;

            this._view.bindElement(sProductPath);

            // Check that the product specified actually was found
            this._view.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function () {
                var oData = this._view.getModel().getData(sProductPath);
                if (!oData) {
                    this._router.navToWithoutHash({
                        currentView: this._view,
                        targetViewName: "advarics.views.notfound",
                        targetViewType: "XML"
                    });
                }
            }, this));


            // get icon tabbar
            var oIconTabBar = this._view.byId("idIconTabBar");
            oIconTabBar.getItems().forEach(function (oItem) {
                oItem.bindElement(advarics.util.Formatter.uppercaseFirstChar(oItem.getKey()));
            });

            // and select one of them
            var sTabKey = oEvent.getParameter("arguments").tab || "supplier";
            if (oIconTabBar.getSelectedKey() !== sTabKey) {
                oIconTabBar.setSelectedKey(sTabKey);
            }
        }

    },
    /**
     * Gets called when data loading gets completed. In this example there's no use for this function because the amount of demo data
     * is rather small. In real-world scenarios one whould first block the detail view by marking it as "busy" and wait for the completion of
     * the jQuery-promise. Also you should put any messaging logic here to inform interested parties (other views etc.).
     * @memberOf advarics.components.controllers.Detail
     * @function onMasterLoad
     */
    onMasterLoaded: function (sChannel, oEvent, mData) {
        advarics.util.Logger.write('DetailController.onMasterLoaded, Event Info: ' + JSON.stringify(mData));
        this._view.setBusy(false);
    },
    /**
     * Gets called when data could not be found in the model.
     * @memberOf advarics.components.controllers.Detail
     * @function fireDetailNotFound
     */
    fireDetailNotFound: function () {
        this._bus.publish('Detail', 'ProductNotFound', {});
    },
    /**
     * Gets called when the content of detail view changes.
     * @memberOf advarics.components.controllers.Detail
     * @function fireDetailChanged
     */
    fireDetailChanged: function (sProductPath) {
        this._bus.publish('Detail', 'ProductChanged', {});
        var productInfo = this._view.getModel().getData(sProductPath);
        advarics.util.Logger.write('DetailController.fireDetailChanged > ' + JSON.stringify(productInfo));
        this._view.bindElement(sProductPath);
    },
    /**
     * Gets called when there's no data to be shown in detail view. Currently not in use in this demo app.
     * @memberOf advarics.components.controllers.Detail
     * @function showEmptyView
     */
    showEmptyView: function () {
        advarics.util.Logger.write('DetailController.showEmptyView > Product not found');
        this._router.NavToWithoutHash({
            currentView: this._view,
            targetViewName: "advarics.views.notfound",
            targetViewType: "XML"
        });
    }
});