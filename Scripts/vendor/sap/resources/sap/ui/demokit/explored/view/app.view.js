/*!
 * @copyright@
 */
sap.ui.jsview("sap.ui.demokit.explored.view.app",{getControllerName:function(){return"sap.ui.demokit.explored.view.app"},createContent:function(c){this.setDisplayBlock(true);return new sap.m.SplitApp("splitApp",{afterDetailNavigate:function(){this.hideMaster()}})}});
