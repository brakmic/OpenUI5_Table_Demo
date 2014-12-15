define(['underscore',
        'knockout',
        'advarics.config',
        'advarics.grid'],
    function (_, ko, advaricsConfig, grid) {
        var Controls = function () { };

        _.extend(Controls.prototype, {
            //create a KendoUI Grid
            //more info: http://demos.telerik.com/kendo-ui/grid/index
            getKendoGrid: function (config) {
                return grid.create(config);
            },
            //create an SAP Shell
            //more info: https://sapui5.hana.ondemand.com/sdk/#test-resources/sap/ui/ux3/demokit/Shell.html
            getShell: function (config) {
                var oDoc = new sap.ui.core.HTML("Doc",{
                    content: '<div style="padding-top: 2em;">'+
                    'Source code on <a href="https://github.com/brakmic/OpenUI5_Table_Demo" target="_blank">GitHub</a>' +
                    '</div>'
                });

                return new sap.ui.ux3.Shell(config.name() || 'advaricsShell', {
                    appTitle: config.appTitle() || 'advarics Shell',
                    appIcon: config.appIcon() || 'Content/images/advaricsLogo.png',
                    appIconTooltip: config.appIconTooltip() || 'advarics logo',
                    showLogoutButton: config.showLogoutButton(),
                    showSearchTool: config.showSearchTool(),
                    showInspectorTool: config.showInspectorTool(),
                    showFeederTool: config.showFeederTool(),
                    worksetItems: [new sap.ui.ux3.NavigationItem("WI_home",
                        {
                            key: "wi_home",
                            text: "Home"
                        }),
                        new sap.ui.ux3.NavigationItem("WI_Mgmt",
                            {
                                key: "wi_mgmt",
                                text: "Management",
                           }),
                    new sap.ui.ux3.NavigationItem("WI_Doc",
                        {
                            key: "wi_doc",
                            text: "Documentation"
                        })],
                    paneBarItems: [
                                    new sap.ui.core.Item("PI_Date",
                                        {
                                            key: "pi_date",
                                            text: "date"
                                        }),
                                    new sap.ui.core.Item("PI_Browser",
                                        {
                                            key: "pi_browser",
                                            text: "browser"
                                        })],
                    content: config.content(),
                    toolPopups: [
                                    new sap.ui.ux3.ToolPopup("contactTool",
                                        {
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
                                        })
                    ],
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
                                                                oDialog1.addButton(new sap.ui.commons.Button(
                                                                    {
                                                                        text: "OK",
                                                                        press: function () {
                                                                            oDialog1.close();
                                                                        }
                                                                    }));
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
                            case "WI_Mgmt":
                                oShell.setContent(grid.create(advaricsConfig.getManagementGridOptions()));
                                break;
                            case "WI_Doc":
                                oShell.setContent(oDoc);
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
            },
            //get a table columns for SAP's Table widget
            //more info: https://sapui5.hana.ondemand.com/sdk/#test-resources/sap/ui/table/demokit/Table.html
            getColumn: function (label, property,
                                    template, width,
                                    hAlign) {
                return new sap.ui.table.Column({
                    label: new sap.ui.commons.Label({ text: label }),
                    template: template || new sap.ui.commons.TextView().bindProperty('text', property),
                    sortProperty: property,
                    filterProperty: property,
                    width: width || "50px",
                    hAlign: hAlign || 'Center',
                });
            },
            //Get an SAP Table widget
            getTable: function (title, visibleRowCount,
                                firstVisibleRow, selectionMode) {
                return new sap.ui.table.Table({
                    title: title || "NoName Table",
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
        });

        return new Controls();
    });
