(function (global) {

    var app = global.app = global.app || {};
    sap.controls = {};

    function getColumn(label, property, template, sortProperty, filterProperty, width, hAlign) {
        return new sap.ui.table.Column({
            label: new sap.ui.commons.Label({ text: label }),
            template: template || new sap.ui.commons.TextView().bindProperty('text', property),
            sortProperty: sortProperty || property,
            filterProperty: filterProperty || property,
            width: width || "50px",
            hAlign: hAlign || 'Center',
        });
    }

    function getTable(title, visibleRowCount, firstVisibleRow, selectionMode) {
        return new sap.ui.table.Table({
            title: title || "Customers",
            visibleRowCount: visibleRowCount || 20,
            firstVisibleRow: firstVisibleRow || 1,
            selectionMode: selectionMode || sap.ui.table.SelectionMode.Single,
        });
    }

    app.controls = {
        getColumn: getColumn,
        getTable: getTable,
    };

}(window));