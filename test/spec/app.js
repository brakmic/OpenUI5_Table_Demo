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
            spyOn(app, 'altInit2').and.callThrough();
            //Act
            app.init();
            app.altInit();
            app.altInit2();
        });

        it('should call altInit2', function () {
            expect(app.altInit2).toHaveBeenCalled();
            expect(app.altInit2.calls.count(1));
        });

        //Assert
        it('should be not null', function () {
            expect(app).not.toBeNull();
        });

        it('should initialize the Shell only once', function () {
            expect(app.init).toHaveBeenCalled();
            expect(app.init.calls.count(1));
        });

        it('should initialize Master-Detail only once', function () {
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
        it('should be not null', function () {
            expect(appCom).not.toBeNull();
        });

        it('should initialize the AppRouter only once', function () {
            expect(appCom.init).toHaveBeenCalled();
            expect(appCom.init.calls.count(1));
            expect(appCom._router).not.toBeNull();
        });

        it('should initialize the i18n Model', function () {
            expect(sap.ui.getCore().getModel('i18n')).not.toBeNull();
        });

        it('should initialize the "Northwind"-OData-Model', function () {
            expect(sap.ui.getCore().getModel('northwind')).not.toBeNull();
        });

        it('should initialize the Device Model', function () {
            expect(sap.ui.getCore().getModel('device')).not.toBeNull();
        });

        it('should create the initial page only once', function () {
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