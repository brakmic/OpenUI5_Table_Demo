/*!
 * @copyright@
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var C=function(){};C.render=function(r,c){var a=r;a.write("<div");a.writeControlData(c);a.write(" class='sapUiDKitCSample sapUiShd'");var w=c.getWidth();if(w){a.addStyle("width",w)}a.writeStyles();a.write(">");a.write("<div id='",q.sap.escapeHTML(c.getUiAreaId()),"'");a.write(" class='sapUiBody'");a.write(">");var b=c._oUIArea.getContent();for(var i=0;i<b.length;i++){a.renderControl(b[i])}a.write("</div>");a.write("<div class='sapUiDKitCSampleBorder'>");a.renderControl(c._oShowCodeLink);a.write(" ");a.renderControl(c._oApplyCodeLink);a.write(" ");a.renderControl(c._oCodeViewer);a.write("</div>");a.write("</div>")};return C},true);
