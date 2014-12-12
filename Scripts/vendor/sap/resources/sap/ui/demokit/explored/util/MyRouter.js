/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.demokit.explored.util.MyRouter");jQuery.sap.require("sap.ui.core.routing.Router");sap.ui.core.routing.Router.extend("sap.ui.demokit.explored.util.MyRouter",{myNavBack:function(r,d){var h=sap.ui.core.routing.History.getInstance();var p=h.getPreviousHash();if(p!==undefined){window.history.go(-1)}else{var R=true;this.navTo(r,d,R)}},myNavToWithoutHash:function(v,a,m,d){var b=sap.ui.getCore().byId("splitApp");var c=this.getView(v,a);b.addPage(c,m);b.toDetail(c.getId(),"show",d)}});
