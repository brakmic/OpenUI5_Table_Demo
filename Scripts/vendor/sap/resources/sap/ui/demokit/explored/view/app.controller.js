/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.controller("sap.ui.demokit.explored.view.app",{onInit:function(){this._afterRenderingDone=false;this._component=sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));this._component.getEventBus().subscribe("app","setCompact",this._setCompactMode,this)},onAfterRendering:function(){if(this.hasOwnProperty("_compactOn")){this.getView().toggleStyleClass("sapUiSizeCompact",this._compactOn)}this._afterRenderingDone=true},_setCompactMode:function(c,e,d){if(this._afterRenderingDone){this.getView().toggleStyleClass("sapUiSizeCompact",d.compactOn)}else{this._compactOn=d.compactOn}}});
