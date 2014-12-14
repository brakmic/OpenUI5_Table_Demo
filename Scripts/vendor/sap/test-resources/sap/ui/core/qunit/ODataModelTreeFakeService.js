var xhr = sinon.useFakeXMLHttpRequest(),
	baseURL = "../../../../../proxy/http/services.odata.org/V3/Northwind/Northwind.svc/",
	responseDelay = 200,
	_setTimeout = window.setTimeout;

xhr.useFilters = true;
xhr.addFilter(function(method, url) {
	return url.indexOf(baseURL) != 0;
});
xhr.onCreate = function(request) {
	request.onSend = function() {
		if (request.url == baseURL + "$metadata") {
			if (request.async === true) {
				_setTimeout(function() {
					request.respond(200, oMetaDataHeaders, sMetaData);
				}, responseDelay);
			} else {
				request.respond(200, oMetaDataHeaders, sMetaData);
			}
		}
		if (request.url == baseURL + "Employees?$expand=Employees1") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sEmployeesEmployeesXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Employees(2)?$expand=Employees1") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sEmployees2XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Employees(2)/Employees1?$expand=Employees1") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sEmployees2EmployyesXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Employees(5)?$expand=Employees1") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sEmployees5XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Employees(5)/Employees1?$expand=Employees1") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sEmployees5EmployeesXML)
			}, responseDelay); 
		}
	}
};

var oMetaDataHeaders = {
	"Content-Type": "application/xml;charset=utf-8",
	"DataServiceVersion": "1.0;"
};
var oXMLHeaders = 	{
	"Content-Type": "application/atom+xml;charset=utf-8",
	"DataServiceVersion": "2.0;"
};
var oJSONHeaders = 	{
	"Content-Type": "application/json;charset=utf-8",
	"DataServiceVersion": "2.0;"
};
var oCountHeaders = 	{
	"Content-Type": "text/plain;charset=utf-8",
	"DataServiceVersion": "2.0;"
};

