define(['underscore',
        'knockout',
        'base64'], //base64 is needed when accessing protected services (for example via Base-Auth etc.)
                function (_, ko, B64) {
                    'use strict';
                    var Config = function(){};

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
                        getShellConfig: function () {
                            return {
                                name: ko.observable('advaricsShell'),
                                appTitle: ko.observable('Shell'),
                                appIcon: ko.observable('Content/images/advaricsLogo.png'),
                                appIconTooltip: ko.observable('advarics logo'),
                                showLogoutButton: ko.observable(true),
                                showSearchTool: ko.observable(true),
                                showInspectorTool: ko.observable(true),
                                showFeederTool: ko.observable(true),
                                worksetItems: ko.observableArray([]),
                                paneBarItems: ko.observableArray([]),
                                content: ko.observable(''),
                                toolPopups: ko.observableArray([]),
                                headerItems: ko.observableArray([]),
                                worksetItemSelected: ko.computed(function () {
                                    return function (oEvent) {
                                        var sId = oEvent.getParameter("id");
                                        var oShell = oEvent.oSource;

                                    }
                                }),
                                paneBarItemSelected: ko.computed(function () {
                                    return function (oEvent) {
                                        var sKey = oEvent.getParameter("key");
                                        var oShell = oEvent.oSource;
                                        switch (sKey) {
                                            case "pi_date":
                                                var oDate = new Date();
                                                oShell.setPaneContent(
                                                    new sap.ui.commons.TextView(
                                                    {
                                                        text: oDate.toLocaleString()
                                                    }), true);
                                                break;
                                            case "pi_browser":
                                                oShell.setPaneContent(
                                                    new sap.ui.commons.TextView(
                                                    {
                                                        text: "You browser provides the following information:\n" +
                                                            navigator.userAgent
                                                    }), true);
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }),
                                logout: ko.computed(function () {
                                    return function () {
                                        alert("Logout Button has been clicked.");
                                    }
                                }),
                                search: ko.computed(function () {
                                    return function (oEvent) {
                                        alert("Search triggered: " + oEvent.getParameter("text"));
                                    }
                                }),
                                feedSubmit: ko.computed(function () {
                                    return function (oEvent) {
                                        alert("Feed entry submitted: " + oEvent.getParameter("text"));
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
                                header = "Basic " + B64.encode([this.session.username(), this.session.password()].join(":"));
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
                    return new Config();
});
