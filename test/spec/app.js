/*globals define, describe, beforeEach*/
define(['app'], function (app) {
    'use strict';

    describe('The main app module', function () {
        var content;
        //Arrange
        beforeEach(function () {
            content = document.createElement('div');
            //prepare DOM
            content.id = 'content';
            content.style.display = 'none';
            document.body.appendChild(content);
            spyOn(app, 'init').and.callThrough();
            spyOn(app, 'altInit').and.callThrough();
            //Act
            app.init();
            app.altInit();
        });

        //Assert
        it('is not null', function () {
            expect(app).not.toBeNull();
        });

        it('initializes the Shell only once', function () {
            expect(app.init).toHaveBeenCalled();
            expect(app.init.calls.count(1));
        });

        it('initializes Master-Detail only once', function () {
            expect(app.altInit).toHaveBeenCalled();
            expect(app.altInit.calls.count(1));
        });

        afterEach(function () {
            document.body.removeChild(content);
        });
    });

    describe('The main App component', function () {
        var appCom;
        //Arrange
        beforeEach(function () {
            jQuery.sap.require('advarics.util.Formatter');
            jQuery.sap.require('advarics.settings.Globals');
            jQuery.sap.require('advarics.util.Logger');
            jQuery.sap.require('advarics.components.apps.App');
            //Act
            appCom = new advarics.components.apps.App();
            spyOn(appCom, 'init').and.callThrough();
            spyOn(appCom, 'createContent').and.callThrough();
            appCom.init();
            appCom.createContent();
        });
        //Assert
        it('is not null', function () {
            expect(appCom).not.toBeNull();
        });

        it('initializes the AppRouter only once', function () {
            expect(appCom.init).toHaveBeenCalled();
            expect(appCom.init.calls.count(1));
            expect(appCom._router).not.toBeNull();
        });

        it('initializes the i18n Model', function () {
            expect(sap.ui.getCore().getModel('i18n')).not.toBeNull();
        });

        it('initalizes the "Northwind"-OData-Model', function () {
            expect(sap.ui.getCore().getModel('northwind')).not.toBeNull();
        });

        it('initializes the Device Model', function () {
            expect(sap.ui.getCore().getModel('device')).not.toBeNull();
        });

        it('creates the initial page only once', function () {
            expect(appCom.createContent).toHaveBeenCalled();
            expect(appCom.createContent.calls.count(1));
        });

        afterEach(function () {
            appCom.destroy();
            sap.ui.getCore().getModel('i18n').destroy();
            sap.ui.getCore().getModel('northwind').destroy();
            sap.ui.getCore().getModel('device').destroy();
        });

    });
});