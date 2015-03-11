/*!
 * @copyright@
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var C=function(){};C.render=function(r,c){if(!c.getVisible()){return}r.write("<pre");r.writeControlData(c);if(c.getEditable()){r.addClass("sapUiCodeViewer");r.addClass("editable");r.writeAttribute("contentEditable","true")}else{r.addClass("prettyprint")}var h=c.getHeight();if(h){r.addStyle("height",h)}var w=c.getWidth();if(w){r.addStyle("width",w)}r.writeClasses();r.writeStyles();r.write(">");if(c.getSource()){r.write(c.getSource().replace(/</g,'&lt;'))}r.write("</pre>")};return C},true);