var sMetaData = '\
<?xml version="1.0" encoding="utf-8"?>\
<edmx:Edmx Version="1.0"\
	xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">\
	<edmx:DataServices m:DataServiceVersion="1.0"\
		m:MaxDataServiceVersion="3.0"\
		xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">\
		<Schema Namespace="NorthwindModel"\
			xmlns="http://schemas.microsoft.com/ado/2008/09/edm">\
			<EntityType Name="Category">\
				<Key>\
					<PropertyRef Name="CategoryID" />\
				</Key>\
				<Property Name="CategoryID" Type="Edm.Int32" Nullable="false"\
					p6:StoreGeneratedPattern="Identity"\
					xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
				<Property Name="CategoryName" Type="Edm.String" Nullable="false"\
					MaxLength="15" FixedLength="false" Unicode="true" />\
				<Property Name="Description" Type="Edm.String" MaxLength="Max"\
					FixedLength="false" Unicode="true" />\
				<NavigationProperty Name="Products"\
					Relationship="NorthwindModel.FK_Products_Categories" ToRole="Products"\
					FromRole="Categories" />\
			</EntityType>\
			<EntityType Name="CustomerDemographic">\
				<Key>\
					<PropertyRef Name="CustomerTypeID" />\
				</Key>\
				<Property Name="CustomerTypeID" Type="Edm.String" Nullable="false"\
					MaxLength="10" FixedLength="true" Unicode="true" />\
				<Property Name="CustomerDesc" Type="Edm.String" MaxLength="Max"\
					FixedLength="false" Unicode="true" />\
				<NavigationProperty Name="Customers"\
					Relationship="NorthwindModel.CustomerCustomerDemo" ToRole="Customers"\
					FromRole="CustomerDemographics" />\
			</EntityType>\
			<EntityType Name="Customer">\
				<Key>\
					<PropertyRef Name="CustomerID" />\
				</Key>\
				<Property Name="CustomerID" Type="Edm.String" Nullable="false"\
					MaxLength="5" FixedLength="true" Unicode="true" />\
				<Property Name="CompanyName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="ContactName" Type="Edm.String" MaxLength="30"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ContactTitle" Type="Edm.String" MaxLength="30"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Address" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="City" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Region" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="PostalCode" Type="Edm.String" MaxLength="10"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Country" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Phone" Type="Edm.String" MaxLength="24"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Fax" Type="Edm.String" MaxLength="24"\
					FixedLength="false" Unicode="true" />\
				<NavigationProperty Name="Orders"\
					Relationship="NorthwindModel.FK_Orders_Customers" ToRole="Orders"\
					FromRole="Customers" />\
				<NavigationProperty Name="CustomerDemographics"\
					Relationship="NorthwindModel.CustomerCustomerDemo" ToRole="CustomerDemographics"\
					FromRole="Customers" />\
			</EntityType>\
			<EntityType Name="Employee">\
				<Key>\
					<PropertyRef Name="EmployeeID" />\
				</Key>\
				<Property Name="EmployeeID" Type="Edm.Int32" Nullable="false"\
					p6:StoreGeneratedPattern="Identity"\
					xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
				<Property Name="LastName" Type="Edm.String" Nullable="false"\
					MaxLength="20" FixedLength="false" Unicode="true" />\
				<Property Name="FirstName" Type="Edm.String" Nullable="false"\
					MaxLength="10" FixedLength="false" Unicode="true" />\
				<Property Name="Title" Type="Edm.String" MaxLength="30"\
					FixedLength="false" Unicode="true" />\
				<Property Name="TitleOfCourtesy" Type="Edm.String"\
					MaxLength="25" FixedLength="false" Unicode="true" />\
				<Property Name="BirthDate" Type="Edm.DateTime" />\
				<Property Name="HireDate" Type="Edm.DateTime" />\
				<Property Name="Address" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="City" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Region" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="PostalCode" Type="Edm.String" MaxLength="10"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Country" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="HomePhone" Type="Edm.String" MaxLength="24"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Extension" Type="Edm.String" MaxLength="4"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Notes" Type="Edm.String" MaxLength="Max"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ReportsTo" Type="Edm.Int32" />\
				<Property Name="PhotoPath" Type="Edm.String" MaxLength="255"\
					FixedLength="false" Unicode="true" />\
				<NavigationProperty Name="Employees1"\
					Relationship="NorthwindModel.FK_Employees_Employees" ToRole="Employees1"\
					FromRole="Employees" />\
				<NavigationProperty Name="Employee1"\
					Relationship="NorthwindModel.FK_Employees_Employees" ToRole="Employees"\
					FromRole="Employees1" />\
				<NavigationProperty Name="Orders"\
					Relationship="NorthwindModel.FK_Orders_Employees" ToRole="Orders"\
					FromRole="Employees" />\
				<NavigationProperty Name="Territories"\
					Relationship="NorthwindModel.EmployeeTerritories" ToRole="Territories"\
					FromRole="Employees" />\
			</EntityType>\
			<EntityType Name="Order_Detail">\
				<Key>\
					<PropertyRef Name="OrderID" />\
					<PropertyRef Name="ProductID" />\
				</Key>\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false"\
					Precision="19" Scale="4" />\
				<Property Name="Quantity" Type="Edm.Int16" Nullable="false" />\
				<Property Name="Discount" Type="Edm.Single" Nullable="false" />\
				<NavigationProperty Name="Order"\
					Relationship="NorthwindModel.FK_Order_Details_Orders" ToRole="Orders"\
					FromRole="Order_Details" />\
				<NavigationProperty Name="Product"\
					Relationship="NorthwindModel.FK_Order_Details_Products" ToRole="Products"\
					FromRole="Order_Details" />\
			</EntityType>\
			<EntityType Name="Order">\
				<Key>\
					<PropertyRef Name="OrderID" />\
				</Key>\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false"\
					p6:StoreGeneratedPattern="Identity"\
					xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
				<Property Name="CustomerID" Type="Edm.String" MaxLength="5"\
					FixedLength="true" Unicode="true" />\
				<Property Name="EmployeeID" Type="Edm.Int32" />\
				<Property Name="OrderDate" Type="Edm.DateTime" />\
				<Property Name="RequiredDate" Type="Edm.DateTime" />\
				<Property Name="ShippedDate" Type="Edm.DateTime" />\
				<Property Name="ShipVia" Type="Edm.Int32" />\
				<Property Name="Freight" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
				<Property Name="ShipName" Type="Edm.String" MaxLength="40"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipAddress" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipCity" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipRegion" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipPostalCode" Type="Edm.String"\
					MaxLength="10" FixedLength="false" Unicode="true" />\
				<Property Name="ShipCountry" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<NavigationProperty Name="Customer"\
					Relationship="NorthwindModel.FK_Orders_Customers" ToRole="Customers"\
					FromRole="Orders" />\
				<NavigationProperty Name="Employee"\
					Relationship="NorthwindModel.FK_Orders_Employees" ToRole="Employees"\
					FromRole="Orders" />\
				<NavigationProperty Name="Order_Details"\
					Relationship="NorthwindModel.FK_Order_Details_Orders" ToRole="Order_Details"\
					FromRole="Orders" />\
				<NavigationProperty Name="Shipper"\
					Relationship="NorthwindModel.FK_Orders_Shippers" ToRole="Shippers"\
					FromRole="Orders" />\
			</EntityType>\
			<EntityType Name="Product">\
				<Key>\
					<PropertyRef Name="ProductID" />\
				</Key>\
				<Property Name="ProductID" Type="Edm.Int32" Nullable="false"\
					p6:StoreGeneratedPattern="Identity"\
					xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="SupplierID" Type="Edm.Int32" />\
				<Property Name="CategoryID" Type="Edm.Int32" />\
				<Property Name="QuantityPerUnit" Type="Edm.String"\
					MaxLength="20" FixedLength="false" Unicode="true" />\
				<Property Name="UnitPrice" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
				<Property Name="UnitsInStock" Type="Edm.Int16" />\
				<Property Name="UnitsOnOrder" Type="Edm.Int16" />\
				<Property Name="ReorderLevel" Type="Edm.Int16" />\
				<Property Name="Discontinued" Type="Edm.Boolean" Nullable="false" />\
				<NavigationProperty Name="Category"\
					Relationship="NorthwindModel.FK_Products_Categories" ToRole="Categories"\
					FromRole="Products" />\
				<NavigationProperty Name="Order_Details"\
					Relationship="NorthwindModel.FK_Order_Details_Products" ToRole="Order_Details"\
					FromRole="Products" />\
				<NavigationProperty Name="Supplier"\
					Relationship="NorthwindModel.FK_Products_Suppliers" ToRole="Suppliers"\
					FromRole="Products" />\
			</EntityType>\
			<EntityType Name="Region">\
				<Key>\
					<PropertyRef Name="RegionID" />\
				</Key>\
				<Property Name="RegionID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="RegionDescription" Type="Edm.String"\
					Nullable="false" MaxLength="50" FixedLength="true" Unicode="true" />\
				<NavigationProperty Name="Territories"\
					Relationship="NorthwindModel.FK_Territories_Region" ToRole="Territories"\
					FromRole="Region" />\
			</EntityType>\
			<EntityType Name="Shipper">\
				<Key>\
					<PropertyRef Name="ShipperID" />\
				</Key>\
				<Property Name="ShipperID" Type="Edm.Int32" Nullable="false"\
					p6:StoreGeneratedPattern="Identity"\
					xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
				<Property Name="CompanyName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="Phone" Type="Edm.String" MaxLength="24"\
					FixedLength="false" Unicode="true" />\
				<NavigationProperty Name="Orders"\
					Relationship="NorthwindModel.FK_Orders_Shippers" ToRole="Orders"\
					FromRole="Shippers" />\
			</EntityType>\
			<EntityType Name="Supplier">\
				<Key>\
					<PropertyRef Name="SupplierID" />\
				</Key>\
				<Property Name="SupplierID" Type="Edm.Int32" Nullable="false"\
					p6:StoreGeneratedPattern="Identity"\
					xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
				<Property Name="CompanyName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="ContactName" Type="Edm.String" MaxLength="30"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ContactTitle" Type="Edm.String" MaxLength="30"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Address" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="City" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Region" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="PostalCode" Type="Edm.String" MaxLength="10"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Country" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Phone" Type="Edm.String" MaxLength="24"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Fax" Type="Edm.String" MaxLength="24"\
					FixedLength="false" Unicode="true" />\
				<Property Name="HomePage" Type="Edm.String" MaxLength="Max"\
					FixedLength="false" Unicode="true" />\
				<NavigationProperty Name="Products"\
					Relationship="NorthwindModel.FK_Products_Suppliers" ToRole="Products"\
					FromRole="Suppliers" />\
			</EntityType>\
			<EntityType Name="Territory">\
				<Key>\
					<PropertyRef Name="TerritoryID" />\
				</Key>\
				<Property Name="TerritoryID" Type="Edm.String" Nullable="false"\
					MaxLength="20" FixedLength="false" Unicode="true" />\
				<Property Name="TerritoryDescription" Type="Edm.String"\
					Nullable="false" MaxLength="50" FixedLength="true" Unicode="true" />\
				<Property Name="RegionID" Type="Edm.Int32" Nullable="false" />\
				<NavigationProperty Name="Region"\
					Relationship="NorthwindModel.FK_Territories_Region" ToRole="Region"\
					FromRole="Territories" />\
				<NavigationProperty Name="Employees"\
					Relationship="NorthwindModel.EmployeeTerritories" ToRole="Employees"\
					FromRole="Territories" />\
			</EntityType>\
			<EntityType Name="Alphabetical_list_of_product">\
				<Key>\
					<PropertyRef Name="CategoryName" />\
					<PropertyRef Name="Discontinued" />\
					<PropertyRef Name="ProductID" />\
					<PropertyRef Name="ProductName" />\
				</Key>\
				<Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="SupplierID" Type="Edm.Int32" />\
				<Property Name="CategoryID" Type="Edm.Int32" />\
				<Property Name="QuantityPerUnit" Type="Edm.String"\
					MaxLength="20" FixedLength="false" Unicode="true" />\
				<Property Name="UnitPrice" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
				<Property Name="UnitsInStock" Type="Edm.Int16" />\
				<Property Name="UnitsOnOrder" Type="Edm.Int16" />\
				<Property Name="ReorderLevel" Type="Edm.Int16" />\
				<Property Name="Discontinued" Type="Edm.Boolean" Nullable="false" />\
				<Property Name="CategoryName" Type="Edm.String" Nullable="false"\
					MaxLength="15" FixedLength="false" Unicode="true" />\
			</EntityType>\
			<EntityType Name="Category_Sales_for_1997">\
				<Key>\
					<PropertyRef Name="CategoryName" />\
				</Key>\
				<Property Name="CategoryName" Type="Edm.String" Nullable="false"\
					MaxLength="15" FixedLength="false" Unicode="true" />\
				<Property Name="CategorySales" Type="Edm.Decimal"\
					Precision="19" Scale="4" />\
			</EntityType>\
			<EntityType Name="Current_Product_List">\
				<Key>\
					<PropertyRef Name="ProductID" />\
					<PropertyRef Name="ProductName" />\
				</Key>\
				<Property Name="ProductID" Type="Edm.Int32" Nullable="false"\
					p6:StoreGeneratedPattern="Identity"\
					xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
			</EntityType>\
			<EntityType Name="Customer_and_Suppliers_by_City">\
				<Key>\
					<PropertyRef Name="CompanyName" />\
					<PropertyRef Name="Relationship" />\
				</Key>\
				<Property Name="City" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="CompanyName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="ContactName" Type="Edm.String" MaxLength="30"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Relationship" Type="Edm.String" Nullable="false"\
					MaxLength="9" FixedLength="false" Unicode="false" />\
			</EntityType>\
			<EntityType Name="Invoice">\
				<Key>\
					<PropertyRef Name="CustomerName" />\
					<PropertyRef Name="Discount" />\
					<PropertyRef Name="OrderID" />\
					<PropertyRef Name="ProductID" />\
					<PropertyRef Name="ProductName" />\
					<PropertyRef Name="Quantity" />\
					<PropertyRef Name="Salesperson" />\
					<PropertyRef Name="ShipperName" />\
					<PropertyRef Name="UnitPrice" />\
				</Key>\
				<Property Name="ShipName" Type="Edm.String" MaxLength="40"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipAddress" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipCity" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipRegion" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipPostalCode" Type="Edm.String"\
					MaxLength="10" FixedLength="false" Unicode="true" />\
				<Property Name="ShipCountry" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="CustomerID" Type="Edm.String" MaxLength="5"\
					FixedLength="true" Unicode="true" />\
				<Property Name="CustomerName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="Address" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="City" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Region" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="PostalCode" Type="Edm.String" MaxLength="10"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Country" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Salesperson" Type="Edm.String" Nullable="false"\
					MaxLength="31" FixedLength="false" Unicode="true" />\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="OrderDate" Type="Edm.DateTime" />\
				<Property Name="RequiredDate" Type="Edm.DateTime" />\
				<Property Name="ShippedDate" Type="Edm.DateTime" />\
				<Property Name="ShipperName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false"\
					Precision="19" Scale="4" />\
				<Property Name="Quantity" Type="Edm.Int16" Nullable="false" />\
				<Property Name="Discount" Type="Edm.Single" Nullable="false" />\
				<Property Name="ExtendedPrice" Type="Edm.Decimal"\
					Precision="19" Scale="4" />\
				<Property Name="Freight" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
			</EntityType>\
			<EntityType Name="Order_Details_Extended">\
				<Key>\
					<PropertyRef Name="Discount" />\
					<PropertyRef Name="OrderID" />\
					<PropertyRef Name="ProductID" />\
					<PropertyRef Name="ProductName" />\
					<PropertyRef Name="Quantity" />\
					<PropertyRef Name="UnitPrice" />\
				</Key>\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false"\
					Precision="19" Scale="4" />\
				<Property Name="Quantity" Type="Edm.Int16" Nullable="false" />\
				<Property Name="Discount" Type="Edm.Single" Nullable="false" />\
				<Property Name="ExtendedPrice" Type="Edm.Decimal"\
					Precision="19" Scale="4" />\
			</EntityType>\
			<EntityType Name="Order_Subtotal">\
				<Key>\
					<PropertyRef Name="OrderID" />\
				</Key>\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="Subtotal" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
			</EntityType>\
			<EntityType Name="Orders_Qry">\
				<Key>\
					<PropertyRef Name="CompanyName" />\
					<PropertyRef Name="OrderID" />\
				</Key>\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="CustomerID" Type="Edm.String" MaxLength="5"\
					FixedLength="true" Unicode="true" />\
				<Property Name="EmployeeID" Type="Edm.Int32" />\
				<Property Name="OrderDate" Type="Edm.DateTime" />\
				<Property Name="RequiredDate" Type="Edm.DateTime" />\
				<Property Name="ShippedDate" Type="Edm.DateTime" />\
				<Property Name="ShipVia" Type="Edm.Int32" />\
				<Property Name="Freight" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
				<Property Name="ShipName" Type="Edm.String" MaxLength="40"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipAddress" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipCity" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipRegion" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="ShipPostalCode" Type="Edm.String"\
					MaxLength="10" FixedLength="false" Unicode="true" />\
				<Property Name="ShipCountry" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="CompanyName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="Address" Type="Edm.String" MaxLength="60"\
					FixedLength="false" Unicode="true" />\
				<Property Name="City" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Region" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
				<Property Name="PostalCode" Type="Edm.String" MaxLength="10"\
					FixedLength="false" Unicode="true" />\
				<Property Name="Country" Type="Edm.String" MaxLength="15"\
					FixedLength="false" Unicode="true" />\
			</EntityType>\
			<EntityType Name="Product_Sales_for_1997">\
				<Key>\
					<PropertyRef Name="CategoryName" />\
					<PropertyRef Name="ProductName" />\
				</Key>\
				<Property Name="CategoryName" Type="Edm.String" Nullable="false"\
					MaxLength="15" FixedLength="false" Unicode="true" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="ProductSales" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
			</EntityType>\
			<EntityType Name="Products_Above_Average_Price">\
				<Key>\
					<PropertyRef Name="ProductName" />\
				</Key>\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="UnitPrice" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
			</EntityType>\
			<EntityType Name="Products_by_Category">\
				<Key>\
					<PropertyRef Name="CategoryName" />\
					<PropertyRef Name="Discontinued" />\
					<PropertyRef Name="ProductName" />\
				</Key>\
				<Property Name="CategoryName" Type="Edm.String" Nullable="false"\
					MaxLength="15" FixedLength="false" Unicode="true" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="QuantityPerUnit" Type="Edm.String"\
					MaxLength="20" FixedLength="false" Unicode="true" />\
				<Property Name="UnitsInStock" Type="Edm.Int16" />\
				<Property Name="Discontinued" Type="Edm.Boolean" Nullable="false" />\
			</EntityType>\
			<EntityType Name="Sales_by_Category">\
				<Key>\
					<PropertyRef Name="CategoryID" />\
					<PropertyRef Name="CategoryName" />\
					<PropertyRef Name="ProductName" />\
				</Key>\
				<Property Name="CategoryID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="CategoryName" Type="Edm.String" Nullable="false"\
					MaxLength="15" FixedLength="false" Unicode="true" />\
				<Property Name="ProductName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="ProductSales" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
			</EntityType>\
			<EntityType Name="Sales_Totals_by_Amount">\
				<Key>\
					<PropertyRef Name="CompanyName" />\
					<PropertyRef Name="OrderID" />\
				</Key>\
				<Property Name="SaleAmount" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="CompanyName" Type="Edm.String" Nullable="false"\
					MaxLength="40" FixedLength="false" Unicode="true" />\
				<Property Name="ShippedDate" Type="Edm.DateTime" />\
			</EntityType>\
			<EntityType Name="Summary_of_Sales_by_Quarter">\
				<Key>\
					<PropertyRef Name="OrderID" />\
				</Key>\
				<Property Name="ShippedDate" Type="Edm.DateTime" />\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="Subtotal" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
			</EntityType>\
			<EntityType Name="Summary_of_Sales_by_Year">\
				<Key>\
					<PropertyRef Name="OrderID" />\
				</Key>\
				<Property Name="ShippedDate" Type="Edm.DateTime" />\
				<Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
				<Property Name="Subtotal" Type="Edm.Decimal" Precision="19"\
					Scale="4" />\
			</EntityType>\
			<Association Name="FK_Products_Categories">\
				<End Type="NorthwindModel.Category" Role="Categories"\
					Multiplicity="0..1" />\
				<End Type="NorthwindModel.Product" Role="Products" Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Categories">\
						<PropertyRef Name="CategoryID" />\
					</Principal>\
					<Dependent Role="Products">\
						<PropertyRef Name="CategoryID" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="CustomerCustomerDemo">\
				<End Type="NorthwindModel.Customer" Role="Customers"\
					Multiplicity="*" />\
				<End Type="NorthwindModel.CustomerDemographic" Role="CustomerDemographics"\
					Multiplicity="*" />\
			</Association>\
			<Association Name="FK_Orders_Customers">\
				<End Type="NorthwindModel.Customer" Role="Customers"\
					Multiplicity="0..1" />\
				<End Type="NorthwindModel.Order" Role="Orders" Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Customers">\
						<PropertyRef Name="CustomerID" />\
					</Principal>\
					<Dependent Role="Orders">\
						<PropertyRef Name="CustomerID" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="FK_Employees_Employees">\
				<End Type="NorthwindModel.Employee" Role="Employees"\
					Multiplicity="0..1" />\
				<End Type="NorthwindModel.Employee" Role="Employees1"\
					Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Employees">\
						<PropertyRef Name="EmployeeID" />\
					</Principal>\
					<Dependent Role="Employees1">\
						<PropertyRef Name="ReportsTo" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="FK_Orders_Employees">\
				<End Type="NorthwindModel.Employee" Role="Employees"\
					Multiplicity="0..1" />\
				<End Type="NorthwindModel.Order" Role="Orders" Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Employees">\
						<PropertyRef Name="EmployeeID" />\
					</Principal>\
					<Dependent Role="Orders">\
						<PropertyRef Name="EmployeeID" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="EmployeeTerritories">\
				<End Type="NorthwindModel.Territory" Role="Territories"\
					Multiplicity="*" />\
				<End Type="NorthwindModel.Employee" Role="Employees"\
					Multiplicity="*" />\
			</Association>\
			<Association Name="FK_Order_Details_Orders">\
				<End Type="NorthwindModel.Order" Role="Orders" Multiplicity="1" />\
				<End Type="NorthwindModel.Order_Detail" Role="Order_Details"\
					Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Orders">\
						<PropertyRef Name="OrderID" />\
					</Principal>\
					<Dependent Role="Order_Details">\
						<PropertyRef Name="OrderID" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="FK_Order_Details_Products">\
				<End Type="NorthwindModel.Product" Role="Products" Multiplicity="1" />\
				<End Type="NorthwindModel.Order_Detail" Role="Order_Details"\
					Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Products">\
						<PropertyRef Name="ProductID" />\
					</Principal>\
					<Dependent Role="Order_Details">\
						<PropertyRef Name="ProductID" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="FK_Orders_Shippers">\
				<End Type="NorthwindModel.Shipper" Role="Shippers" Multiplicity="0..1" />\
				<End Type="NorthwindModel.Order" Role="Orders" Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Shippers">\
						<PropertyRef Name="ShipperID" />\
					</Principal>\
					<Dependent Role="Orders">\
						<PropertyRef Name="ShipVia" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="FK_Products_Suppliers">\
				<End Type="NorthwindModel.Supplier" Role="Suppliers"\
					Multiplicity="0..1" />\
				<End Type="NorthwindModel.Product" Role="Products" Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Suppliers">\
						<PropertyRef Name="SupplierID" />\
					</Principal>\
					<Dependent Role="Products">\
						<PropertyRef Name="SupplierID" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
			<Association Name="FK_Territories_Region">\
				<End Type="NorthwindModel.Region" Role="Region" Multiplicity="1" />\
				<End Type="NorthwindModel.Territory" Role="Territories"\
					Multiplicity="*" />\
				<ReferentialConstraint>\
					<Principal Role="Region">\
						<PropertyRef Name="RegionID" />\
					</Principal>\
					<Dependent Role="Territories">\
						<PropertyRef Name="RegionID" />\
					</Dependent>\
				</ReferentialConstraint>\
			</Association>\
		</Schema>\
		<Schema Namespace="ODataWebV3.Northwind.Model"\
			xmlns="http://schemas.microsoft.com/ado/2008/09/edm">\
			<EntityContainer Name="NorthwindEntities"\
				m:IsDefaultEntityContainer="true" p6:LazyLoadingEnabled="true"\
				xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation">\
				<EntitySet Name="Categories" EntityType="NorthwindModel.Category" />\
				<EntitySet Name="CustomerDemographics" EntityType="NorthwindModel.CustomerDemographic" />\
				<EntitySet Name="Customers" EntityType="NorthwindModel.Customer" />\
				<EntitySet Name="Employees" EntityType="NorthwindModel.Employee" />\
				<EntitySet Name="Order_Details" EntityType="NorthwindModel.Order_Detail" />\
				<EntitySet Name="Orders" EntityType="NorthwindModel.Order" />\
				<EntitySet Name="Products" EntityType="NorthwindModel.Product" />\
				<EntitySet Name="Regions" EntityType="NorthwindModel.Region" />\
				<EntitySet Name="Shippers" EntityType="NorthwindModel.Shipper" />\
				<EntitySet Name="Suppliers" EntityType="NorthwindModel.Supplier" />\
				<EntitySet Name="Territories" EntityType="NorthwindModel.Territory" />\
				<EntitySet Name="Alphabetical_list_of_products"\
					EntityType="NorthwindModel.Alphabetical_list_of_product" />\
				<EntitySet Name="Category_Sales_for_1997" EntityType="NorthwindModel.Category_Sales_for_1997" />\
				<EntitySet Name="Current_Product_Lists" EntityType="NorthwindModel.Current_Product_List" />\
				<EntitySet Name="Customer_and_Suppliers_by_Cities"\
					EntityType="NorthwindModel.Customer_and_Suppliers_by_City" />\
				<EntitySet Name="Invoices" EntityType="NorthwindModel.Invoice" />\
				<EntitySet Name="Order_Details_Extendeds" EntityType="NorthwindModel.Order_Details_Extended" />\
				<EntitySet Name="Order_Subtotals" EntityType="NorthwindModel.Order_Subtotal" />\
				<EntitySet Name="Orders_Qries" EntityType="NorthwindModel.Orders_Qry" />\
				<EntitySet Name="Product_Sales_for_1997" EntityType="NorthwindModel.Product_Sales_for_1997" />\
				<EntitySet Name="Products_Above_Average_Prices"\
					EntityType="NorthwindModel.Products_Above_Average_Price" />\
				<EntitySet Name="Products_by_Categories" EntityType="NorthwindModel.Products_by_Category" />\
				<EntitySet Name="Sales_by_Categories" EntityType="NorthwindModel.Sales_by_Category" />\
				<EntitySet Name="Sales_Totals_by_Amounts" EntityType="NorthwindModel.Sales_Totals_by_Amount" />\
				<EntitySet Name="Summary_of_Sales_by_Quarters"\
					EntityType="NorthwindModel.Summary_of_Sales_by_Quarter" />\
				<EntitySet Name="Summary_of_Sales_by_Years" EntityType="NorthwindModel.Summary_of_Sales_by_Year" />\
				<AssociationSet Name="FK_Products_Categories"\
					Association="NorthwindModel.FK_Products_Categories">\
					<End Role="Categories" EntitySet="Categories" />\
					<End Role="Products" EntitySet="Products" />\
				</AssociationSet>\
				<AssociationSet Name="CustomerCustomerDemo"\
					Association="NorthwindModel.CustomerCustomerDemo">\
					<End Role="CustomerDemographics" EntitySet="CustomerDemographics" />\
					<End Role="Customers" EntitySet="Customers" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Orders_Customers"\
					Association="NorthwindModel.FK_Orders_Customers">\
					<End Role="Customers" EntitySet="Customers" />\
					<End Role="Orders" EntitySet="Orders" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Employees_Employees"\
					Association="NorthwindModel.FK_Employees_Employees">\
					<End Role="Employees" EntitySet="Employees" />\
					<End Role="Employees1" EntitySet="Employees" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Orders_Employees"\
					Association="NorthwindModel.FK_Orders_Employees">\
					<End Role="Employees" EntitySet="Employees" />\
					<End Role="Orders" EntitySet="Orders" />\
				</AssociationSet>\
				<AssociationSet Name="EmployeeTerritories"\
					Association="NorthwindModel.EmployeeTerritories">\
					<End Role="Employees" EntitySet="Employees" />\
					<End Role="Territories" EntitySet="Territories" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Order_Details_Orders"\
					Association="NorthwindModel.FK_Order_Details_Orders">\
					<End Role="Order_Details" EntitySet="Order_Details" />\
					<End Role="Orders" EntitySet="Orders" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Order_Details_Products"\
					Association="NorthwindModel.FK_Order_Details_Products">\
					<End Role="Order_Details" EntitySet="Order_Details" />\
					<End Role="Products" EntitySet="Products" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Orders_Shippers"\
					Association="NorthwindModel.FK_Orders_Shippers">\
					<End Role="Orders" EntitySet="Orders" />\
					<End Role="Shippers" EntitySet="Shippers" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Products_Suppliers"\
					Association="NorthwindModel.FK_Products_Suppliers">\
					<End Role="Products" EntitySet="Products" />\
					<End Role="Suppliers" EntitySet="Suppliers" />\
				</AssociationSet>\
				<AssociationSet Name="FK_Territories_Region"\
					Association="NorthwindModel.FK_Territories_Region">\
					<End Role="Region" EntitySet="Regions" />\
					<End Role="Territories" EntitySet="Territories" />\
				</AssociationSet>\
			</EntityContainer>\
		</Schema>\
	</edmx:DataServices>\
