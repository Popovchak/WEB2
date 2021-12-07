import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DataService} from '../data.service'
@Component({
 selector: 'app-product',
 templateUrl: './product.component.html',
 styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
 @Input() product : any;
 @Output() eventProduct=new EventEmitter();
 constructor(private dataService:DataService) { }
 ngOnInit() {
 console.log(this.product);
 }
 removeProduct(item:any){
 console.log('removeProduct:');
 console.log(item);
 this.dataService.removeProduct(item).subscribe(data=>{
 console.log(data);
 this.sendEvent();
 });
 }
 sendEvent(){
 this.eventProduct.emit();
 }
}