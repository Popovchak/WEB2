window.onload = () => {

	checkLCNull();
	get();
	setOnClick();
	renderShops();
	renderProducts();
	renderWarehouses();
	renderOpiw();
}

function setOnClick(){
	const button_create_shop = document.querySelector('#create_shop');
	button_create_shop.addEventListener('click', addShop);
	
	const button_edit_shop = document.querySelector('#edit_shop');
	button_edit_shop.addEventListener('click', editShop);
	
	const button_create_product = document.querySelector('#create_product');
	button_create_product.addEventListener('click', addProduct);
	
	const button_edit_product = document.querySelector('#edit_product');
	button_edit_product.addEventListener('click', editProduct);
	
	const button_create_warehouse = document.querySelector('#create_warehouse');
	button_create_warehouse.addEventListener('click', addWare);
	
	const button_edit_warehouse = document.querySelector('#edit_warehouse');
	button_edit_warehouse.addEventListener('click', editWare);
	
	const button_create_opiw = document.querySelector('#create_opiw');
	button_create_opiw.addEventListener('click', addProductToWare);
	
	const button_edit_opiw = document.querySelector('#edit_opiw');
	button_edit_opiw.addEventListener('click', editOwnedProducts);
	
	const button_zvit1 = document.querySelector('#form_zvit1');
	button_zvit1.addEventListener('click', renderZvit1);
	
	const button_zvit2 = document.querySelector('#form_zvit2');
	button_zvit2.addEventListener('click', renderZvit2);
}

function renderShops(){
	renderTable("#show_table_shop",['id','name','address'],Shops);
}
function renderProducts(){
	renderTable("#show_table_product",['id','name','producent'],Products);
}
function renderWarehouses(){
	renderTable("#show_table_warehouse",['id','id shop','capacity'],Warehouses);
}
function renderOpiw(){
	renderTable("#show_table_opiw",['id','id warehouse','id product'],OwnedProducts);
}
function renderZvit1(){
	renderTable("#show_table_zvit1",['id','id shop','capacity'],
	Warehouses.filter((p => availableSpaceInWare(p.id)/p.capacity >=0.8 )));
}
function renderZvit2(){
	renderTable("#show_table_zvit2",['id','id warehouse','id product'],
	allProductsInWare(document.querySelector('#zware').value));
	document.querySelector('#zware').value='';
}


function renderTable(id,h_des,array){
	upload();
	let element = document.querySelector(id);
	element.innerHTML = '';
	if(array.length === 0){
		const p = document.createElement('p');
		p.innerHTML = 'No elements';
		element.append(p);
		return;
	}
	const table = document.createElement('table');
	//Генерація заголовків колонок
	const thead = document.createElement('thead');
	table.append(thead);
	const tr = document.createElement('tr');
	thead.append(tr);
	for(let i=0; i<h_des.length; i++) {
		const th = document.createElement('th');
		th.innerHTML = h_des[i];
		tr.append(th);
	}
	const tbody = document.createElement('tbody');
	table.append(tbody);
	element.append(table);
	for (let element of array) {
		let id = element.ID;
		const tr = document.createElement('tr');
		tbody.append(tr);
		for(let key in element) {
			const td = document.createElement('td');
			td.innerHTML = element[key];
			tr.append(td);
		}
	}
}

function checkLCNull(){
	if(localStorage.getItem('s') == undefined){
		localStorage.setItem('sid', Shop.last_id);
		localStorage.setItem('s', JSON.stringify(Shops));
	}
	if(localStorage.getItem('p') == undefined){
		localStorage.setItem('pid', Product.last_id);
		localStorage.setItem('p', JSON.stringify(Products));
	}
	if(localStorage.getItem('w') == undefined){
		localStorage.setItem('wid', Warehouse.last_id);
		localStorage.setItem('w', JSON.stringify(Warehouses));
	}
	if(localStorage.getItem('ow') == undefined){
		localStorage.setItem('owid', OwnedProduct.last_id);
		localStorage.setItem('ow', JSON.stringify(OwnedProducts));
	}
}

