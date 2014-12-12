# SAPUI5 / OpenUI5 Demo

This is a very simple demo based on the open-sourced version of SAP's UI5 MVC Framework: <a href="https://sap.github.io/openui5/" target="_blank">OpenUI5</a>

I'm still experimenting with it, so expect some rough edges. However, there are a few
helper modules for easier creation of tables & columns. Also, I used the wonderful <a href="http://www.json-generator.com/" target="_blank">JSON generator</a> to create 1000 example entries to fill the table widget.

Inside the Scripts directory you'll find *advarics/controls* and *advarics/models*. There are the helper methods located.

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
<br/><br />
The 'logic' of this demo is located in *advarics/app.js*.

The steps are:    

    - get JSON data
    - create a new model filled with the data
    - create a new table based on the model
    - initialize new table widget hooked on a certain DIV in index.html

<img src="http://c70.imgup.net/table_demo1301.png" />

I recommend following sites regarding development of SAPUI5/OpenUI5 web apps:

<a href="https://sapui5.netweaver.ondemand.com/sdk/#content/Controls/index.html">SAPUI5 SDK Controls</a>

<a href="http://www.nabisoft.com/tutorials/sapui5/" target="_blank">Nabisoft SAPUI5 Tutorials</a>

<a href="https://sap.github.io/openui5/getstarted.html" target="_blank">GetStarted Page</a> from OpenUI5 Team Github Page

SAP UI5 <a href="https://sapui5.netweaver.ondemand.com/sdk/test-resources/sap/ui/table/demokit/Table.html" target="_blank">Table Widget</a> Documentation

<br />
**Created at**

<a href="http://www.advarics.net" target="_blank">advarics GmbH</a>, Branch Office - Bochum, Germany

**License**

MIT