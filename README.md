:christmas_tree: **OpenUI5 + Kendo UI web app** :christmas_tree:

*This web app is based on SAP's <a href="https://sap.github.io/openui5/" target="_blank">OpenUI5</a> and Telerik's <a href="http://www.telerik.com/kendo-ui" target="_blank">Kendo UI</a>.*

A live demo is located <a href="http://brakmic.de/openui5/" target="_blank">here</a>.

It can run under <a href="http://www.iis.net/" target="_blank">IIS</a> or <a href="http://hapijs.com/" target="_blank">HapiJS</a>.

:taxi: **How to run it?**

Either publish the *Visual Studio project* to your IIS server, or run it via *npm start* from the console.

The project itself can either start as a Shell with a few embedded Kendo-Components 
or as a Fiori-like WebApp that uses the "Northwind" OData-Service to show product data in a Master-Detail view.

To start the Shell-Version, go to *Scripts/main.js* and set this call:
<code>
    app.init();
</code>

To start the alternative version use this:
<code>
    app.altInit();
</code>

The object *app* gets called by the <a href="http://www.requirejs.org" target="_blank">RequireJS</a> AMD-Loader after the OpenUI5-libs have been set up.

To compare versions check the screenshots at the bottom.

**Deploying to IIS**

*Mouse right click on project root<br/>
Select "Publish"<br/>
Select a path to your IIS App-dir (it can go over FTP, local path, WebDeploy etc.)<br/>
Upload the files to the directory<br />*

:vertical_traffic_light: **Important steps after the upload to IIS**

By default IIS is not declaring the uploaded directories as "Applications".

One must manually 'convert' them to real IIS-Applications.

Therefore, open the **IIS Management Console** by typing *inetmgr.exe* in a DOS-console or selecting it from *Control Panel/Administrative Tools*

In IIS-Manager right click on the Application directory and choose "Convert to Application".


**Initial setup & running with HapiJS**

<code>
npm install
</code>

<code>
npm start
</code>

When running on **IIS** the server settings are located in *Web.config* from the root directory.

For **HapiJS** the configuration is located in  *Scripts/server.config.js*. Also the *server.js* startup script can be modified.

:warning:

Please note that Kendo Grid belongs to the "Professional" version of Kendo UI and therefore needs a proper license to be used.

Therefore *I'm not providing the copyrighted scripts/styles to avoid violation of Telerik's license terms*.

But there's a 30 day trial available: <a href="http://www.telerik.com/download/kendo-ui" target="_blank">Kendo UI Trial License</a>

The Kendo-Scripts should go into *Scripts/vendor/kendo* directory and CSS-files into *Content/kendo*.

I'm still experimenting with it, so expect some rough edges. However, there are a few
helper modules for easier creation of tables & columns.

**Testing**

<a href="http://jasmine.github.io/2.1/introduction.html" target="_blank">Jasmine 2.1.3</a> and <a href="http://tntim96.github.io/JSCover/" target="_blank">JSCover 1.0.15</a>. 

Jasmine can either be run directly or via JSCover.  I'd recommend JSCover because it not only runs the tests but also generates important code coverage reports.

*Jasmine tests*

<img src="http://c57.imgup.net/jsvocer755a.png" />

*Code coverage report*

<img src="http://k64.imgup.net/jsvocer43a5.png" />

The batch file *tools/jscover-server.bat* starts a local web server on port 8080. You'll need <a href="https://www.java.com/en/download/" target="_blank">Java runtime</a> to execute *JSCover-all.jar* file located in the same directory.

**External services**

To generate sample JSON-data for SAP Table I used <a href="http://www.json-generator.com/" target="_blank">JSON generator</a>.

For Kendo-Grid the public <a href="http://services.odata.org/V3/Northwind/Northwind.svc/" target="_blank">Northwind Service</a> was used.

<a href="http://requirejs.org/" target="_blank">RequireJS</a> is the module loader for all **advarics**-JavaScripts. 

Helper methods

*Scripts/advarics/advarics.controls.js* contains some helper methods for easier configuration of tables and other widgets.

So, instead of using raw
<pre><code>table.addColumn({
    label: [....],
    template: [...],
    sortProperty: [...],
    <i>[...] etc.</i>
    })
</code></pre> you can simply write
<pre>
<code>
    controls.getColumn('ID', 'id');
</code>
</pre> This will create a column of type 'text', map it to the property 'id' of you model and set its title to 'ID'.
For more complex columns you can pass a template and other properties like sorting, filtering etc. Currently, you have to explicitely create template objects. In future relases of this demo I'll provide 
a factory for such cases.

For easier handling of the many configuration options I use <a href="http://knockoutjs.com/" target="_blank">Knockout.js</a> and <a href="http://underscorejs.org/" target="_blank">Underscore.js</a> libraries.

**Crypto functionalities**

For crypto functionalities, like setting HTTP Auth-Headers, the <a href="https://code.google.com/p/crypto-js/" target="_blank">CryptoJS</a> library is available.

**To MVC or not to MVC?**

The Shell-Version is just a container that holds the widgets and utilizes no explicit Controllers, Views or Models.

The alternative, 'Master-Detail' version contains a complete MVC pattern with several Views, Controllers & Models.

**Load & execute order of JavaScripts**

SAP's Scripts are loaded separately and before the
RequireJS starts.

RequireJS starts the app via *advarics/app.js*

Depending on the version being active the app executes as follows:

*Shell Version*

    - get the JSON data
    - create a new Model filled with data
    - create a new Table based on the model
    - create a Shell and give it a Table as a content
    - put the Shell on the BODY Element in index.html
    - when switching to other tabs (Management, Editor) the app will initialize 
      the KendoUI components (Grid/Editor)


*Master-Detail Version*

    - create the main component "App" which boots the whole stuff (OData, MVC, config etc.)
    - insert the App into a component container
    - hook the component container on the BODY Element in index.html
    - watch for URL changes and/or clicks in the View and act accordingly


**SAP Shell**

<img src="http://j20.imgup.net/table_demoa3a6.png" />

**Kendo Grid**
<img src="http://o06.imgup.net/grid883b.png" />

**Kendo Editor**
<img src="http://c13.imgup.net/editor3b10.png" />

**Master-Detail Version**

<img src="http://s07.imgup.net/main_scree9bcc.png" />

**Helpful sites**

<a href="https://sapui5.netweaver.ondemand.com/sdk/#content/Controls/index.html">SAPUI5 SDK Controls</a>

Nabisoft's <a href="http://www.nabisoft.com/tutorials/sapui5/" target="_blank">SAPUI5 Tutorials</a>

<a href="https://sap.github.io/openui5/getstarted.html" target="_blank">Get Started</a> from OpenUI5 Team Github Page

SAP UI5 <a href="https://sapui5.netweaver.ondemand.com/sdk/test-resources/sap/ui/table/demokit/Table.html" target="_blank">Table</a> & <a href="https://openui5.hana.ondemand.com/#test-resources/sap/ui/ux3/demokit/Shell.html" target="_blank">Shell</a> Documentation

<br />
:bulb: **Created at**

<a href="http://www.advarics.net" target="_blank">advarics GmbH</a>, Branch Office - Bochum, Germany

:copyright:

**MIT** (see <a href="https://github.com/brakmic/OpenUI5_Table_Demo/blob/master/LICENSE.md">LICENSE.md</a>)
