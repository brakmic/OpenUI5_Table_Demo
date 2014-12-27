/**
 * Configuration module
 * @module advarics.config
 */
define(['underscore',
        'knockout',
        'base64',
        'advarix'], //base64 is needed when accessing protected services (for example via Base-Auth etc.)
                function (_, ko, B64, ax) {
                    'use strict';
                    var Config = function (global) {
                        
                        //code taken from the article "console.log() in the wild"
                        //at http://blog.getify.com/console-log-in-the-wild/
                        var prod = global.location.href.match(/^http:\/\/(www\.)?brakmic.de/i) !== null,
                                          api = [
                                                    "log", "debug", "info",
                                                    "warn", "error", "assert",
                                                    "dir", "dirxml", "trace",
                                                    "group", "groupCollapsed",
                                                    "groupEnd", "time", "timeEnd",
                                                    "profile", "profileEnd",
                                                    "count", "exception", "table"
                                                ],
                                                log, i, len;

                        if (typeof global.console == "undefined" || !global.console) {
                            try {
                                global.console = {};
                            } catch (err) { }
                        }

                        log = (!prod && typeof global.console.log != "undefined") ?
                           global.console.log :
                           function () { }
                        ;

                        for (i = 0, len = api.length; i < len; i++) {
                            if (prod || typeof global.console[api[i]] == "undefined" ||
                               !global.console[api[i]]) {
                                try { global.console[api[i]] = log; } catch (err) { }
                            }
                        }
                        console.log('Running on debug.'); //should only run in DEBUG
                    };

                    _.extend(Config.prototype, {
                        
                        //session data
                        session: {
                            username: ko.observable('dummy'),
                            password: ko.observable('12345')
                        },
                        //remote services
                        services: {
                            advarics: {
                                privateApi: ko.observable(''),
                                publicApi: ko.observable('http://services.odata.org/V3/Northwind/Northwind.svc/')
                            }
                        },
                        //SAP Shell configuration
                        getShellConfig: function (content) {
                            var _pi_date = ko.observable('pi_date_' + ax.Toolbelt.getRandom());
                            var _pi_browser = ko.observable('pi_browser_' + ax.Toolbelt.getRandom());
                            return {
                                name: ko.observable('advaricsShell_' + ax.Toolbelt.getRandom()),
                                appTitle: ko.observable('Shell'),
                                appIcon: ko.observable('Content/images/advaricsLogo.png'),
                                appIconTooltip: ko.observable('advarics logo'),
                                showLogoutButton: ko.observable(true),
                                showSearchTool: ko.observable(true),
                                showInspectorTool: ko.observable(true),
                                showFeederTool: ko.observable(true),
                                worksetItems: ko.observableArray([]),
                                paneBarItems: ko.observableArray([]),
                                content: ko.observable(content),
                                toolPopups: ko.observableArray([]),
                                headerItems: ko.observableArray([]),
                                pi_date: _pi_date,
                                pi_browser: _pi_browser,
                                worksetItemSelected: ko.computed(function () {
                                    return function (oEvent) {
                                        var sId = oEvent.getParameter('id');
                                        var oShell = oEvent.oSource;
                                    }
                                }),
                                paneBarItemSelected: ko.computed(function () {
                                    return function (oEvent) {
                                        var sKey = oEvent.getParameter('key');
                                        var oShell = oEvent.oSource;
                                        switch (sKey) {
                                            case _pi_date():
                                                var oDate = new Date();
                                                oShell.setPaneContent(
                                                    new sap.ui.commons.TextView(
                                                    {
                                                        text: oDate.toLocaleString()
                                                    }), true);
                                                break;
                                            case _pi_browser():
                                                oShell.setPaneContent(
                                                    new sap.ui.commons.TextView(
                                                    {
                                                        text: 'You browser provides the following information:\n' +
                                                            navigator.userAgent
                                                    }), true);
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }.bind(this)),
                                logout: ko.computed(function () {
                                    return function () {
                                        alert('Logout Button has been clicked.');
                                    }
                                }),
                                search: ko.computed(function () {
                                    return function (oEvent) {
                                        alert('Search triggered: ' + oEvent.getParameter('text'));
                                    }
                                }),
                                feedSubmit: ko.computed(function () {
                                    return function (oEvent) {
                                        alert('Feed entry submitted: ' + oEvent.getParameter('text'));
                                    }
                                }),
                                paneClosed: ko.computed(function () {
                                    return function (oEvent) {
                                        //alert("Pane has been closed: " + oEvent.getParameter("id"));
                                    }
                                })
                            };
                        },
                        //calculate the HTTP Basic-Auth header values
                        getAuthHeader: function () {
                            var header;
                            if (this.session.username() &&
                                this.session.password()) {
                                header = 'Basic ' + B64.encode([this.session.username(), this.session.password()].join(':'));
                            }
                            console.log('getAuthHeader', "HTTP-Auth " + header);
                            return header;
                        },
                        //Kendo Grid confoguration
                        //more info & examples: http://demos.telerik.com/kendo-ui/grid/index
                        getManagementGridOptions: function () {
                            var that = this;
                            return {
                                dataSource: {
                                    type: 'odata',
                                    transport: {
                                        read: {
                                            url: that.services.advarics.publicApi() + 'Customers?$format=json',
                                            type: 'GET',
                                            beforeSend: function (xhr) {
                                                
                                                xhr.setRequestHeader('Accept', 'application/json');
                                                //xhr.setRequestHeader('Authorization',
                                                //                            that.getAuthHeader());

                                            },
                                            dataType: 'json',
                                            crossDomain: true,
                                        }
                                    },
                                    pageSize: 20,
                                    serverPaging: true,
                                    serverFiltering: true,
                                    serverSorting: true,
                                    schema: {
                                        model: {
                                            id: 'id',
                                            fields: {
                                                CustomerID: { type: 'string' },
                                                CompanyName: { type: 'string' },
                                                ContactName: { type: 'string' },
                                                ContactTitle: { type: 'string' },
                                                Address: { type: 'string' },
                                                City: { type: 'string' },
                                                Region: { type: 'string' },
                                                PostalCode: { type: 'string' },
                                                Country: { type: 'string' },
                                                Phone: { type: 'string' },
                                                Fax: { type: 'string' }
                                            }
                                        },
                                        data: function (data) {
                                            if (data.value) {
                                                return data.value;
                                            }
                                            delete data["odata.metadata"];
                                            return [data];
                                        },
                                        total: function (data) {
                                            return data["odata.count"];
                                        },
                                        errors: function (data) {
                                        },
                                    }
                                },
                                sortable: true,
                                pageable: true,
                                groupable: true,
                                sizable: true,
                                selectable: true,
                                scrollable: true,
                                editable: {
                                    confirmation: function (e) {
                                        return 'Dou you really want to delete this customer?';
                                    },
                                    cancelDelete: 'No',
                                    confirmDelete: 'Yes',
                                    mode: 'inline'
                                },
                                columns: [
                                                {
                                                    field: 'CompanyName',
                                                    title: 'Company',
                                                    filterable: true
                                                },
                                                {
                                                    field: 'ContactName',
                                                    title: 'Contact'
                                                },
                                                {
                                                    field: 'Phone',
                                                    title: 'Phone'
                                                },
                                                {
                                                    field: 'Fax',
                                                    title: 'Fax'
                                                },
                                                {
                                                    field: 'Address',
                                                    title: 'Address',
                                                    
                                                },
                                                {
                                                    field: 'City',
                                                    title: 'City',
                                                },
                                                {
                                                    command: [
                                                        { name: 'edit', text: { edit: 'Edit', cancel: 'Cancel', update: 'Update' } },
                                                        { name: 'destroy', text: 'Delete' },
                                                    ],
                                                    title: '&nbsp;',
                                                    width: '220px'
                                                }
                                ]
                            };
                        }
                    });

                    return new Config(window);
});
