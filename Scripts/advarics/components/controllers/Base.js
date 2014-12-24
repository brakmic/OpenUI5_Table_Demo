/**
 * Defines a base controller with references to the router and component's event bus
 * @namespace advarics.components.controllers.Base
 */
jQuery.sap.declare('advarics.components.controllers.Base');
/**
 * @namespace advarics.components.controllers.Base
 */
sap.ui.core.mvc.Controller.extend('advarics.components.controllers.Base', {
    onInit: function () {
        advarics.util.Logger.write('BaseController.onInit');
    },
    /**
     * @public
     * Returns the component's event bus
     * @returns {object} EventBus Event Bus instance
     */
    getEventBus: function () {
        var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
        return sap.ui.component(sComponentId).getEventBus();
    },
    /**
     * @public
     * Returns the router
     * @returns {object} Router Router instance
     */
    getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
    }
});