</edmx:Edmx>\
';

var sEmployeesEmployeesXML = '\
<?xml version="1.0" encoding="utf-8"?>\
<feed xml:base="http://services.odata.org/Northwind/Northwind.svc/"\
	xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\
	xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">\
	<id>http://services.odata.org/Northwind/Northwind.svc/Employees</id>\
	<title type="text">Employees</title>\
	<updated>2013-10-18T05:56:36Z</updated>\
	<link rel="self" title="Employees" href="Employees" />\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(1)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(1)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(1)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(1)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(1)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(1)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(1)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(1)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">1</d:EmployeeID>\
				<d:LastName>Davolio</d:LastName>\
				<d:FirstName>Nancy</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1948-12-08T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1992-05-01T00:00:00</d:HireDate>\
				<d:Address>507 - 20th Ave. E.&#xD;\
					Apt. 2A</d:Address>\
				<d:City>Seattle</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98122</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-9857</d:HomePhone>\
				<d:Extension>5467</d:Extension>\
				<d:Notes>Education includes a BA in psychology from Colorado State\
					University in 1970. She also completed "The Art of the Cold Call."\
					Nancy is a member of Toastmasters International.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(2)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(2)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(2)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(2)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(2)/Employees1" />\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(1)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(1)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(1)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(1)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(1)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(1)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">1</d:EmployeeID>\
								<d:LastName>Davolio</d:LastName>\
								<d:FirstName>Nancy</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1948-12-08T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1992-05-01T00:00:00</d:HireDate>\
								<d:Address>507 - 20th Ave. E.&#xD;\
									Apt. 2A</d:Address>\
								<d:City>Seattle</d:City>\
								<d:Region>WA</d:Region>\
								<d:PostalCode>98122</d:PostalCode>\
								<d:Country>USA</d:Country>\
								<d:HomePhone>(206) 555-9857</d:HomePhone>\
								<d:Extension>5467</d:Extension>\
								<d:Notes>Education includes a BA in psychology from Colorado\
									State University in 1970. She also completed "The Art of the\
									Cold Call." Nancy is a member of Toastmasters International.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(3)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(3)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(3)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(3)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(3)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(3)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">3</d:EmployeeID>\
								<d:LastName>Leverling</d:LastName>\
								<d:FirstName>Janet</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1963-08-30T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1992-04-01T00:00:00</d:HireDate>\
								<d:Address>722 Moss Bay Blvd.</d:Address>\
								<d:City>Kirkland</d:City>\
								<d:Region>WA</d:Region>\
								<d:PostalCode>98033</d:PostalCode>\
								<d:Country>USA</d:Country>\
								<d:HomePhone>(206) 555-3412</d:HomePhone>\
								<d:Extension>3355</d:Extension>\
								<d:Notes>Janet has a BS degree in chemistry from Boston College\
									(1984). She has also completed a certificate program in food\
									retailing management. Janet was hired as a sales associate in\
									1991 and promoted to sales representative in February 1992.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/leverling.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(4)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(4)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(4)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(4)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(4)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(4)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">4</d:EmployeeID>\
								<d:LastName>Peacock</d:LastName>\
								<d:FirstName>Margaret</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Mrs.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1937-09-19T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1993-05-03T00:00:00</d:HireDate>\
								<d:Address>4110 Old Redmond Rd.</d:Address>\
								<d:City>Redmond</d:City>\
								<d:Region>WA</d:Region>\
								<d:PostalCode>98052</d:PostalCode>\
								<d:Country>USA</d:Country>\
								<d:HomePhone>(206) 555-8122</d:HomePhone>\
								<d:Extension>5176</d:Extension>\
								<d:Notes>Margaret holds a BA in English literature from\
									Concordia College (1958) and an MA from the American Institute\
									of Culinary Arts (1966). She was assigned to the London office\
									temporarily from July through November 1992.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/peacock.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(5)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(5)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(5)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(5)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(5)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">5</d:EmployeeID>\
								<d:LastName>Buchanan</d:LastName>\
								<d:FirstName>Steven</d:FirstName>\
								<d:Title>Sales Manager</d:Title>\
								<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1955-03-04T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
								<d:Address>14 Garrett Hill</d:Address>\
								<d:City>London</d:City>\
								<d:Region m:null="true" />\
								<d:PostalCode>SW1 8JR</d:PostalCode>\
								<d:Country>UK</d:Country>\
								<d:HomePhone>(71) 555-4848</d:HomePhone>\
								<d:Extension>3453</d:Extension>\
								<d:Notes>Steven Buchanan graduated from St. Andrews University,\
									Scotland, with a BSC degree in 1976. Upon joining the company\
									as a sales representative in 1992, he spent 6 months in an\
									orientation program at the Seattle office and then returned to\
									his permanent post in London. He was promoted to sales manager\
									in March 1993. Mr. Buchanan has completed the courses\
									"Successful Telemarketing" and "International Sales\
									Management." He is fluent in French.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/buchanan.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(8)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(8)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(8)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(8)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(8)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(8)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">8</d:EmployeeID>\
								<d:LastName>Callahan</d:LastName>\
								<d:FirstName>Laura</d:FirstName>\
								<d:Title>Inside Sales Coordinator</d:Title>\
								<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1958-01-09T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1994-03-05T00:00:00</d:HireDate>\
								<d:Address>4726 - 11th Ave. N.E.</d:Address>\
								<d:City>Seattle</d:City>\
								<d:Region>WA</d:Region>\
								<d:PostalCode>98105</d:PostalCode>\
								<d:Country>USA</d:Country>\
								<d:HomePhone>(206) 555-1189</d:HomePhone>\
								<d:Extension>2344</d:Extension>\
								<d:Notes>Laura received a BA in psychology from the University\
									of Washington. She has also completed a course in business\
									French. She reads and writes French.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(2)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(2)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(2)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">2</d:EmployeeID>\
				<d:LastName>Fuller</d:LastName>\
				<d:FirstName>Andrew</d:FirstName>\
				<d:Title>Vice President, Sales</d:Title>\
				<d:TitleOfCourtesy>Dr.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1952-02-19T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1992-08-14T00:00:00</d:HireDate>\
				<d:Address>908 W. Capital Way</d:Address>\
				<d:City>Tacoma</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98401</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-9482</d:HomePhone>\
				<d:Extension>3457</d:Extension>\
				<d:Notes>Andrew received his BTS commercial in 1974 and a Ph.D. in\
					international marketing from the University of Dallas in 1981. He\
					is fluent in French and Italian and reads German. He joined the\
					company as a sales representative, was promoted to sales manager in\
					January 1992 and to vice president of sales in March 1993. Andrew\
					is a member of the Sales Management Roundtable, the Seattle Chamber\
					of Commerce, and the Pacific Rim Importers Association.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32" m:null="true" />\
				<d:PhotoPath>http://accweb/emmployees/fuller.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(3)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(3)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(3)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(3)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(3)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(3)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(3)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(3)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">3</d:EmployeeID>\
				<d:LastName>Leverling</d:LastName>\
				<d:FirstName>Janet</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1963-08-30T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1992-04-01T00:00:00</d:HireDate>\
				<d:Address>722 Moss Bay Blvd.</d:Address>\
				<d:City>Kirkland</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98033</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-3412</d:HomePhone>\
				<d:Extension>3355</d:Extension>\
				<d:Notes>Janet has a BS degree in chemistry from Boston College\
					(1984). She has also completed a certificate program in food\
					retailing management. Janet was hired as a sales associate in 1991\
					and promoted to sales representative in February 1992.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/leverling.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(4)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(4)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(4)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(4)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(4)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(4)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(4)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(4)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">4</d:EmployeeID>\
				<d:LastName>Peacock</d:LastName>\
				<d:FirstName>Margaret</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Mrs.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1937-09-19T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1993-05-03T00:00:00</d:HireDate>\
				<d:Address>4110 Old Redmond Rd.</d:Address>\
				<d:City>Redmond</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98052</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-8122</d:HomePhone>\
				<d:Extension>5176</d:Extension>\
				<d:Notes>Margaret holds a BA in English literature from Concordia\
					College (1958) and an MA from the American Institute of Culinary\
					Arts (1966). She was assigned to the London office temporarily from\
					July through November 1992.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/peacock.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(5)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(5)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(5)/Employees1" />\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(6)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(6)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(6)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(6)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(6)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(6)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">6</d:EmployeeID>\
								<d:LastName>Suyama</d:LastName>\
								<d:FirstName>Michael</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1963-07-02T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
								<d:Address>Coventry House&#xD;\
									Miner Rd.</d:Address>\
								<d:City>London</d:City>\
								<d:Region m:null="true" />\
								<d:PostalCode>EC2 7JR</d:PostalCode>\
								<d:Country>UK</d:Country>\
								<d:HomePhone>(71) 555-7773</d:HomePhone>\
								<d:Extension>428</d:Extension>\
								<d:Notes>Michael is a graduate of Sussex University (MA,\
									economics, 1983) and the University of California at Los\
									Angeles (MBA, marketing, 1986). He has also taken the courses\
									"Multi-Cultural Selling" and "Time Management for the Sales\
									Professional." He is fluent in Japanese and can read and write\
									French, Portuguese, and Spanish.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(7)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(7)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(7)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(7)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(7)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(7)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">7</d:EmployeeID>\
								<d:LastName>King</d:LastName>\
								<d:FirstName>Robert</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1960-05-29T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1994-01-02T00:00:00</d:HireDate>\
								<d:Address>Edgeham Hollow&#xD;\
									Winchester Way</d:Address>\
								<d:City>London</d:City>\
								<d:Region m:null="true" />\
								<d:PostalCode>RG1 9SP</d:PostalCode>\
								<d:Country>UK</d:Country>\
								<d:HomePhone>(71) 555-5598</d:HomePhone>\
								<d:Extension>465</d:Extension>\
								<d:Notes>Robert King served in the Peace Corps and traveled\
									extensively before completing his degree in English at the\
									University of Michigan in 1992, the year he joined the company.\
									After completing a course entitled "Selling in Europe," he was\
									transferred to the London office in March 1993.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(9)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(9)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(9)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(9)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(9)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(9)/Territories" />\
						<title />\
						<updated>2013-10-18T05:56:36Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">9</d:EmployeeID>\
								<d:LastName>Dodsworth</d:LastName>\
								<d:FirstName>Anne</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1966-01-27T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1994-11-15T00:00:00</d:HireDate>\
								<d:Address>7 Houndstooth Rd.</d:Address>\
								<d:City>London</d:City>\
								<d:Region m:null="true" />\
								<d:PostalCode>WG2 7LT</d:PostalCode>\
								<d:Country>UK</d:Country>\
								<d:HomePhone>(71) 555-4444</d:HomePhone>\
								<d:Extension>452</d:Extension>\
								<d:Notes>Anne has a BA degree in English from St. Lawrence\
									College. She is fluent in French and German.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(5)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(5)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(5)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">5</d:EmployeeID>\
				<d:LastName>Buchanan</d:LastName>\
				<d:FirstName>Steven</d:FirstName>\
				<d:Title>Sales Manager</d:Title>\
				<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1955-03-04T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
				<d:Address>14 Garrett Hill</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>SW1 8JR</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-4848</d:HomePhone>\
				<d:Extension>3453</d:Extension>\
				<d:Notes>Steven Buchanan graduated from St. Andrews University,\
					Scotland, with a BSC degree in 1976. Upon joining the company as a\
					sales representative in 1992, he spent 6 months in an orientation\
					program at the Seattle office and then returned to his permanent\
					post in London. He was promoted to sales manager in March 1993. Mr.\
					Buchanan has completed the courses "Successful Telemarketing" and\
					"International Sales Management." He is fluent in French.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/buchanan.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(6)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(6)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(6)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(6)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(6)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(6)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(6)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(6)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">6</d:EmployeeID>\
				<d:LastName>Suyama</d:LastName>\
				<d:FirstName>Michael</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1963-07-02T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
				<d:Address>Coventry House&#xD;\
					Miner Rd.</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>EC2 7JR</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-7773</d:HomePhone>\
				<d:Extension>428</d:Extension>\
				<d:Notes>Michael is a graduate of Sussex University (MA, economics,\
					1983) and the University of California at Los Angeles (MBA,\
					marketing, 1986). He has also taken the courses "Multi-Cultural\
					Selling" and "Time Management for the Sales Professional." He is\
					fluent in Japanese and can read and write French, Portuguese, and\
					Spanish.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(7)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(7)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(7)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(7)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(7)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(7)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(7)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(7)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">7</d:EmployeeID>\
				<d:LastName>King</d:LastName>\
				<d:FirstName>Robert</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1960-05-29T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1994-01-02T00:00:00</d:HireDate>\
				<d:Address>Edgeham Hollow&#xD;\
					Winchester Way</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>RG1 9SP</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-5598</d:HomePhone>\
				<d:Extension>465</d:Extension>\
				<d:Notes>Robert King served in the Peace Corps and traveled\
					extensively before completing his degree in English at the\
					University of Michigan in 1992, the year he joined the company.\
					After completing a course entitled "Selling in Europe," he was\
					transferred to the London office in March 1993.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(8)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(8)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(8)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(8)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(8)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(8)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(8)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(8)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">8</d:EmployeeID>\
				<d:LastName>Callahan</d:LastName>\
				<d:FirstName>Laura</d:FirstName>\
				<d:Title>Inside Sales Coordinator</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1958-01-09T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1994-03-05T00:00:00</d:HireDate>\
				<d:Address>4726 - 11th Ave. N.E.</d:Address>\
				<d:City>Seattle</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98105</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-1189</d:HomePhone>\
				<d:Extension>2344</d:Extension>\
				<d:Notes>Laura received a BA in psychology from the University of\
					Washington. She has also completed a course in business French. She\
					reads and writes French.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(9)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(9)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(9)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(9)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-18T05:56:36Z</updated>\
					<link rel="self" title="Employees1" href="Employees(9)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(9)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(9)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(9)/Territories" />\
		<title />\
		<updated>2013-10-18T05:56:36Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">9</d:EmployeeID>\
				<d:LastName>Dodsworth</d:LastName>\
				<d:FirstName>Anne</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1966-01-27T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1994-11-15T00:00:00</d:HireDate>\
				<d:Address>7 Houndstooth Rd.</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>WG2 7LT</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-4444</d:HomePhone>\
				<d:Extension>452</d:Extension>\
				<d:Notes>Anne has a BA degree in English from St. Lawrence College.\
					She is fluent in French and German.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
