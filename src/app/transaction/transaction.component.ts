import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  //to hold current user
  acno:any
  //to hold trasaction array of current user
  transactions:any
  constructor(private ds:DataService) {
    //get the value of current acno from localStorage
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
    //to get transaction array from data service - asynchronous
    this.ds.getTransaction(this.acno)
    .subscribe(
      //2xx
      (result:any)=>{
        this.transactions = result.transaction
      },
      //4xx
      result=>{
        alert(result.error.message)
      }
    )   
   }

  ngOnInit(): void {
  }

}
