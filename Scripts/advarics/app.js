(function (global) {

    var app = global.app = global.app || {};
    var controls = app.controls,
        models = app.models,
        config = app.config;

    app.init = function () {
        var shell, columns,
            data = models.getData(),
            model = models.getModel(data),
            table = controls.getTable('Customers');

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

        _.each(columns, function (column) {
            table.addColumn(column);
        });

        table.setModel(model);
        table.bindRows('/modelData');
        table.sort(table.getColumns()[0]);
        config.shellConfig.content(table);
        shell = controls.getShell(config.shellConfig);
        shell.placeAt('app');
    };

    app.init();

}(window));