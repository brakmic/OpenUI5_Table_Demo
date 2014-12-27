/**
 * Utility module for creating components
 * @module advarics.controls
 */
define(['underscore',
        'knockout',
        'advarics.config',
        'advarics.grid',
        'advarics.editor',
        'advarix'],
    function (_, ko, advaricsConfig, grid, editor, ax) {
        'use strict';
        var Controls = function () { };

        _.extend(Controls.prototype, {
            
            //create a KendoUI Grid widget
            //info: http://demos.telerik.com/kendo-ui/grid/index
            getKendoGrid: function (config) {
                return grid.create(config);
            },
            //create a KendoUI Editor widget
            //info: http://demos.telerik.com/kendo-ui/editor/index
            getKendoEditor: function(config){
                return editor.create(config);
            },
            getRandomInt: function (max) {
                var maxVal = max || 999;
                return ax.Toolbelt.getRandom(max);
            },
            //create an SAP Shell
            //more info: https://sapui5.hana.ondemand.com/sdk/#test-resources/sap/ui/ux3/demokit/Shell.html
            getShell: function (config) {
                var doc = "Doc_" + this.getRandomInt(),
                    wi_home = "WI_home_" + this.getRandomInt(),
                    wi_mgmt = "WI_Mgmt_" + this.getRandomInt(),
                    wi_editor = "WI_Editor_" + this.getRandomInt(),
                    wi_doc = "WI_Doc_" + this.getRandomInt(),
                    pi_date = config.pi_date() || "PI_Date_" + this.getRandomInt(),
                    pi_browser = config.pi_browser() || "PI_Browser_" + this.getRandomInt(),
                    contact_tool = "contactTool_" + this.getRandomInt(),
                    menu1 = "menu1_" + this.getRandomInt(),
                    menu_item1 = "menu_item1_" + this.getRandomInt(),
                    menu_item2 = "menu_item2" + this.getRandomInt(),
                    menu_item3 = "menu_item3" + this.getRandomInt(),
                    advaricsShellName = 'advaricsShell_' + this.getRandomInt(),
                    cancelContactButtonName = "cancelContactButton_" + this.getRandomInt();

                var oDoc = new sap.ui.core.HTML(doc, {
                    content: '<div style="padding-top: 2em;">'+
                    'Source code on <a href="https://github.com/brakmic/OpenUI5_Table_Demo" target="_blank">GitHub</a>' +
                    '</div>'
                });

                return new sap.ui.ux3.Shell(config.name() || advaricsShellName, {
                    hasGrid: ko.observable(false),
                    appTitle: config.appTitle() || 'advarics Shell',
                    appIcon: config.appIcon() || 'Content/images/advaricsLogo.png',
                    appIconTooltip: config.appIconTooltip() || 'advarics logo',
                    showLogoutButton: config.showLogoutButton(),
                    showSearchTool: config.showSearchTool(),
                    showInspectorTool: config.showInspectorTool(),
                    showFeederTool: config.showFeederTool(),
                    worksetItems: [
                                    new sap.ui.ux3.NavigationItem(wi_home,
                                    {
                                        key: wi_home,
                                        text: "Home"
                                    }),
                                    new sap.ui.ux3.NavigationItem(wi_mgmt,
                                        {
                                            key: wi_mgmt,
                                            text: "Management",
                                        }),
                                    new sap.ui.ux3.NavigationItem(wi_editor,
                                        {
                                            key: wi_editor,
                                            text: "Editor",
                                        }),
                                    new sap.ui.ux3.NavigationItem(wi_doc,
                                    {
                                        key: wi_doc,
                                        text: "Documentation"
                                    })
                                  ],
                    paneBarItems: [
                                    new sap.ui.core.Item(pi_date,
                                        {
                                            key: pi_date,
                                            text: "date"
                                        }),
                                    new sap.ui.core.Item(pi_browser,
                                        {
                                            key: pi_browser,
                                            text: "browser"
                                        })],
                    content: config.content(),
                    toolPopups: [
                                    new sap.ui.ux3.ToolPopup(contact_tool,
                                        {
                                            title: "New Contact",
                                            tooltip: "Create New Contact",
                                            icon: "Content/images/Contact_regular.png",
                                            iconHover: "Content/images/Contact_hover.png",
                                            content: [
                                                        new sap.ui.commons.TextView(
                                                            {
                                                                text: "Here could be a contact sheet."
                                                            })
                                                     ],
                                            buttons: [
                                                        new sap.ui.commons.Button(cancelContactButtonName,
                                                            {
                                                                text: "Cancel", press: function (oEvent)
                                                                {
                                                                    sap.ui.getCore().byId(contact_tool).close();
                                                                }
                                                            })
                                            ]
                                        })
                    ],
                    headerItems: [
                                    new sap.ui.commons.TextView(
                                        {
                                            text: "advarics GmbH",
                                            tooltip: "U.Name"
                                        }),
                                        new sap.ui.commons.Button({
                                            text: "Personalize",
                                            tooltip: "Personalize",
                                            press: function (oEvent)
                                            {
                                                alert("Just a demo!");
                                            }
                                        }),
                                    new sap.ui.commons.MenuButton({
                                        text: "Help",
                                        tooltip: "Help Menu",
                                        menu: new sap.ui.commons.Menu(menu1,
                                            {
                                                items: [
                                                    new sap.ui.commons.MenuItem(menu_item1,
                                                        {
                                                            text: "Help"
                                                        }),
                                                    new sap.ui.commons.MenuItem(menu_item2,
                                                        {
                                                            text: "Report Incident"
                                                        }),
                                                    new sap.ui.commons.MenuItem(menu_item3,
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
                            case wi_home:
                                {
                                    oShell.setContent(config.content());
                                }
                                break;
                            case wi_mgmt:
                                {
                                   oShell.setContent(grid.create(advaricsConfig.getManagementGridOptions()));
                                }
                                break;
                            case wi_editor:
                                {
                                    oShell.setContent(editor.create());
                                }
                                break;
                            case wi_doc:
                                {
                                    oShell.setContent(oDoc);
                                }
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