</feed>\
';

var sEmployees2XML = '\
<?xml version="1.0" encoding="utf-8"?>\
<entry xml:base="http://services.odata.org/Northwind/Northwind.svc/"\
	xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\
	xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">\
	<id>http://services.odata.org/Northwind/Northwind.svc/Employees(2)</id>\
	<category term="NorthwindModel.Employee"\
		scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
	<link rel="edit" title="Employee" href="Employees(2)" />\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
		type="application/atom+xml;type=feed" title="Employees1" href="Employees(2)/Employees1">\
		<m:inline>\
			<feed>\
				<id>http://services.odata.org/Northwind/Northwind.svc/Employees(2)/Employees1\
				</id>\
				<title type="text">Employees1</title>\
				<updated>2013-10-15T07:04:00Z</updated>\
				<link rel="self" title="Employees1" href="Employees(2)/Employees1" />\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(1)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(1)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(1)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(1)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(1)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(1)/Territories" />\
					<title />\
					<updated>2013-10-15T07:04:00Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">1</d:EmployeeID>\
							<d:LastName>Davolio</d:LastName>\
							<d:FirstName>Nancy</d:FirstName>\
							<d:Title>Sales Representative</d:Title>\
							<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1948-12-08T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1992-05-01T00:00:00</d:HireDate>\
							<d:Address>507 - 20th Ave. E.&#xD;\
								Apt. 2A\
							</d:Address>\
							<d:City>Seattle</d:City>\
							<d:Region>WA</d:Region>\
							<d:PostalCode>98122</d:PostalCode>\
							<d:Country>USA</d:Country>\
							<d:HomePhone>(206) 555-9857</d:HomePhone>\
							<d:Extension>5467</d:Extension>\
							<d:Notes>Education includes a BA in psychology from Colorado\
								State University in 1970. She also completed "The Art of the\
								Cold Call." Nancy is a member of Toastmasters International.\
							</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(3)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(3)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(3)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(3)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(3)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(3)/Territories" />\
					<title />\
					<updated>2013-10-15T07:04:00Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">3</d:EmployeeID>\
							<d:LastName>Leverling</d:LastName>\
							<d:FirstName>Janet</d:FirstName>\
							<d:Title>Sales Representative</d:Title>\
							<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1963-08-30T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1992-04-01T00:00:00</d:HireDate>\
							<d:Address>722 Moss Bay Blvd.</d:Address>\
							<d:City>Kirkland</d:City>\
							<d:Region>WA</d:Region>\
							<d:PostalCode>98033</d:PostalCode>\
							<d:Country>USA</d:Country>\
							<d:HomePhone>(206) 555-3412</d:HomePhone>\
							<d:Extension>3355</d:Extension>\
							<d:Notes>Janet has a BS degree in chemistry from Boston College\
								(1984). She has also completed a certificate program in food\
								retailing management. Janet was hired as a sales associate in\
								1991 and promoted to sales representative in February 1992.\
							</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/leverling.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(4)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(4)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(4)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(4)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(4)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(4)/Territories" />\
					<title />\
					<updated>2013-10-15T07:04:00Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">4</d:EmployeeID>\
							<d:LastName>Peacock</d:LastName>\
							<d:FirstName>Margaret</d:FirstName>\
							<d:Title>Sales Representative</d:Title>\
							<d:TitleOfCourtesy>Mrs.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1937-09-19T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1993-05-03T00:00:00</d:HireDate>\
							<d:Address>4110 Old Redmond Rd.</d:Address>\
							<d:City>Redmond</d:City>\
							<d:Region>WA</d:Region>\
							<d:PostalCode>98052</d:PostalCode>\
							<d:Country>USA</d:Country>\
							<d:HomePhone>(206) 555-8122</d:HomePhone>\
							<d:Extension>5176</d:Extension>\
							<d:Notes>Margaret holds a BA in English literature from Concordia\
								College (1958) and an MA from the American Institute of Culinary\
								Arts (1966). She was assigned to the London office temporarily\
								from July through November 1992.</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/peacock.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(5)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(5)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(5)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(5)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(5)/Territories" />\
					<title />\
					<updated>2013-10-15T07:04:00Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">5</d:EmployeeID>\
							<d:LastName>Buchanan</d:LastName>\
							<d:FirstName>Steven</d:FirstName>\
							<d:Title>Sales Manager</d:Title>\
							<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1955-03-04T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
							<d:Address>14 Garrett Hill</d:Address>\
							<d:City>London</d:City>\
							<d:Region m:null="true" />\
							<d:PostalCode>SW1 8JR</d:PostalCode>\
							<d:Country>UK</d:Country>\
							<d:HomePhone>(71) 555-4848</d:HomePhone>\
							<d:Extension>3453</d:Extension>\
							<d:Notes>Steven Buchanan graduated from St. Andrews University,\
								Scotland, with a BSC degree in 1976. Upon joining the company as\
								a sales representative in 1992, he spent 6 months in an\
								orientation program at the Seattle office and then returned to\
								his permanent post in London. He was promoted to sales manager\
								in March 1993. Mr. Buchanan has completed the courses\
								"Successful Telemarketing" and "International Sales Management."\
								He is fluent in French.</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/buchanan.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(8)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(8)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(8)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(8)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(8)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(8)/Territories" />\
					<title />\
					<updated>2013-10-15T07:04:00Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">8</d:EmployeeID>\
							<d:LastName>Callahan</d:LastName>\
							<d:FirstName>Laura</d:FirstName>\
							<d:Title>Inside Sales Coordinator</d:Title>\
							<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1958-01-09T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1994-03-05T00:00:00</d:HireDate>\
							<d:Address>4726 - 11th Ave. N.E.</d:Address>\
							<d:City>Seattle</d:City>\
							<d:Region>WA</d:Region>\
							<d:PostalCode>98105</d:PostalCode>\
							<d:Country>USA</d:Country>\
							<d:HomePhone>(206) 555-1189</d:HomePhone>\
							<d:Extension>2344</d:Extension>\
							<d:Notes>Laura received a BA in psychology from the University of\
								Washington. She has also completed a course in business French.\
								She reads and writes French.</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
			</feed>\
		</m:inline>\
	</link>\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
		type="application/atom+xml;type=entry" title="Employee1" href="Employees(2)/Employee1" />\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
		type="application/atom+xml;type=feed" title="Orders" href="Employees(2)/Orders" />\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
		type="application/atom+xml;type=feed" title="Territories" href="Employees(2)/Territories" />\
	<title />\
	<updated>2013-10-15T07:04:00Z</updated>\
	<author>\
		<name />\
	</author>\
	<content type="application/xml">\
		<m:properties>\
			<d:EmployeeID m:type="Edm.Int32">2</d:EmployeeID>\
			<d:LastName>Fuller</d:LastName>\
			<d:FirstName>Andrew</d:FirstName>\
			<d:Title>Vice President, Sales</d:Title>\
			<d:TitleOfCourtesy>Dr.</d:TitleOfCourtesy>\
			<d:BirthDate m:type="Edm.DateTime">1952-02-19T00:00:00</d:BirthDate>\
			<d:HireDate m:type="Edm.DateTime">1992-08-14T00:00:00</d:HireDate>\
			<d:Address>908 W. Capital Way</d:Address>\
			<d:City>Tacoma</d:City>\
			<d:Region>WA</d:Region>\
			<d:PostalCode>98401</d:PostalCode>\
			<d:Country>USA</d:Country>\
			<d:HomePhone>(206) 555-9482</d:HomePhone>\
			<d:Extension>3457</d:Extension>\
			<d:Notes>Andrew received his BTS commercial in 1974 and a Ph.D. in\
				international marketing from the University of Dallas in 1981. He is\
				fluent in French and Italian and reads German. He joined the company\
				as a sales representative, was promoted to sales manager in January\
				1992 and to vice president of sales in March 1993. Andrew is a\
				member of the Sales Management Roundtable, the Seattle Chamber of\
				Commerce, and the Pacific Rim Importers Association.</d:Notes>\
			<d:ReportsTo m:type="Edm.Int32" m:null="true" />\
			<d:PhotoPath>http://accweb/emmployees/fuller.bmp</d:PhotoPath>\
		</m:properties>\
	</content>\
