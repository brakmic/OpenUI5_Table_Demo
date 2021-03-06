/*!
 * @copyright@
 */

jQuery.sap.require("sap.ui.demokit.EntityInfo");

sap.ui.controller("sap.ui.demokit.explored.view.entity", {

	// ====== event handling ====================================================================

	onInit : function () {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this.onRouteMatched, this);
		this._component = sap.ui.core.Component.getOwnerComponentFor(this.getView());
	},

	onTypeLinkPress : function (oEvt) {

		// navigate to entity
		var sType = oEvt.getSource().data("type");
		this.router.navTo("entity", {
			id : sType,
			part : "samples"
		}, false);

		// notify master of selection change
		this._component.getEventBus().publish("app", "selectEntity", {id: sType});
	},

	onTabSelect : function (oEvt) {
		// update URL without updating history
		var sTab = oEvt.getParameter("key");
		this.router.navTo("entity", {
			id : this._sId,
			part : sTab
		}, true);
	},
	
	onNavBack : function (oEvt) {
		this.router.myNavBack("home", {});
	},

	onNavToSample : function (oEvt) {
		var sPath = oEvt.getSource().getBindingContext("entity").getPath();
		var oSample = this.getView().getModel("entity").getProperty(sPath);
		this.router.navTo("sample", {
			id : oSample.id
		});
	},

	_TAB_KEYS : [ "sampes", "about", "properties", "aggregations", "associations", "events", "methods" ],

	onRouteMatched : function (oEvt) {

		var sRouteName = oEvt.getParameter("name"),
			sNewId = oEvt.getParameter("arguments").id,
			sNewTab = oEvt.getParameter("arguments").part;

		// check route
		if (sRouteName !== "entity") {
			return;
		}

		// find entity in index
		// (can be null if the entity is not in the index, e.g. for base classes and types)
		var oEntModel = this.getView().getModel("entity");
		var sPath = sap.ui.demokit.explored.util.ObjectSearch.getEntityPath(oEntModel.getData(), sNewId);
		var oEntity = (sPath) ? oEntModel.getProperty(sPath) : null;

		// set nav button visibility
		var bEntityIsInIndex = !!sPath;
		var oHistory = sap.ui.core.routing.History.getInstance();
		var oPrevHash = oHistory.getPreviousHash();
		var bShowNavButton = sap.ui.Device.system.phone || (!bEntityIsInIndex && !!oPrevHash);
		this.getView().byId("page").setShowNavButton(bShowNavButton);

		// set data model
		var oData;
		if (this._sId !== sNewId) {

			// retrieve entity docu from server
			var oDoc = sap.ui.demokit.EntityInfo.getEntityDocu(sNewId);

			// route to not found page IF there is NO index entry AND NO docu from server
			if (!oEntity && !oDoc) {
				this.router.myNavToWithoutHash("sap.ui.demokit.explored.view.notFound", "XML", false, { path: sNewId });
				return;
			}

			// get view data
			oData = this._getViewData(sNewId, oDoc, oEntity);

			// set view model
			var oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel);

			// set also the binding context for entity data
			this.getView().bindElement("entity>" + sPath);

			// done, we can now switch the id
			this._sId = sNewId;

		} else {

			// get existing data model
			oData = this.getView().getModel().getData();
		}

		// handle unknown tab
		if (this._TAB_KEYS.indexOf(sNewTab) === -1) {
			sNewTab = "samples";
		}
		// handle invisible tab
		if (!oData.show[sNewTab]) {
			sNewTab = "samples";
		}
		var oTab = this.getView().byId("tabBar");
		if (sNewTab !== oTab.getSelectedKey() && oTab.getExpanded()) {
			oTab.setSelectedKey(sNewTab);
		}
	},

	// ========= internal ===========================================================================

	_getViewData : function (sId, oDoc, oEntity) {

		// convert docu
		var oData = this._convertEntityInfo(sId, oDoc);

		// apply entity related stuff
		oData.show.samples = (oEntity) ? oEntity.samples.length > 0 : false;
		oData.count.samples = (oEntity) ? oEntity.samples.length : 0;

		// done
		return oData;
	},

	_convertEntityInfo : function (sId, oDoc) {

		// create skeleton data structure
		var oData = {
			name : sId,
			deprecated : (oDoc) ? this._formatDeprecated(oDoc.deprecation) : null,
			baseType : (oDoc) ? this._formatType(oDoc.baseType) : null,
			baseTypeText : (oDoc) ? this._formatTypeText(oDoc.baseType) : null,
			baseTypeNav : (oDoc) ? this._formatTypeNav(oDoc.baseType) : null,
			description : (oDoc) ? oDoc.doc : null,
			properties : [],
			events : [],
			methods : [],
			aggregations : [],
			associations : [],
			values : [], // for enums!
			show : {
				baseType : (oDoc) ? !!oDoc.baseType : false,
				about : !!oDoc,
				// computed later in this function
				properties : false,
				events : false,
				methods : false,
				aggregations : false,
				associations : false,
				values : false
			},
			count : {
				properties : 0,
				events : 0,
				methods : 0,
				aggregations : 0,
				associations : 0
			}
		};

		// no documentation !
		if (!oDoc) {
			return oData;
		}

		// fill data
		var key = null;
		for (key in oDoc.properties) {
			if (oDoc.properties.hasOwnProperty(key) && key.indexOf("_") !== 0) {
				var oProp = oDoc.properties[key];
				oProp.name = key;
				oProp.doc = this._formatDoc(oProp.doc, oProp.deprecation);
				oProp.deprecated = this._formatDeprecated(oProp.deprecation);
				oProp.typeText = this._formatTypeText(oProp.type);
				oProp.typeNav = this._formatTypeNav(oProp.type);
				oProp.type = this._formatType(oProp.type);
				oProp.defaultValue = (oProp.defaultValue) ? String(oProp.defaultValue).replace("empty/undefined", "-") : "";
				oData.properties.push(oProp);
			}
		}
		for (key in oDoc.events) {
			if (oDoc.events.hasOwnProperty(key) && key.indexOf("_") !== 0) {
				var oEvent = oDoc.events[key];
				oEvent.name = key;
				oEvent.doc = this._formatDoc(oEvent.doc, oEvent.deprecation);
				oEvent.deprecated = this._formatDeprecated(oEvent.deprecation);
				oData.events.push(oEvent);
				for (var p in oEvent.parameters) { // TODO why is parameters not an array ???
					if (oEvent.parameters.hasOwnProperty(p) && p.indexOf("_") !== 0) {
						oData.events.push({
							param : p,
							since : oEvent.parameters[p].since,
							typeText: this._formatTypeText(oEvent.parameters[p].type),
							typeNav: this._formatTypeNav(oEvent.parameters[p].type),
							type: this._formatType(oEvent.parameters[p].type),
							doc : this._formatDoc(oEvent.parameters[p].doc, oEvent.parameters[p].deprecation),
							deprecated : this._formatDeprecated(oEvent.parameters[p].deprecation)
						});
					}
				}
			}
		}
		for (key in oDoc.methods) {
			if (oDoc.methods.hasOwnProperty(key) && key.indexOf("_") !== 0) {
				var oMethod = oDoc.methods[key];
				oMethod.name = key;
				oMethod.doc = this._formatDoc(oMethod.doc, oMethod.deprecation);
				oMethod.deprecated = this._formatDeprecated(oMethod.deprecation);
				oMethod.param = "returnValue";
				oMethod.typeText = this._formatTypeText(oMethod.type);
				oMethod.typeNav = this._formatTypeNav(oMethod.type);
				oMethod.type = this._formatType(oMethod.type);
				oData.methods.push(oMethod);
				for (var i = 0 ; i < oMethod.parameters.length ; i++) {
					var sParamName = oMethod.parameters[i].name;
					if (sParamName.indexOf("_") !== 0) {
						oData.methods.push({
							param : sParamName,
							since : oMethod.parameters[i].since,
							typeText: this._formatTypeText(oMethod.parameters[i].type),
							typeNav: this._formatTypeNav(oMethod.parameters[i].type),
							type: this._formatType(oMethod.parameters[i].type),
							doc : this._formatDoc(oMethod.parameters[i].doc, oMethod.parameters[i].deprecation),
							deprecated : this._formatDeprecated(oMethod.parameters[i].deprecation)
						});
					}
				}
			}
		}
		for (key in oDoc.aggregations) {
			var oAggr = oDoc.aggregations[key];
			var bNotHidden = (!oAggr.hasOwnProperty("visibility") || oAggr.visibility !== "hidden");
			if (oDoc.aggregations.hasOwnProperty(key) && key.indexOf("_") !== 0 && bNotHidden) {
				oAggr.name = key;
				oAggr.doc = this._formatDoc(oAggr.doc, oAggr.deprecation);
				oAggr.deprecated = this._formatDeprecated(oAggr.deprecation);
				oAggr.typeText = this._formatTypeText(oAggr.type);
				oAggr.typeNav = this._formatTypeNav(oAggr.type);
				oAggr.type = this._formatType(oAggr.type);
				oData.aggregations.push(oAggr);
			}
		}
		for (key in oDoc.associations) {
			if (oDoc.associations.hasOwnProperty(key) && key.indexOf("_") !== 0) {
				var oAssoc = oDoc.associations[key];
				oAssoc.name = key;
				oAssoc.doc = this._formatDoc(oAssoc.doc, oAssoc.deprecation);
				oAssoc.deprecated = this._formatDeprecated(oAssoc.deprecation);
				oAssoc.typeText = this._formatTypeText(oAssoc.type);
				oAssoc.typeNav = this._formatTypeNav(oAssoc.type);
				oAssoc.type = this._formatType(oAssoc.type);
				oData.associations.push(oAssoc);
			}
		}
		for (key in oDoc.values) {
			if (oDoc.values.hasOwnProperty(key) && key.indexOf("_") !== 0) {
				var oValue = oDoc.values[key];
				oValue.name = key;
				oValue.doc = this._formatDoc(oValue.doc, oValue.deprecation);
				oValue.deprecated = this._formatDeprecated(oValue.deprecation);
				oData.values.push(oValue);
			}
		}

		// determine if the parts shall be shown
		oData.show.properties = oData.properties.length > 0;
		oData.show.events = oData.events.length > 0;
		oData.show.methods = oData.methods.length > 0;
		oData.show.aggregations = oData.aggregations.length > 0;
		oData.show.associations = oData.associations.length > 0;
		oData.show.values = oData.values.length > 0;

		// set counts
		oData.count.properties = oData.properties.length;
		oData.count.events = oData.events.length;
		oData.count.methods = oData.methods.length;
		oData.count.aggregations = oData.aggregations.length;
		oData.count.associations = oData.associations.length;

		return oData;
	},

	/**
	 * Sets the boolean-as-string flag
	 */
	_formatDeprecated : function (sDeprecation) {
		return (sDeprecation && sDeprecation.length > 0) ? "true" : "false";
	},

	/**
	 * Sets the description to the deprecation text if available
	 */
	_formatDoc : function (sDoc, sDeprecation) {
		return (sDeprecation && sDeprecation.length > 0) ? "DEPRECATED. " + sDeprecation : sDoc;
	},

	/**
	 * Converts the type to navigable type
	 */
	_formatType : function (sType) {
		if (!sType) {
			return null;
		} else {
			// remove arrays
			return sType.replace("[]", "");
		}
	},

	/**
	 * Converts the type to a friendly readable text
	 */
	_formatTypeText : function (sType) {
		if (!sType) {
			return null;
		} else {
			// remove core prefix
			sType = sType.replace("sap.ui.core.", "");
			// only take text after last dot
			var index = sType.lastIndexOf(".");
			return (index !== -1) ? sType.substr(index + 1) : sType;
		}
	},

	/**
	 * Determines if the type can be navigated to
	 */
	_baseTypes : [
		"sap.ui.core.any",
		"sap.ui.core.object",
		"sap.ui.core.function",
		"sap.ui.core.number", // TODO discuss with Thomas, type does not exist
		"sap.ui.core.float",
		"sap.ui.core.int",
		"sap.ui.core.boolean",
		"sap.ui.core.string",
		"sap.ui.core.URI", // TODO discuss with Thomas, type is not a base type (it has documentation)
		"sap.ui.core.ID", // TODO discuss with Thomas, type is not a base type (it has documentation)
		"sap.ui.core.void",
		"sap.ui.core.CSSSize", // TODO discuss with Thomas, type is not a base type (it has documentation)
		"any",
		"object",
		"function",
		"float",
		"int",
		"boolean",
		"string"
	],
	_formatTypeNav : function (sType) {
		return this._baseTypes.indexOf(sType) === -1;
	}
});
