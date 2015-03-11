/*!
 * @copyright@
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var O={getEntityPath:function(d,I){if(!d.entities){return null}var r=null;q.each(d.entities,function(i,e){if(e.id===I){r="/entities/"+i+"/";return false}});return r}};return O},true);
