# SAPUI5 / OpenUI5 Demo

This is a web app based on the open-sourced version of SAP's UI5 MVC Framework: <a href="https://sap.github.io/openui5/" target="_blank">OpenUI5</a>

A live demo is located <a href="http://brakmic.de/openui5/" target="_blank">here</a>.

I'm still experimenting with it, so expect some rough edges. However, there are a few
helper modules for easier creation of tables & columns. Also, I used the wonderful <a href="http://www.json-generator.com/" target="_blank">JSON generator</a> to create 1000 example entries to fill the table widget.

Inside the *Scripts/advarics* directory you'll find *controls*, *models* and *config*

There you'll find helper methods for easier configuration of tables.

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

For easier handling of the many configuration options this demo uses the <a href="http://knockoutjs.com/" target="_blank">Knockout.js</a> library.

Currently there are no separate XML-Views and no Controller logic because the demo comprises of a single table. In future I'll add more 'sophisticated' examples ;)

<br />
The app 'logic' is located in *app.js*.

The steps are:    

    - get the JSON data
    - create a new Model filled with the data
    - create a new Table based on the model
    - create a Shell and give it a Table as a content
    - put the Shell on a DIV named 'app' from index.html

<img src="http://j20.imgup.net/table_demoa3a6.png" />

These sites helped me a lot to create this demo:

<a href="https://sapui5.netweaver.ondemand.com/sdk/#content/Controls/index.html">SAPUI5 SDK Controls</a>

<a href="http://www.nabisoft.com/tutorials/sapui5/" target="_blank">Nabisoft SAPUI5 Tutorials</a>

<a href="https://sap.github.io/openui5/getstarted.html" target="_blank">GetStarted Page</a> from OpenUI5 Team Github Page

SAP UI5 <a href="https://sapui5.netweaver.ondemand.com/sdk/test-resources/sap/ui/table/demokit/Table.html" target="_blank">Table Widget</a> Documentation

<br />
**Created at**

<a href="http://www.advarics.net" target="_blank">advarics GmbH</a>, Branch Office - Bochum, Germany

**License**

MIT