function upload(){
	localStorage.setItem('sid', Shop.last_id);
	localStorage.setItem('s', JSON.stringify(Shops));
	localStorage.setItem('pid', Product.last_id);
	localStorage.setItem('p', JSON.stringify(Products));
	localStorage.setItem('wid', Warehouse.last_id);
	localStorage.setItem('w', JSON.stringify(Warehouses));
	localStorage.setItem('owid', OwnedProduct.last_id);
	localStorage.setItem('ow', JSON.stringify(OwnedProducts));
}
function get(){
	Shop.last_id = localStorage.getItem('sid');
	Shops = JSON.parse(localStorage.getItem('s'));
	Product.last_id = localStorage.getItem('pid');
	Products = JSON.parse(localStorage.getItem('p'));
	Warehouse.last_id = localStorage.getItem('wid');
	Warehouses = JSON.parse(localStorage.getItem('w'));
	OwnedProduct.last_id = localStorage.getItem('owid');
	OwnedProducts = JSON.parse(localStorage.getItem('ow'));
}


class Shop{
	static last_id = 0;
	constructor(name,address){
		this.id = Shop.last_id++;
		this.name = name;
		this.address = address;
	}
}

class Product{
	static last_id = 0;
	constructor(name,producent){
		this.id = Product.last_id++;
		this.name = name;
		this.producent = producent;
	}
}

class Warehouse{
	static last_id = 0;
	constructor(shop_id,capacity){
		this.id = Warehouse.last_id++;
		this.shop_id = shop_id;
		this.capacity = capacity;
	}
}

class OwnedProduct{
	static last_id = 0;
	constructor(warehouse_id,product_id){
		this.id = OwnedProduct.last_id++;
		this.warehouse_id = warehouse_id;
		this.product_id = product_id;
	}
}
var Shops = new Array(0);
var Products = new Array(0);
var Warehouses = new Array(0);
var OwnedProducts = new Array(0);

function addShop(){
	let name = document.querySelector('#sname').value;
	document.querySelector('#sname').value = '';
	let address = document.querySelector('#saddress').value;
	document.querySelector('#saddress').value = '';
	if(name.length >0 && address.length>0){
		Shops.push(new Shop(name,address));
		renderShops();
	} else {
		alert('Empty string!');
	}
}
function addProduct(){
	let name = document.querySelector('#pname').value;
	document.querySelector('#pname').value = '';
	let producent = document.querySelector('#pproducent').value;
	document.querySelector('#pproducent').value = '';
	if(name.length >0 && producent.length>0){
		Products.push(new Product(name,producent));
		renderProducts();
	} else {
		alert('Empty string!');
	}
}
function addWare(){
	let shop_id = document.querySelector('#wshop_id').value;
	document.querySelector('#wshop_id').value = '';
	let capacity = document.querySelector('#wcapacity').value;
	document.querySelector('#wcapacity').value = '';
	if(shop_id.length >0 && capacity.length>0 && findShop(shop_id)!=undefined){
		Warehouses.push(new Warehouse(shop_id,capacity));
		renderWarehouses();
	} else {
		alert('Empty string or invalid shop!');
	}
}
function addProductToWare(){
	let warehouse_id = document.querySelector('#ware').value;
	document.querySelector('#ware').value = '';
	let product_id = document.querySelector('#prod').value;
	document.querySelector('#prod').value = '';
	let w = findWare(warehouse_id);
	if(w!=undefined && findProduct(product_id)!=undefined
			&& isAvailableSpaceInWare(warehouse_id)){
		OwnedProducts.push(new OwnedProduct(warehouse_id,product_id));
		renderOpiw();
	} else {
		alert('Empty string or invalid id or warehouse is full!');
	}
}

