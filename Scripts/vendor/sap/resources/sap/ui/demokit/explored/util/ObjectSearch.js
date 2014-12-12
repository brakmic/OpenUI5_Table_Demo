/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.demokit.explored.util.ObjectSearch");sap.ui.demokit.explored.util.ObjectSearch={getEntityPath:function(d,I){if(!d.entities){return null}var r=null;jQuery.each(d.entities,function(i,e){if(e.id===I){r="/entities/"+i+"/";return false}});return r}};
