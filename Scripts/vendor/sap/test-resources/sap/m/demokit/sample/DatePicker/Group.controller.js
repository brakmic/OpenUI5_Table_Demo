sap.ui.controller("sap.m.sample.DatePicker.Group", {

	onInit: function () {
		// create model
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			dateValue: new Date()
		});
		this.getView().setModel(oModel);

		this.byId("DP3").setDateValue(new Date());

		this._iEvent = 0;
	},

	handleChange: function (oEvent) {
		var oText = this.byId("T1");
		var oDP = oEvent.oSource;
		var sValue = oEvent.getParameter("value");
		this._iEvent++;
		oText.setText("Change - Event " + this._iEvent + ": DatePicker " + oDP.getId() + ":" + sValue);
	}
});