</entry>\
';

var sEmployees5XML = '\
<?xml version="1.0" encoding="utf-8"?>\
<entry xml:base="http://services.odata.org/Northwind/Northwind.svc/"\
	xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\
	xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">\
	<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)</id>\
	<category term="NorthwindModel.Employee"\
		scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
	<link rel="edit" title="Employee" href="Employees(5)" />\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
		type="application/atom+xml;type=feed" title="Employees1" href="Employees(5)/Employees1">\
		<m:inline>\
			<feed>\
				<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)/Employees1</id>\
				<title type="text">Employees1</title>\
				<updated>2013-10-15T07:10:49Z</updated>\
				<link rel="self" title="Employees1" href="Employees(5)/Employees1" />\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(6)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(6)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(6)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(6)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(6)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(6)/Territories" />\
					<title />\
					<updated>2013-10-15T07:10:49Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">6</d:EmployeeID>\
							<d:LastName>Suyama</d:LastName>\
							<d:FirstName>Michael</d:FirstName>\
							<d:Title>Sales Representative</d:Title>\
							<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1963-07-02T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
							<d:Address>Coventry House&#xD;\
								Miner Rd.\
							</d:Address>\
							<d:City>London</d:City>\
							<d:Region m:null="true" />\
							<d:PostalCode>EC2 7JR</d:PostalCode>\
							<d:Country>UK</d:Country>\
							<d:HomePhone>(71) 555-7773</d:HomePhone>\
							<d:Extension>428</d:Extension>\
							<d:Notes>Michael is a graduate of Sussex University (MA,\
								economics, 1983) and the University of California at Los Angeles\
								(MBA, marketing, 1986). He has also taken the courses\
								"Multi-Cultural Selling" and "Time Management for the Sales\
								Professional." He is fluent in Japanese and can read and write\
								French, Portuguese, and Spanish.\
							</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(7)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(7)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(7)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(7)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(7)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(7)/Territories" />\
					<title />\
					<updated>2013-10-15T07:10:49Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">7</d:EmployeeID>\
							<d:LastName>King</d:LastName>\
							<d:FirstName>Robert</d:FirstName>\
							<d:Title>Sales Representative</d:Title>\
							<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1960-05-29T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1994-01-02T00:00:00</d:HireDate>\
							<d:Address>Edgeham Hollow&#xD;\
								Winchester Way\
							</d:Address>\
							<d:City>London</d:City>\
							<d:Region m:null="true" />\
							<d:PostalCode>RG1 9SP</d:PostalCode>\
							<d:Country>UK</d:Country>\
							<d:HomePhone>(71) 555-5598</d:HomePhone>\
							<d:Extension>465</d:Extension>\
							<d:Notes>Robert King served in the Peace Corps and traveled\
								extensively before completing his degree in English at the\
								University of Michigan in 1992, the year he joined the company.\
								After completing a course entitled "Selling in Europe," he was\
								transferred to the London office in March 1993.\
							</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
				<entry>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(9)</id>\
					<category term="NorthwindModel.Employee"\
						scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
					<link rel="edit" title="Employee" href="Employees(9)" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
						type="application/atom+xml;type=feed" title="Employees1"\
						href="Employees(9)/Employees1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
						type="application/atom+xml;type=entry" title="Employee1"\
						href="Employees(9)/Employee1" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
						type="application/atom+xml;type=feed" title="Orders" href="Employees(9)/Orders" />\
					<link\
						rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
						type="application/atom+xml;type=feed" title="Territories"\
						href="Employees(9)/Territories" />\
					<title />\
					<updated>2013-10-15T07:10:49Z</updated>\
					<author>\
						<name />\
					</author>\
					<content type="application/xml">\
						<m:properties>\
							<d:EmployeeID m:type="Edm.Int32">9</d:EmployeeID>\
							<d:LastName>Dodsworth</d:LastName>\
							<d:FirstName>Anne</d:FirstName>\
							<d:Title>Sales Representative</d:Title>\
							<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
							<d:BirthDate m:type="Edm.DateTime">1966-01-27T00:00:00</d:BirthDate>\
							<d:HireDate m:type="Edm.DateTime">1994-11-15T00:00:00</d:HireDate>\
							<d:Address>7 Houndstooth Rd.</d:Address>\
							<d:City>London</d:City>\
							<d:Region m:null="true" />\
							<d:PostalCode>WG2 7LT</d:PostalCode>\
							<d:Country>UK</d:Country>\
							<d:HomePhone>(71) 555-4444</d:HomePhone>\
							<d:Extension>452</d:Extension>\
							<d:Notes>Anne has a BA degree in English from St. Lawrence\
								College. She is fluent in French and German.\
							</d:Notes>\
							<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
							<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
						</m:properties>\
					</content>\
				</entry>\
			</feed>\
		</m:inline>\
	</link>\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
		type="application/atom+xml;type=entry" title="Employee1" href="Employees(5)/Employee1" />\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
		type="application/atom+xml;type=feed" title="Orders" href="Employees(5)/Orders" />\
	<link\
		rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
		type="application/atom+xml;type=feed" title="Territories" href="Employees(5)/Territories" />\
	<title />\
	<updated>2013-10-15T07:10:49Z</updated>\
	<author>\
		<name />\
	</author>\
	<content type="application/xml">\
		<m:properties>\
			<d:EmployeeID m:type="Edm.Int32">5</d:EmployeeID>\
			<d:LastName>Buchanan</d:LastName>\
			<d:FirstName>Steven</d:FirstName>\
			<d:Title>Sales Manager</d:Title>\
			<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
			<d:BirthDate m:type="Edm.DateTime">1955-03-04T00:00:00</d:BirthDate>\
			<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
			<d:Address>14 Garrett Hill</d:Address>\
			<d:City>London</d:City>\
			<d:Region m:null="true" />\
			<d:PostalCode>SW1 8JR</d:PostalCode>\
			<d:Country>UK</d:Country>\
			<d:HomePhone>(71) 555-4848</d:HomePhone>\
			<d:Extension>3453</d:Extension>\
			<d:Notes>Steven Buchanan graduated from St. Andrews University,\
				Scotland, with a BSC degree in 1976. Upon joining the company as a\
				sales representative in 1992, he spent 6 months in an orientation\
				program at the Seattle office and then returned to his permanent\
				post in London. He was promoted to sales manager in March 1993. Mr.\
				Buchanan has completed the courses "Successful Telemarketing" and\
				"International Sales Management." He is fluent in French.\
			</d:Notes>\
			<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
			<d:PhotoPath>http://accweb/emmployees/buchanan.bmp</d:PhotoPath>\
		</m:properties>\
	</content>\