function deleteShop(did){
	Shops = Shops.filter(p => p.id != did);
	renderShops();
}
function deleteProduct(id){
	Products=Products.filter(p => p.id != id);
	renderProducts();
}
function deleteWare(id){
	Warehouses=Warehouses.filter(p => p.id != id);
	renderWarehouses();
}
function deleteProductFromWare(id){
	OwnedProducts=OwnedProducts.filter(p => p.id != id);
	renderOpiw();
}

function editShop(){
	let id = document.querySelector('#seid').value;
	document.querySelector('#seid').value = '';
	let new_name = document.querySelector('#sename').value;
	document.querySelector('#sename').value = '';
	let new_address = document.querySelector('#seaddress').value;
	document.querySelector('#seaddress').value = '';
	let t = findShop(id);
	if(t==undefined){
		alert('Shop not found!')
		return;
	}
	if(new_name.length>0 && new_address.length>0){
		t.name = new_name;
		t.address = new_address;
		renderShops();
		return;
	}
	if(new_name.length==0 && new_address.length==0){
		deleteShop(id);
		return;
	}
	alert('Empty String!');
}
function editProduct(){
	let id = document.querySelector('#peid').value;
	document.querySelector('#peid').value = '';
	let new_name = document.querySelector('#pename').value;
	document.querySelector('#pename').value = '';
	let new_producent = document.querySelector('#peproducent').value;
	document.querySelector('#peproducent').value = '';
	let t = findProduct(id);
	if(t==undefined){
		alert('Product not found!')
		return;
	}
	if(new_name.length>0 && new_producent.length>0){
		t.name = new_name;
		t.producent = new_producent;
		renderProducts();
		return;
	}
	if(new_name.length==0 && new_producent.length==0){
		deleteProduct(id);
		return;
	}
	alert('Empty String!');
}
function editWare(){
	let id = document.querySelector('#weid').value;
	document.querySelector('#weid').value = '';
	let new_shop_id = document.querySelector('#weshop_id').value;
	document.querySelector('#weshop_id').value = '';
	let new_capacity = document.querySelector('#wecapacity').value;
	document.querySelector('#wecapacity').value = '';
	let t = findWare(id);
	if(t==undefined){
		alert('Warehouse not found!')
		return;
	}
	if(findShop(new_shop_id)!=undefined && new_capacity.length>0){
		t.shop_id = new_shop_id;
		t.capacity = new_capacity;
		renderWarehouses();
		return;
	}
	if(new_shop_id.length==0 && new_capacity.length==0){
		deleteWare(id);
		return;
	}
	alert('Empty String or invalid shop id!');
}
function editOwnedProducts(){
	let id = document.querySelector('#oeid').value;
	document.querySelector('#oeid').value = '';
	let new_warehouse_id = document.querySelector('#oeware').value;
	document.querySelector('#oeware').value = '';
	let new_product_id = document.querySelector('#oeprod').value;
	document.querySelector('#oeprod').value = '';

	let t = findProductInWare(id);
	if(t==undefined){
		alert('Warehouse not found!')
		return;
	}
	if(new_warehouse_id=='' && new_product_id==''){
		deleteProductFromWare(id);
		return;
	}
	if(findWare(new_warehouse_id)!=undefined && findProduct(new_product_id)!=undefined){
		t.warehouse_id = new_warehouse_id;
		t.product_id = new_product_id;
		renderOpiw();
		return;
	}
	alert('Iinvalid id!');
}


function findShop(id){
	return Shops.find(p => p.id == id);
}
function findProduct(id){
	return Products.find(p => p.id == id);
}
function findWare(id){
	return Warehouses.find(p => p.id == id);
}
function findProductInWare(id){
	return OwnedProducts.find(p => p.id == id);
}

function isAvailableSpaceInWare(id){
	let w = findWare(id).capacity;
	let prods = allProductsInWare(id);
	if(w>=(prods.length+1)){
		return true;
	}
	return false;
}

function availableSpaceInWare(id){
	let w = findWare(id).capacity;
	let prods = allProductsInWare(id);
	return w-prods.length;
}

function allProductsInWare(id){
	return OwnedProducts.filter(p => p.warehouse_id == id);
}

