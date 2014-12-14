(function (global) {

    var app = global.app = global.app || {};
    app.config = {};

    var shellConfig = {
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
        content: ko.observable(
                    new sap.ui.core.HTML("myContent",
                    {
                        content: '<div>'+
                                'advarics GmbH'+
                                '</div>'
                    })
        ),
        toolPopups: ko.observableArray([]),
        headerItems: ko.observableArray([]),
        worksetItemSelected: ko.computed(function(){
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
                        oShell.setPaneContent(new sap.ui.commons.TextView({ text: oDate.toLocaleString() }), true);
                        break;
                    case "pi_browser":
                        oShell.setPaneContent(new sap.ui.commons.TextView({ text: "You browser provides the following information:\n" + navigator.userAgent }), true);
                        break;
                    default:
                        break;
                }
            }
        }),
        logout: ko.computed(function(){
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

    app.config = {
        shellConfig: shellConfig,
    };

}(window));