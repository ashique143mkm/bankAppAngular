import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  user= ''
  pswd  =''
  amount =''
  acno1 = ''
  pswd1 =''
  amount1 =''
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })
  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })
  // share to child
  acno:any

  sDetails:any

  constructor(private router:Router,private fb:FormBuilder,private ds:DataService) { 
    if(localStorage.getItem('currentUser')){
      this.user = JSON.parse(localStorage.getItem('currentUser') || '')
    }
    this.sDetails = new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('Please Login')
      this.router.navigateByUrl('')
    }
  }

  deposit(){
    var acno = this.depositForm.value.acno
    var pswd  =this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if(this.depositForm.valid){
      //calling deposite in data service - asynchronous
      const result = this.ds.deposite(acno,pswd,amount)
      .subscribe(
        (result:any)=>{
          //response code :2xx
          alert(result.message)
        },
        //response code : 4xx
        result=>{
          alert(result.error.message)
        })
    }
    else{
      alert('Invalid Input')
    }
 
  }
  withdraw(){
    var acno = this.withdrawForm.value.acno1
    var pswd=this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amount1
        if(this.withdrawForm.valid){
      this.ds.withdraw(acno,pswd,amount)
      .subscribe(
        (result:any)=>{
          //response code :2xx
          alert(result.message)
        },
        //response code : 4xx
        result=>{
          alert(result.error.message)
        })
      }
    else{
      alert('Invalid Input')
    }

  }

  //logout
  logout(){
    //remove login acno and username
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')

    //navigate to login page
    this.router.navigateByUrl('')

  }
  deleteParent(){
    this.acno =  JSON.parse(localStorage.getItem('currentAcno') || '')
  }
  //oncancel
  onCancel(){
    this.acno=''
  }
  //onDelete
  onDelete(event:any){
    this.ds.deleteAcc(event)
    .subscribe(
      //2xx
      (result:any)=>{
        alert(result.message)
        this.logout()
      },
      //4xx
      (result:any)=>{
        alert(result.error.message)
      }
    )
  }
  }

