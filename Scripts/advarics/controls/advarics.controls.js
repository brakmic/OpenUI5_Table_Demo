(function (global) {

    var app = global.app = global.app || {};
    sap.controls = {};

    function getShell(config) {
        return new sap.ui.ux3.Shell(config.name() || 'advaricsShell', {
            appTitle: config.appTitle() || 'advarics Shell',
            appIcon: config.appIcon() || 'Content/images/advaricsLogo.png',
            appIconTooltip: config.appIconTooltip() || 'advarics logo',
            showLogoutButton: config.showLogoutButton(),
            showSearchTool: config.showSearchTool(),
            showInspectorTool: config.showInspectorTool(),
            showFeederTool: config.showFeederTool(),
            worksetItems: [new sap.ui.ux3.NavigationItem("WI_home", { key: "wi_home", text: "Home" }),
                           new sap.ui.ux3.NavigationItem("WI_1", {
                               key: "wi_1", text: "Management", subItems: [
                                  new sap.ui.ux3.NavigationItem("WI_1_1", { key: "wi_1_1", text: "Text" }),
                                  new sap.ui.ux3.NavigationItem("WI_1_2", { key: "wi_1_2", text: "Button" }),
                                  new sap.ui.ux3.NavigationItem("WI_1_3", { key: "wi_1_3", text: "Image" })]
                           }),
                           new sap.ui.ux3.NavigationItem("WI_API", { key: "wi_api", text: "Documentation" })],
            paneBarItems: [new sap.ui.core.Item("PI_Date", { key: "pi_date", text: "date" }),
                            new sap.ui.core.Item("PI_Browser", { key: "pi_browser", text: "browser" })],
            content: config.content(),
            toolPopups: [new sap.ui.ux3.ToolPopup("contactTool", {
                title: "New Contact",
                tooltip: "Create New Contact",
                icon: "Content/images/Contact_regular.png",
                iconHover: "Content/images/Contact_hover.png",
                content: [new sap.ui.commons.TextView({ text: "Here could be a contact sheet." })],
                buttons: [new sap.ui.commons.Button("cancelContactButton", {
                    text: "Cancel", press: function (oEvent) {
                        sap.ui.getCore().byId("contactTool").close();
                    }
                })]
            })],
            headerItems: [
                            new sap.ui.commons.TextView(
                                {
                                    text: "HBR", tooltip: "U.Name"
                                }),
                              new sap.ui.commons.Button({
                                  text: "Personalize", tooltip: "Personalize",
                                  press: function (oEvent)
                                  {
                                      alert("Just a demo!");
                                  }
                              }),
                            new sap.ui.commons.MenuButton({
                                text: "Help",
                                tooltip: "Help Menu",
                                menu: new sap.ui.commons.Menu("menu1",
                                    {
                                        items: [
                                            new sap.ui.commons.MenuItem("menuitem1",
                                                {
                                                    text: "Help"
                                                }),
                                            new sap.ui.commons.MenuItem("menuitem2",
                                                {
                                                    text: "Report Incident"
                                                }),
                                            new sap.ui.commons.MenuItem("menuitem3",
                                                {
                                                    text: "About",
                                                    select: function (oEvent) {
                                                        var oDialog1 = new sap.ui.commons.Dialog();
                                                        oDialog1.setTitle("About");
                                                        var oText = new sap.ui.commons.TextView(
                                                            {
                                                                text: "\r\nOpenUI5 - Demonstration\r\nadvarics GmbH, Innsbruck (Austria)\r\n"
                                                            });
                                                        oDialog1.addContent(oText);
                                                        oDialog1.addButton(new sap.ui.commons.Button({ text: "OK", press: function () { oDialog1.close(); } }));
                                                        oDialog1.open();
                                                    }
                                                })]
                                    })
                            })],
            worksetItemSelected: function (oEvent) {
                var sId = oEvent.getParameter("id");
                var oShell = oEvent.oSource;
                switch (sId) {
                    case "WI_home":
                        oShell.setContent(config.content());
                        break;
                    case "WI_1_1":
                        oShell.setContent(config.content());
                        break;
                    case "WI_1_2":
                        oShell.setContent(config.content());
                        break;
                    case "WI_1_3":
                        oShell.setContent(config.content());
                        break;
                    case "WI_API":
                        oShell.setContent(config.content());
                        break;
                    default:
                        break;
                }
            },
            paneBarItemSelected: config.paneBarItemSelected(),
            logout: config.logout(),
            search: config.search(),
            feedSubmit: config.feedSubmit(),
            paneClosed: config.paneClosed()
        });
    }

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
            title: title || "NonName Table",
            visibleRowCount: visibleRowCount || 14,
            firstVisibleRow: firstVisibleRow || 1,
            selectionMode: selectionMode || sap.ui.table.SelectionMode.Single,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            navigationMode: sap.ui.table.NavigationMode.Scrollbar,
            enableGrouping: true,
            showColumnVisibilityMenu: true,
            threshold: 100,
        });
    }

    app.controls = {
        getColumn: getColumn,
        getTable: getTable,
        getShell: getShell
    };

}(window));