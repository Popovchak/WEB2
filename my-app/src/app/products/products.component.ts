import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
@Component({
 selector: 'app-products',
 templateUrl: './products.component.html',
 styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products: any;
 name: string = "";
 price: number = 0;
 constructor(private dataService:DataService) { }
 ngOnInit() {
   console.log("products");
 this.loadProducts();
 }
 loadProducts(){
  console.log("produc All");
  this.dataService.getProducts().subscribe(data=>{
  this.products=data;
  console.log(this.products);
  })
  
}
addProduct(){
  
  var obj = {name:this.name,price: this.price};
  this.dataService.addProduct(obj).subscribe(data=>{
    this.products.push({_id:data,name:this.name,price: this.price});
    })
}
}