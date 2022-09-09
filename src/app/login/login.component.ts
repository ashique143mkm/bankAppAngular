import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //property / variable

aim = 'Your Perfect Banking Partner'
account = 'Enter Your Account Here'
acno=''
pswd=''
loginForm = this.fb.group({
  acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
})


  //consrtuctor
  constructor(private fb:FormBuilder,private router:Router,private ds:DataService) { }

  //life cycle hook of angular
  ngOnInit(): void {
  }


  //user defined function
  login(){
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    if(this.loginForm.valid){
      //register data service - asynchronous

      this.ds.login(acno,pswd)
      .subscribe(
        (result:any)=>{

          //store all loginuser details in localstorage
            localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
            localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
            localStorage.setItem('token',JSON.stringify(result.token))

          alert(result.message)
          this.router.navigateByUrl('dashboard')
        },
        result=>{
          alert(result.error.message)
          this.router.navigateByUrl('')

        })
    }
    else{
      alert("Invadid Inputs")
    }

    
  }

 }
  

