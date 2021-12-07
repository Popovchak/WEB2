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

function addShop(name,address){
	Shops.push(new Shop(name,address));
}
function addProduct(name,producent){
	Products.push(new Product(name,producent));
}
function addWare(shop_id,capacity){
	Warehouses.push(new Warehouse(shop_id,capacity));
}
function addProductToWare(warehouse_id,product_id){
	OwnedProducts.push(new OwnedProduct(warehouse_id,product_id));
}

function deleteShop(id){
	Shops=Shops.filter(p => p.id != id);
}
function deleteProduct(id){
	Products=Products.filter(p => p.id != id);
}
function deleteWare(id){
	Warehouses=Warehouses.filter(p => p.id != id);
}
function deleteProductFromWare(id){
	OwnedProducts=OwnedProducts.filter(p => p.id != id);
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

function editShop(id,new_name,new_address){
	let t = findShop(id);
	if(t!=undefined){
		t.name = new_name;
		t.address = new_address;
	}
}
function editProduct(id,new_name,new_producent){
	let t = findProduct(id);
	if(t!=undefined){
		t.name = new_name;
		t.producent = new_producent;
	}
}
function editWare(id,new_shop_id,new_capacity){
	let t = findWare(id);
	if(t!=undefined){
		t.shop_id = new_shop_id;
		t.capacity = new_capacity;
	}
}
function editOwnedProducts(id,new_warehouse_id){
	let t = findProductInWare(id);
	if(t!=undefined){
		t.warehouse_id = new_warehouse_id;
	}
}

addShop('АТБ','Бандери');
addShop('АТБ','Привокзальна');


addProduct('Авокадо', 'МУК');
addProduct('Шоколад', 'Світоч');
addProduct('Кава', 'Галка');

addWare(0,10);
addWare(1,12);
addWare(0,13);


addProductToWare(0,0);
addProductToWare(1,2);
addProductToWare(2,1);
addProductToWare(2,0);



console.log(Shops);
console.log(Products);
console.log(Warehouses);
console.log(OwnedProducts);

deleteProductFromWare(0);
addProductToWare(1,0);

console.log(OwnedProducts);


