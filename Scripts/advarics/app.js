define([ 
         'underscore',
         'k/kendo.all.min',
         'knockout',
         'advarics.config',
         'advarics.models',
         'advarics.controls'
         ],
         function (_, kendo, ko, config, models, controls) {
             var App = function () { };

             _.extend(App.prototype, {
                 //setup the SAP Shell and the subordinated controls (tables, menus etc.)
                 init: function () {
                    var shell, columns, shellConfig,
                        data = models.getData(),
                        model = models.getModel(data),
                        table = controls.getTable('Customers');
                        
                        kendo ? console.log('Kendo version: ' + kendo.version) : console.log('kendo inactive');
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
                        shellConfig = config.getShellConfig();
                        shellConfig.content(table);
                        //create the shell
                        shell = controls.getShell(shellConfig);
                        shell.placeAt('app');
                 }
             });

             return new App();
});
