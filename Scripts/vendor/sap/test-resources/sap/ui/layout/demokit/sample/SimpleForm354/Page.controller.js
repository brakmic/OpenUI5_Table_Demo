sap.ui.controller("sap.ui.layout.sample.SimpleForm354.Page", {

	_fragments: {},

	_getFormFragment: function (sName) {
		if (!this._fragments[sName]) {
			this._fragments[sName] = sap.ui.xmlfragment("sap.ui.layout.sample.SimpleForm354." + sName, this);
		}
		return this._fragments[sName];
	},

	onExit : function () {
		jQuery.each(this._fragments, function (i, oFrag) {
			oFrag.destroy();
		});
	},

	onInit: function (oEvent) {

		// set explored app's demo model on this sample
		var oModel = new sap.ui.model.json.JSONModel("test-resources/sap/ui/demokit/explored/supplier.json");
		this.getView().setModel(oModel);

		// Set the initial form to be the change one
		var oForm = this._getFormFragment("Display");
		this.getView().byId("idFormContainer").insertContent(oForm);
		this.getView().bindElement("/SupplierCollection/0");
	},

	handleFooterBarButtonPress: function (oEvent) {

		// Derive action from the button pressed
		var bEditAction = /idButtonEdit$/.test(oEvent.getSource().getId());

		// Show the appropriate action buttons
		this.getView().byId("idButtonEdit").setVisible(! bEditAction);
		this.getView().byId("idButtonSave").setVisible(bEditAction);
		this.getView().byId("idButtonCancel").setVisible(bEditAction);

		// Set the right form type
		oForm = this._getFormFragment(bEditAction ? "Change" : "Display");
		var oContainer = this.getView().byId("idFormContainer");
		oContainer.removeContent(0);
		oContainer.insertContent(oForm);
	}

});