</entry>\
';

var sEmployees2EmployyesXML = '\
<?xml version="1.0" encoding="utf-8"?>\
<feed xml:base="http://services.odata.org/Northwind/Northwind.svc/"\
	xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\
	xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">\
	<id>http://services.odata.org/Northwind/Northwind.svc/Employees(2)/Employees1</id>\
	<title type="text">Employees1</title>\
	<updated>2013-10-17T12:04:01Z</updated>\
	<link rel="self" title="Employees1" href="Employees1" />\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(1)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(1)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(1)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(1)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:04:01Z</updated>\
					<link rel="self" title="Employees1" href="Employees(1)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(1)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(1)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(1)/Territories" />\
		<title />\
		<updated>2013-10-17T12:04:01Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">1</d:EmployeeID>\
				<d:LastName>Davolio</d:LastName>\
				<d:FirstName>Nancy</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1948-12-08T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1992-05-01T00:00:00</d:HireDate>\
				<d:Address>507 - 20th Ave. E.&#xD;\
					Apt. 2A\
				</d:Address>\
				<d:City>Seattle</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98122</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-9857</d:HomePhone>\
				<d:Extension>5467</d:Extension>\
				<d:Notes>Education includes a BA in psychology from Colorado State\
					University in 1970. She also completed "The Art of the Cold Call."\
					Nancy is a member of Toastmasters International.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(3)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(3)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(3)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(3)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:04:01Z</updated>\
					<link rel="self" title="Employees1" href="Employees(3)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(3)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(3)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(3)/Territories" />\
		<title />\
		<updated>2013-10-17T12:04:01Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">3</d:EmployeeID>\
				<d:LastName>Leverling</d:LastName>\
				<d:FirstName>Janet</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1963-08-30T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1992-04-01T00:00:00</d:HireDate>\
				<d:Address>722 Moss Bay Blvd.</d:Address>\
				<d:City>Kirkland</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98033</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-3412</d:HomePhone>\
				<d:Extension>3355</d:Extension>\
				<d:Notes>Janet has a BS degree in chemistry from Boston College\
					(1984). She has also completed a certificate program in food\
					retailing management. Janet was hired as a sales associate in 1991\
					and promoted to sales representative in February 1992.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/leverling.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(4)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(4)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(4)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(4)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:04:01Z</updated>\
					<link rel="self" title="Employees1" href="Employees(4)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(4)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(4)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(4)/Territories" />\
		<title />\
		<updated>2013-10-17T12:04:01Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">4</d:EmployeeID>\
				<d:LastName>Peacock</d:LastName>\
				<d:FirstName>Margaret</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Mrs.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1937-09-19T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1993-05-03T00:00:00</d:HireDate>\
				<d:Address>4110 Old Redmond Rd.</d:Address>\
				<d:City>Redmond</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98052</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-8122</d:HomePhone>\
				<d:Extension>5176</d:Extension>\
				<d:Notes>Margaret holds a BA in English literature from Concordia\
					College (1958) and an MA from the American Institute of Culinary\
					Arts (1966). She was assigned to the London office temporarily from\
					July through November 1992.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/peacock.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(5)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(5)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:04:01Z</updated>\
					<link rel="self" title="Employees1" href="Employees(5)/Employees1" />\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(6)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(6)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(6)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(6)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(6)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(6)/Territories" />\
						<title />\
						<updated>2013-10-17T12:04:01Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">6</d:EmployeeID>\
								<d:LastName>Suyama</d:LastName>\
								<d:FirstName>Michael</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1963-07-02T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
								<d:Address>Coventry House&#xD;\
									Miner Rd.\
								</d:Address>\
								<d:City>London</d:City>\
								<d:Region m:null="true" />\
								<d:PostalCode>EC2 7JR</d:PostalCode>\
								<d:Country>UK</d:Country>\
								<d:HomePhone>(71) 555-7773</d:HomePhone>\
								<d:Extension>428</d:Extension>\
								<d:Notes>Michael is a graduate of Sussex University (MA,\
									economics, 1983) and the University of California at Los\
									Angeles (MBA, marketing, 1986). He has also taken the courses\
									"Multi-Cultural Selling" and "Time Management for the Sales\
									Professional." He is fluent in Japanese and can read and write\
									French, Portuguese, and Spanish.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(7)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(7)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(7)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(7)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(7)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(7)/Territories" />\
						<title />\
						<updated>2013-10-17T12:04:01Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">7</d:EmployeeID>\
								<d:LastName>King</d:LastName>\
								<d:FirstName>Robert</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1960-05-29T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1994-01-02T00:00:00</d:HireDate>\
								<d:Address>Edgeham Hollow&#xD;\
									Winchester Way\
								</d:Address>\
								<d:City>London</d:City>\
								<d:Region m:null="true" />\
								<d:PostalCode>RG1 9SP</d:PostalCode>\
								<d:Country>UK</d:Country>\
								<d:HomePhone>(71) 555-5598</d:HomePhone>\
								<d:Extension>465</d:Extension>\
								<d:Notes>Robert King served in the Peace Corps and traveled\
									extensively before completing his degree in English at the\
									University of Michigan in 1992, the year he joined the company.\
									After completing a course entitled "Selling in Europe," he was\
									transferred to the London office in March 1993.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
					<entry>\
						<id>http://services.odata.org/Northwind/Northwind.svc/Employees(9)</id>\
						<category term="NorthwindModel.Employee"\
							scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
						<link rel="edit" title="Employee" href="Employees(9)" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
							type="application/atom+xml;type=feed" title="Employees1"\
							href="Employees(9)/Employees1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
							type="application/atom+xml;type=entry" title="Employee1"\
							href="Employees(9)/Employee1" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
							type="application/atom+xml;type=feed" title="Orders" href="Employees(9)/Orders" />\
						<link\
							rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
							type="application/atom+xml;type=feed" title="Territories"\
							href="Employees(9)/Territories" />\
						<title />\
						<updated>2013-10-17T12:04:01Z</updated>\
						<author>\
							<name />\
						</author>\
						<content type="application/xml">\
							<m:properties>\
								<d:EmployeeID m:type="Edm.Int32">9</d:EmployeeID>\
								<d:LastName>Dodsworth</d:LastName>\
								<d:FirstName>Anne</d:FirstName>\
								<d:Title>Sales Representative</d:Title>\
								<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
								<d:BirthDate m:type="Edm.DateTime">1966-01-27T00:00:00</d:BirthDate>\
								<d:HireDate m:type="Edm.DateTime">1994-11-15T00:00:00</d:HireDate>\
								<d:Address>7 Houndstooth Rd.</d:Address>\
								<d:City>London</d:City>\
								<d:Region m:null="true" />\
								<d:PostalCode>WG2 7LT</d:PostalCode>\
								<d:Country>UK</d:Country>\
								<d:HomePhone>(71) 555-4444</d:HomePhone>\
								<d:Extension>452</d:Extension>\
								<d:Notes>Anne has a BA degree in English from St. Lawrence\
									College. She is fluent in French and German.</d:Notes>\
								<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
								<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
							</m:properties>\
						</content>\
					</entry>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(5)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(5)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(5)/Territories" />\
		<title />\
		<updated>2013-10-17T12:04:01Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">5</d:EmployeeID>\
				<d:LastName>Buchanan</d:LastName>\
				<d:FirstName>Steven</d:FirstName>\
				<d:Title>Sales Manager</d:Title>\
				<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1955-03-04T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
				<d:Address>14 Garrett Hill</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>SW1 8JR</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-4848</d:HomePhone>\
				<d:Extension>3453</d:Extension>\
				<d:Notes>Steven Buchanan graduated from St. Andrews University,\
					Scotland, with a BSC degree in 1976. Upon joining the company as a\
					sales representative in 1992, he spent 6 months in an orientation\
					program at the Seattle office and then returned to his permanent\
					post in London. He was promoted to sales manager in March 1993. Mr.\
					Buchanan has completed the courses "Successful Telemarketing" and\
					"International Sales Management." He is fluent in French.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/buchanan.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(8)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(8)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(8)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(8)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:04:01Z</updated>\
					<link rel="self" title="Employees1" href="Employees(8)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(8)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(8)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(8)/Territories" />\
		<title />\
		<updated>2013-10-17T12:04:01Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">8</d:EmployeeID>\
				<d:LastName>Callahan</d:LastName>\
				<d:FirstName>Laura</d:FirstName>\
				<d:Title>Inside Sales Coordinator</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1958-01-09T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1994-03-05T00:00:00</d:HireDate>\
				<d:Address>4726 - 11th Ave. N.E.</d:Address>\
				<d:City>Seattle</d:City>\
				<d:Region>WA</d:Region>\
				<d:PostalCode>98105</d:PostalCode>\
				<d:Country>USA</d:Country>\
				<d:HomePhone>(206) 555-1189</d:HomePhone>\
				<d:Extension>2344</d:Extension>\
				<d:Notes>Laura received a BA in psychology from the University of\
					Washington. She has also completed a course in business French. She\
					reads and writes French.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">2</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
