/**
 * Bootstrap module for initializing OpenUI5 Application components
 * @namespace advarics.app
 * @module advarics.app
 */
define([
         'underscore',
         'advarics.config',
         'advarics.models',
         'advarics.controls',
         'advarix'
         ],
         function (_, config, models, controls, ax) {
             'use strict';
             var App = function () { };

             _.extend(App.prototype, {
                 /**
                  * Set helper functions for console debugging
                  * @function setHelpers
                  * @name setHelpers
                  * @memberOf advarics.app
                  * @module advarics.app
                  */
                 setHelpers: function(){
                     window.__get = function (elementId) {
                         if (elementId) {
                             return sap.ui.getCore().byId(elementId);
                         }
                     };
                 },
                 //setup the SAP Shell and the subordinated controls (tables, menus etc.)
                 init: function () {
                    var shell, columns, shellConfig,
                        data = models.getData(),
                        model = models.getModel(data),
                        table = controls.getTable('Customers');
                       
                        //prepare columns
                        columns = {
                            company: controls.getColumn('Company', 'Company'),
                            active: controls.getColumn('Active', 'Active', new sap.ui.commons.CheckBox().bindProperty("checked", "Active")),
                            url: controls.getColumn('Homepage', 'Url', new sap.ui.commons.Link().bindProperty("text", "Company").bindProperty("href", "Url")),
                            picture: controls.getColumn('Picture', 'Picture', new sap.ui.commons.Image().bindProperty("src", "Picture")),
                            gender: controls.getColumn('Gender', 'Gender', new sap.ui.commons.ComboBox({items: [
                     		                                                                        new sap.ui.core.ListItem({text: "female"}),
                     		                                                                        new sap.ui.core.ListItem({text: "male"})
                                                                                                            ]}).bindProperty("value","Gender")),
                            customerCity: controls.getColumn('City', 'CustomerCity'),
                            customerFirstName: controls.getColumn('First Name', 'CustomerFirstName'),
                            customerLastName: controls.getColumn('Last Name', 'CustomerLastName'),
                            customerHotel: controls.getColumn('Hotel', 'CustomerHotel'),
                            paymentTypes: controls.getColumn('Payment Types', 'PaymentTypes'),
                            receiptDate: controls.getColumn('Receipt Date', 'ReceiptDate')
                        };
                        //add columns to the table
                        _.each(columns, function (column) {
                            table.addColumn(column);
                        });
                        //add model to the table
                        table.setModel(model);
                        table.bindRows('/modelData');
                        table.sort(table.getColumns()[0]);
                        //get default SAP Shell config
                        shellConfig = config.getShellConfig(table);
                        //create the shell
                        shell = controls.getShell(shellConfig);
                        
                        shell.placeAt('content');
                 },
                 altInit: function () {

                     jQuery.sap.require('advarics.util.Formatter');
                     jQuery.sap.require('advarics.settings.Globals');
                     jQuery.sap.require('advarics.util.Logger');
                     jQuery.sap.require('advarics.components.apps.App');

                     var appCom = new advarics.components.apps.App();
                     //var appCom = sap.ui.getCore().createComponent({
                     //    name: "advarics.components.apps.App",
                     //    id: "App"
                     //});
                     new sap.m.Shell('_Shell_' + ax.Toolbelt.getRandom(), {
                         title: 'Alternative Shell',
                         app: new sap.ui.core.ComponentContainer({
                             component: appCom
                         })
                     }).placeAt('content');
                 }
             });

             return new App();
});
