(function (global) {

    var app = global.app = global.app || {};
    var controls = app.controls;
    var models = app.models;

    app.init = function () {
        var data = models.getData(),
            model = models.getModel(data),
            table = controls.getTable();

        var columns = {
            id: controls.getColumn('ID', 'id'),
            company: controls.getColumn('Company', 'Company'),
            customerCity: controls.getColumn('First Name', 'CustomerFirstName'),
            customerFirstName: controls.getColumn('Last Name', 'CustomerLastName'),
            customerHotel: controls.getColumn('Hotel', 'CustomerHotel'),
            paymentTypes: controls.getColumn('Payment Types', 'PaymentTypes'),
            scanCodes: controls.getColumn('Scan Codes', 'ScanCodes'),
            receiptType: controls.getColumn('Receipt Type', 'ReceiptType'),
            receiptNo: controls.getColumn('Receipt No.', 'ReceiptNo'),
            receiptId: controls.getColumn('Receipt ID', 'ReceiptId'),
            cashDeskNo: controls.getColumn('Cashdesk No.', 'CashDeskNo'),
            timestamp: controls.getColumn('Timestamp', 'Timestamp'),
            receiptDate: controls.getColumn('Receipt Date', 'ReceiptDate')
        };

        _.each(columns, function (column) {
            table.addColumn(column);
        });

        table.setModel(model);
        table.bindRows('/modelData');
        table.sort(table.getColumns()[0]);
        table.placeAt('app');
    };

    app.init();

}(window));