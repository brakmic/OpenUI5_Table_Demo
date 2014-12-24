/**
 * Application Router 
 * @module advarics.components.routers.AppRouter
 */
jQuery.sap.declare('advarics.components.routers.AppRouter');
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");


/**
 * @namespace AppRouter
 */
sap.ui.core.routing.Router.extend('advarics.components.routers.AppRouter', {
    /**
     * Initializes a new router instance
     * @constructor
     */
    constructor: function () {
        advarics.util.Logger.write('AppRouter.constructor');
        sap.ui.core.routing.Router.apply(this, arguments);
        this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
    },
    /**
     * Navigate back
     * @function navigateBack
     * @param {string} sRoute route string
     * @param {map} mData route data
     * @returns void
     */
    navigateBack: function (sRoute, mData) {
        advarics.util.Logger.write('AppRouter.navigateBack');
        var oHistory = sap.ui.core.routing.History.getInstance();
        var sPrevHash = oHistory.getPreviousHash();
        //history contains a previous entry?
        if (sPrevHash !== undefined) {
            window.history.go(-1);
        } else {
            //to prevent to go back with forward history
            var bReplace = true;
            this.navTo(sRoute, mData, bReplace);
        }
    },
    /**
     * @public
     * Changes the view without changing hash
     * @param oOptions {object} with following properties
     * <ul>
     *      <li>currentView: the view where the navigation starts from</li>
     *      <li>targetViewName: fully qualified name of the view where we should navigate to</li>
     *      <li>targetViewType: the view type, e.g. XML, HTML, JS</li>
     *      <li>isMaster: default is false. When true the view will be put into Master</li>
     *      <li>transition: default is "show".</li>
     *      <li>data: the data passed to the navContainer's lifecycle events</li>
     * </ul>
     */
    navToWithoutHash: function (oOptions) {
        advarics.util.Logger.write('AppRouter.navToWithoutHash');
        var oSplitApp = this._findSplitApp(oOptions.currentView);
        //load view, add it to the page aggregation and navigate to it
        var oView = this.getView(oOptions.targetViewName, oOptions.targetViewType);
        oSplitApp.addPage(oView, oOptions.isMaster);
        oSplitApp.to(oView.getId(), oOptions.transition || 'show', oOptions.data);
    },
    /**
     * Navigate back without hash
     */
    backWithoutHash: function (oCurrentView, bIsMaster) {
        advarics.util.Logger.write('AppRouter.backWithoutHash');
        var sBackMethod = bIsMaster ? 'backMaster' : 'backDetail';
        this._findSplitApp(oCurrentView)[sBackMethod]();
    },
    /**
     * Logs routing information when a route has matched
     * @memberOf advarics.components.routers.AppRouter
     * @returns void
     */
    onRouteMatched: function(oEvent){
        advarics.util.Logger.write('AppRouter.onRouteMatched');
        advarics.util.Logger.write(JSON.stringify(oEvent));
    },
    /**
     * Destroys the router instance
     * @function destroy
     * @returns void
     */
    destroy: function () {
        advarics.util.Logger.write('AppRouter.destroy');
        sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
        this._oRouteMatchedHandler.destroy();
    },
    /**
     * @private 
     * This function searches for the base HTMLElement of the app instance.
     * @memberOf advarics.components.routers.AppRouter
     * @returns Component
     */
    _findSplitApp: function (oControl) {
        advarics.util.Logger.write('AppRouter._findSplitApp > Control: ' + oControl);
        sAncestorControlName = 'splitApp';

        if(oControl instanceof sap.ui.core.mvc.View &&
                            oControl.byId(sAncestorControlName)) {
            return oControl.byId(sAncestorControlName);
        }
        
        return oControl.getParent() ? this._findSplitApp(oControl.getParent(), sAncestorControlName) : null;
    }
});