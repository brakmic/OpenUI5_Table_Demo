define(['underscore',
        'knockout',
        'k/kendo.editor.min',
        'advarics.config'],
    function (_, ko, kendo, config) {
        'use strict';
        var Editor = function () { };

        sap.ui.core.Control.extend("advarics.controls.KendoEditor", {
            metadata: {
                properties: {}
            },
            //put a simple div where the future Kendo Editor will be hooked on
            init: function () {
                this._html = new sap.ui.core.HTML(
                    {
                        content: "<div id='" +
                                    this.getId() + "-advarics-editor'></div>"
                    });
            },
            //render the grid control basics (Kendo Editor will be created in 'onAfterRendering' function)
            renderer: function (oRm, oControl) {
                console.log('rendering...');
                oRm.write("<textarea style=\"height:600px;\" ");
                oRm.writeControlData(oControl);
                oRm.write(">");
                oRm.renderControl(oControl._html);
                oRm.write("</textarea>");
            },
            //after initial rendering has been done let KendoUI generate the Grid widget
            onAfterRendering: function () {
                var id = this.getId();
                if (!this.initialized) {
                    $(document).ready(function () {
                        //$('#' + id).css('padding', '10px');
                        //call kendoEditor-function to create the editor with all tools at the given HTML element
                        $('#' + id).kendoEditor({
                            messages : {
                                insertHtml : "Snippets"
                            },
                            tools: [
                                {
                                    name: "insertHtml",
                                    items: [
                                        { text: "Signature", value: "<p>Best Regards,<br /> Harris Brakmic,<br /><a href='mailto:brakmic@gmail.com'>brakmic@gmail.com</a></p>" },
                                        { text: "advarics GmbH", value: "Visit <a href='http://www.advarics.net'>advarics GmbH</a> " }
                                    ]
                                },
                                "bold",
                                "italic",
                                "underline",
                                "strikethrough",
                                "justifyLeft",
                                "justifyCenter",
                                "justifyRight",
                                "justifyFull",
                                "insertUnorderedList",
                                "insertOrderedList",
                                "indent",
                                "outdent",
                                "createLink",
                                "unlink",
                                "insertImage",
                                "insertFile",
                                "subscript",
                                "superscript",
                                "createTable",
                                "addRowAbove",
                                "addRowBelow",
                                "addColumnLeft",
                                "addColumnRight",
                                "deleteRow",
                                "deleteColumn",
                                "viewHtml",
                                "formatting",
                                "cleanFormatting",
                                "fontName",
                                "fontSize",
                                "foreColor",
                                "backColor"
                            ]
                        });
                        console.log('onAfterRendering: advarics.controls.KendoEditor, Id: ' + id + ', successfully initialized.');
                    });
                }
            }

        });

        _.extend(Editor.prototype, {
            editor: ko.observable(null),
            create: function (config) {
                if (this.editor() == null) {
                    this.editor(new advarics.controls.KendoEditor(config || {}));
                }
                return this.editor();
            }
        });

        return new Editor();
    });