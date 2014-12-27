/* this version shows a single shell with several embedded components (Kendo Grid, Kendo Editor etc.) */
requirejs(['advarics/app'], function (app) {
    console.log('Executing main.js');
    //set helpers for console
    app.setHelpers();
    app.init();  
});