jQuery.sap.declare('advarics.components.apps.App');
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.HashChanger");
jQuery.sap.require('advarics.components.routers.AppRouter');
jQuery.sap.require('advarics.util.Logger');
jQuery.sap.require('advarix');
'use strict';
/**
 * This is the main component that boots the whole application, registers data models and 
 * provides basic configuration.
 * @namespace advarics.components.apps.App
 * @name App
 */
sap.ui.core.UIComponent.extend('advarics.components.apps.App', {
    metadata: {
        name: 'advarics GmbH WebApp',
        version: '1.0.0',
        includes: [],
        dependencies: {
            libs: ['sap.m', 'sap.ui.layout'],
            components: []
        },
        config: {
            viewType: 'HTML',
            viewPath: 'advarics.views',
            targetControl: 'splitApp',
            clearTarget: false,
            resourceBundle: 'messageBundle.properties',
            serviceConfig: {
                serviceUrl: 'http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/'
            }
        },
        routing: {
            config: {
                routerClass: advarics.components.routers.AppRouter,
                viewType: 'XML',
                viewPath: 'advarics.views',
                targetAggregation: 'detailPages',
                clearTarget: false
            },
            routes: [
                {
                    pattern: '',
                    name: 'main',
                    view: 'master',
                    viewPath: 'advarics.views',
                    viewType: 'XML',
                    targetAggregation: 'masterPages',
                    targetControl: 'splitApp',
                    callback: function(){
                        advarics.util.Logger.write('AppView > MasterView');
                    },
                    subroutes: [
                        {
                            pattern: '{product}/:tab:',
                            name: 'product',
                            view: 'detail',
                            viewPath: 'advarics.views',
                            viewType: 'XML',
                            callback: function () {
                                advarics.util.Logger.write('MasterView > ProductView');
                            },
                        }
                    ]
                },
                {
                    name: 'catchAllMaster',
                    view: 'master',
                    viewPath: 'advarics.views',
                    viewType: 'XML',
                    targetAggregation: 'masterPages',
                    targetControl: 'splitApp',
                    callback: function () {
                        advarics.util.Logger.write('AppView > CatchAllMasterRoute');
                    },
                    subroutes: [
                        {
                            pattern: ':all*:',
                            name: 'catchAllDetail',
                            view: 'notfound',
                            viewPath: 'advarics.views',
                            viewType: 'XML',
                            callback: function () {
                                advarics.util.Logger.write('CatchAllMasterRoute > CatchAllDetailRoute');
                            },
                        }
                    ]
                }
            ]
        }
    },
    /**
     * Initialize the main OpenUI5 application module
     * @memberOf advarics.components.apps.App
     * @function init
     * @returns void
     */
    init: function(){
        advarics.util.Logger.write('App.init');

        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        //extend the router
        this._router = this.getRouter();
        jQuery.extend(this._router, advarics.components.routers.AppRouter);
        advarics.util.Logger.write(this._router ? 'App.init > AppRouter initialized' : 'App.init > AppRouter not found');

        this._router.register('advarics.components.routers.AppRouter');
        this.oRouteHandler = new sap.m.routing.RouteMatchedHandler(this._router);
        this._router.initialize();
        
    },
    /**
     * This function removes resources used by the main application module
     * @memberOf advarics.components.apps.App
     * @returns void
     */
    destroy: function () {
        advarics.util.Logger.write('App.destroy');
        if (this.oRouteHandler) {
            this.oRouteHandler.destroy();
        }
        // call overwritten destroy
        sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
    },
    /**
     * This function initializes the app view, registers models and loads i18n settings.
     * @memberOf advarics.components.apps.App
     * @returns View
     */
    createContent: function () {
        // create root view
        var oView = sap.ui.view({
            id: '_app_component_' + advarix.Toolbelt.getRandom(),
            viewName: 'advarics.views.app',
            type: sap.ui.core.mvc.ViewType.XML,
            viewData: { component: this }
        });

        var mConfig = this.getMetadata().getConfig();
        //use absolute paths relative to the component
        //relative paths fail when running in Fiori Launchpad
        var rootPath = jQuery.sap.getModulePath('advarics.config.i18n');
        //set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl: [rootPath, mConfig.resourceBundle].join('/')
        });
        sap.ui.getCore().setModel(i18nModel, 'i18n');

        //create and set domain model to the component
        var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        var jsonService = mConfig.serviceConfig.jsonServiceUrl;

        //setup 'Northwind' OData-Service
        var dataModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
        
        sap.ui.getCore().setModel(dataModel, 'northwind');
        // publish event once data is loaded
        dataModel.attachRequestCompleted(function () {
            sap.ui.getCore().getEventBus().publish("App", "DataLoaded");
        });

        //set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: sap.ui.Device.system.phone ? 'None' : 'SingleSelectMaster',
            listItemType: sap.ui.Device.system.phone ? 'Active' : 'Inactive'
        });
        deviceModel.setDefaultBindingMode('OneWay');
        sap.ui.getCore().setModel(deviceModel, 'device');

        return oView;
    }
});