</feed>\
';

var sEmployees5EmployeesXML = '\
<?xml version="1.0" encoding="utf-8"?>\
<feed xml:base="http://services.odata.org/Northwind/Northwind.svc/"\
	xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices"\
	xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">\
	<id>http://services.odata.org/Northwind/Northwind.svc/Employees(5)/Employees1</id>\
	<title type="text">Employees1</title>\
	<updated>2013-10-17T12:40:33Z</updated>\
	<link rel="self" title="Employees1" href="Employees1" />\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(6)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(6)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(6)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(6)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:40:33Z</updated>\
					<link rel="self" title="Employees1" href="Employees(6)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(6)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(6)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(6)/Territories" />\
		<title />\
		<updated>2013-10-17T12:40:33Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">6</d:EmployeeID>\
				<d:LastName>Suyama</d:LastName>\
				<d:FirstName>Michael</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1963-07-02T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1993-10-17T00:00:00</d:HireDate>\
				<d:Address>Coventry House&#xD;\
					Miner Rd.</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>EC2 7JR</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-7773</d:HomePhone>\
				<d:Extension>428</d:Extension>\
				<d:Notes>Michael is a graduate of Sussex University (MA, economics,\
					1983) and the University of California at Los Angeles (MBA,\
					marketing, 1986). He has also taken the courses "Multi-Cultural\
					Selling" and "Time Management for the Sales Professional." He is\
					fluent in Japanese and can read and write French, Portuguese, and\
					Spanish.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(7)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(7)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(7)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(7)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:40:33Z</updated>\
					<link rel="self" title="Employees1" href="Employees(7)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(7)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(7)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(7)/Territories" />\
		<title />\
		<updated>2013-10-17T12:40:33Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">7</d:EmployeeID>\
				<d:LastName>King</d:LastName>\
				<d:FirstName>Robert</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Mr.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1960-05-29T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1994-01-02T00:00:00</d:HireDate>\
				<d:Address>Edgeham Hollow&#xD;\
					Winchester Way</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>RG1 9SP</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-5598</d:HomePhone>\
				<d:Extension>465</d:Extension>\
				<d:Notes>Robert King served in the Peace Corps and traveled\
					extensively before completing his degree in English at the\
					University of Michigan in 1992, the year he joined the company.\
					After completing a course entitled "Selling in Europe," he was\
					transferred to the London office in March 1993.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
	<entry>\
		<id>http://services.odata.org/Northwind/Northwind.svc/Employees(9)</id>\
		<category term="NorthwindModel.Employee"\
			scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
		<link rel="edit" title="Employee" href="Employees(9)" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employees1"\
			type="application/atom+xml;type=feed" title="Employees1" href="Employees(9)/Employees1">\
			<m:inline>\
				<feed>\
					<id>http://services.odata.org/Northwind/Northwind.svc/Employees(9)/Employees1</id>\
					<title type="text">Employees1</title>\
					<updated>2013-10-17T12:40:33Z</updated>\
					<link rel="self" title="Employees1" href="Employees(9)/Employees1" />\
					<author>\
						<name />\
					</author>\
				</feed>\
			</m:inline>\
		</link>\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Employee1"\
			type="application/atom+xml;type=entry" title="Employee1" href="Employees(9)/Employee1" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Orders"\
			type="application/atom+xml;type=feed" title="Orders" href="Employees(9)/Orders" />\
		<link\
			rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories"\
			type="application/atom+xml;type=feed" title="Territories"\
			href="Employees(9)/Territories" />\
		<title />\
		<updated>2013-10-17T12:40:33Z</updated>\
		<author>\
			<name />\
		</author>\
		<content type="application/xml">\
			<m:properties>\
				<d:EmployeeID m:type="Edm.Int32">9</d:EmployeeID>\
				<d:LastName>Dodsworth</d:LastName>\
				<d:FirstName>Anne</d:FirstName>\
				<d:Title>Sales Representative</d:Title>\
				<d:TitleOfCourtesy>Ms.</d:TitleOfCourtesy>\
				<d:BirthDate m:type="Edm.DateTime">1966-01-27T00:00:00</d:BirthDate>\
				<d:HireDate m:type="Edm.DateTime">1994-11-15T00:00:00</d:HireDate>\
				<d:Address>7 Houndstooth Rd.</d:Address>\
				<d:City>London</d:City>\
				<d:Region m:null="true" />\
				<d:PostalCode>WG2 7LT</d:PostalCode>\
				<d:Country>UK</d:Country>\
				<d:HomePhone>(71) 555-4444</d:HomePhone>\
				<d:Extension>452</d:Extension>\
				<d:Notes>Anne has a BA degree in English from St. Lawrence College.\
					She is fluent in French and German.</d:Notes>\
				<d:ReportsTo m:type="Edm.Int32">5</d:ReportsTo>\
				<d:PhotoPath>http://accweb/emmployees/davolio.bmp</d:PhotoPath>\
			</m:properties>\
		</content>\
	</entry>\
</feed>\
';