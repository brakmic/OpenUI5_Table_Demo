define(['underscore',
        'knockout',
        'advarics.config'],
    function (_, ko, config) {
        var Grid = function(){};

        sap.ui.core.Control.extend("advarics.controls.KendoGrid", {
            metadata: {
                properties: {}
            },
            //put a simple div where the future Kendo Grid will be hooked on
            init: function () {
                this._html = new sap.ui.core.HTML(
                    {
                        content: "<div id='" +
                                    this.getId() + "-advarics-grid'></div>"
                    });
            },
            //render the grid control basics (Kendo Grid will be created in 'onAfterRendering' function)
            renderer: function (oRm, oControl) {
                console.log('rendering...');
                oRm.write("<div style='height:600px;width:900px;margin:18px;' ");
                oRm.writeControlData(oControl);
                oRm.write(">");
                oRm.renderControl(oControl._html);
                oRm.write("</div>");
            },
            //after initial rendering has been done let KendoUI generate the Grid widget
            onAfterRendering: function () {
                var id = this.getId();
                if (!this.initialized) {
                    $(document).ready(function () {
                        //call the kendoGrid-function to create the grid at the given HTML element
                        $('#' + id).kendoGrid(config.getManagementGridOptions());
                        console.log('onAfterRendering: advarics.Kendo component with Id: ' + id + ' successfully initialized.');
                    });
                }
            }

        });

        _.extend(Grid.prototype, {
            create: function(config) {
               return new advarics.controls.KendoGrid(config);
            }
        });

        return new Grid();

    });
