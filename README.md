# SAPUI5 / OpenUI5 Demo with Kendo UI

This is a web app based on SAP's MVC Framework <a href="https://sap.github.io/openui5/" target="_blank">OpenUI5</a> and <a href="http://www.telerik.com/kendo-ui" target="_blank">Kendo UI</a> from Telerik.

:turtle: A live demo is located <a href="http://brakmic.de/openui5/" target="_blank">here</a>.

It runs under <a href="http://www.iis.net/" target="_blank">IIS</a> or <a href="http://hapijs.com/" target="_blank">HapiJS</a>.

More detailed info, tutorials & videos on OpenUI5 can be found <a href="https://openui5.zeef.com/harris.brakmic" target="_blank">here</a>.

:taxi: **How to run it?**

Either publish the *Visual Studio project* to your IIS server, or run it via *npm start* from the console.

For **IIS** use:

*Mouse right click on project root<br/>
Select "Publish"<br/>
Select a path to your IIS App-dir (it can go over FTP, local path, WebDeploy etc.)<br/>
Upload the files to the directory<br />*

:wheelchair: **Important steps after the upload to IIS**

By default IIS is not declaring the uploaded directories as "Applications".

One must manually 'convert' them to real IIS-Applications.

Therefore, open the **IIS Management Console** by typing *inetmgr.exe* in a DOS-console or selecting it from *Control Panel/Administrative Tools*

In IIS-Manager right click on the Application directory and choose "Convert to Application".


For **HapiJS** use:

<code>
npm install
</code>

<code>
npm start
</code>

When running on **IIS** the server settings are located in *Web.config* in the root directory.

For **HapiJS** the configuration is located in  *Scripts/server.config.js*. Also the *server.js* startup script can be modified.

:warning: **Important notice**

Please note that Kendo Grid belongs to the "Professional" version of Kendo UI and therefore needs a proper license to be used.

Therefore *I'm not providing the copyrighted scripts/styles to avoid violation of Telerik's license terms*.

But there's a 30 day trial available: <a href="http://www.telerik.com/download/kendo-ui" target="_blank">Kendo UI Trial License</a>

The Kendo-Scripts should go into *Scripts/vendor/kendo* directory and CSS-files into *Content/kendo*.

I'm still experimenting with it, so expect some rough edges. However, there are a few
helper modules for easier creation of tables & columns.

:bomb: **External services**

To generate sample JSON-data for SAP Table I used <a href="http://www.json-generator.com/" target="_blank">JSON generator</a>.

For Kendo-Grid the public <a href="http://services.odata.org/V3/Northwind/Northwind.svc/" target="_blank">Northwind Service</a> was used.

<a href="http://requirejs.org/" target="_blank">RequireJS</a> is the module loader for all **advarics**-JavaScripts. 

**SAP-Scripts**

SAP's Scripts are loaded separately and before the
RequireJS starts.

The scripts are located in *Scripts/advarics* directory.

**Helper methods**

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

For crypto functionalities, like setting HTTP Auth-Headers, the <a href="https://code.google.com/p/crypto-js/" target="_blank">CryptoJS</a> library is available.

Currently there are no separate XML-Views and no Controller logic because the demo comprises of a single Shell instance with embedded widgets.

<br />
RequireJS starts the app from *advarics/app.js*

:airplane: The steps are:

    - get the JSON data
    - create a new Model filled with data
    - create a new Table based on the model
    - create a Shell and give it a Table as a content
    - put the Shell on a DIV named 'app' from index.html
    - when switching to other tabs (Management, Editor) the app will initialize 
      the KendoUI components (Grid/Editor)

**SAP Shell**

<img src="http://j20.imgup.net/table_demoa3a6.png" />

**Kendo Grid**
<img src="http://o06.imgup.net/grid883b.png" />

**Kendo Editor**
<img src="http://c13.imgup.net/editor3b10.png" />

:clap: These sites helped me a lot to create this demo:

<a href="https://sapui5.netweaver.ondemand.com/sdk/#content/Controls/index.html">SAPUI5 SDK Controls</a>

Nabisoft's <a href="http://www.nabisoft.com/tutorials/sapui5/" target="_blank">SAPUI5 Tutorials</a>

<a href="https://sap.github.io/openui5/getstarted.html" target="_blank">Get Started</a> from OpenUI5 Team Github Page

SAP UI5 <a href="https://sapui5.netweaver.ondemand.com/sdk/test-resources/sap/ui/table/demokit/Table.html" target="_blank">Table</a> & <a href="https://openui5.hana.ondemand.com/#test-resources/sap/ui/ux3/demokit/Shell.html" target="_blank">Shell</a> Documentation

<br />
**Created at**

<a href="http://www.advarics.net" target="_blank">advarics GmbH</a>, Branch Office - Bochum, Germany

**License**

**MIT** (see <a href="https://github.com/brakmic/OpenUI5_Table_Demo/blob/master/LICENSE.md">LICENSE.md</a>)
