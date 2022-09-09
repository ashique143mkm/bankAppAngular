import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//global http header object
const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
//login user
  currentUser:any
//login acno
  currentAcno:any

  // userDetails:any = {
  //   1000:{acno:1000,username:'Neer',password:1000,balance:5000,transaction:[]},
  //   1001:{acno:1001,username:'Laisha',password:1001,balance:4000,transaction:[]},
  //   1002:{acno:1002,username:'Vyom',password:1002,balance:6000,transaction:[]}
  // }
  constructor(private http:HttpClient) {
   }


  //register

  register(acno:any,username:any,password:any){

    //req body
    const data = {
      acno,
      username,
      password
    }
    //register api - asynchronous
    return this.http.post(
      'http://localhost:3000/register',data)
  }
  login(acno:any,pswd:any){
   
    //req body
    const data = {
      acno,
      pswd
    }
    //login api - asynchronous
    return this.http.post(
      'http://localhost:3000/login',data)
  }

  //to get request header wikth token 
  getToken(){
    //fetch the token from local storage
    const token = JSON.parse(localStorage.getItem('token') || '')
    //generate a request header - HttpHeaders
    let headers = new HttpHeaders()
    //append token inside header
    if(token){
      headers = headers.append('x-access-token',token)
      //implement overloading
      options.headers = headers
    }
    return options
  }

//deposit
deposite(acno:any,pswd:any,amt:any){
   //req body
   const data = {
    acno,
    pswd,
    amt
  }
  //deposite api - asynchronous
  return this.http.post(
    'http://localhost:3000/deposite',data,this.getToken())
}
withdraw(acno:any,pswd:any,amt:any){
  //req body
  const data = {
    acno,
    pswd,
    amt
  }
  //withdraw api - asynchronous
  return this.http.post(
    'http://localhost:3000/withdraw',data,this.getToken())

}
//transaction
getTransaction(acno:any){
 //req body
 const data = {
  acno
}
//transaction api - asynchronous
return this.http.post(
  'http://localhost:3000/transaction',data,this.getToken())
}
deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
}
}
