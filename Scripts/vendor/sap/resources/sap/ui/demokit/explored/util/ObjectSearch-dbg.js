/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides a simple search feature
jQuery.sap.declare("sap.ui.demokit.explored.util.ObjectSearch");

sap.ui.demokit.explored.util.ObjectSearch = {

	getEntityPath : function (oData, sId) {
		if (!oData.entities) {
			return null;
		}
		var oResult = null;
		jQuery.each(oData.entities, function (i, oEnt) {
			if (oEnt.id === sId) {
				oResult = "/entities/" + i + "/";
				return false;
			}
		});
		return oResult;
	}
};