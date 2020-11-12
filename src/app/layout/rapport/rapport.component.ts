import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Headers, Http} from '@angular/http';
import { MatSnackBar } from '@angular/material';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss'],
  animations: [routerTransition()]
})
export class RapportComponent implements OnInit {

  ListDriver: any;
  Obj: any;
  items= [];
  urlRACL = environment.serverUrl + '/RAClientLivreur/bydate';
  urlRAC = environment.serverUrl + '/RAClient/bydate';
  urlRAL = environment.serverUrl + '/RALivreur/bydate'
  urlRAS = environment.serverUrl + '/RASimple/bydate';
  urlRAMsg = environment.serverUrl + '/RAMsg/bydate';
  urlRADes = environment.serverUrl + '/RAStatDestinataire/bydate';
  urlUser = environment.serverUrl + '/user/all'
  urlDriver = environment.serverUrl + '/driver/alls'
  jsonObj: any;
  startDateFilter : any;
  endDateFilter :any;
  typeRapport : any;
  flageRACL :boolean =false;
  flageRAC :boolean =false ;
  flageRAL :boolean =false ;
  flageRAS :boolean =false ;
  flageRAmsg:boolean =false;
  flageRADes:boolean =false;
  jwt = JSON.parse(localStorage.getItem('currentUser')).token;
  headerOptions = new  Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Authorization': `Bearer ${this.jwt}`
  });


  constructor(private http : Http, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserfromServer();
    this.getDriverfromServer();
  }

 /*
  getlocalRACl(){
    return this.http.get(this.url).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.jsonObj = obj[0];
      console.log('data: ',this.jsonObj);
    })

  }*/

  getTableRACL(dd,df){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.urlRACL+'?DD='+dd+'&DF='+df,{headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      //const obj = Array.of(jo.data);
      this.jsonObj = jo;
      console.log('data: ',this.jsonObj);
     for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
    })
  }

  getTableRAC(dd,df){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.urlRAC+'?DD='+dd+'&DF='+df, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
     // const obj = Array.of(jo.data);
      this.jsonObj = jo;
      console.log('data: ',this.jsonObj);
      for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
    })
  }

  getTableRAL(dd,df){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.urlRAL+'?DD='+dd+'&DF='+df, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
     // const obj = Array.of(jo.data);
      this.jsonObj = jo;
      console.log('data: ',this.jsonObj);
      for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
    })
  }

  getTableRAS(dd,df){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.urlRAS+'?DD='+dd+'&DF='+df, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
     // const obj = Array.of(jo.data);
      this.jsonObj = jo;
      console.log('data: ',this.jsonObj);
      for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
    })
  }

  getTableRAMsg(dd,df){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.urlRAMsg+'?DD='+dd+'&DF='+df, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      //const obj = Array.of(jo.data);
      this.jsonObj = jo;
      console.log('data: ',this.jsonObj);
      for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
    })
  }

  getTableRADes(dd,df){
    this.jsonObj=[];
    this.items=[];
    return this.http.get(this.urlRADes+'?DD='+dd+'&DF='+df, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      //const obj = Array.of(jo.data);
      this.jsonObj = jo;
      console.log('data: ',this.jsonObj);
      for (let index = 0; index < this.jsonObj.length; index++) {
        this.items.push(this.jsonObj[index]);
      }
    })
  }

  changeDateFormat(dd) {
    const d = new Date(dd);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const dformat = [month, day, year].join('/');

    return dformat;
  }

  getSelectedrapport(val){
    console.log('dateeee: ',this.startDateFilter)
    if(this.startDateFilter === undefined){
      this.snackBar.open('Veuillez sélectionner la date de début!', 'Fermer', {
        duration: 5000,
    });
    return;
    }
    if(this.endDateFilter === undefined){
      this.snackBar.open('Veuillez sélectionner la date de fin!', 'Fermer', {
        duration: 5000,
    });
    return;
    }
    this.startDateFilter = this.changeDateFormat(this.startDateFilter);
    this.endDateFilter = this.changeDateFormat(this.endDateFilter);
    this.flageRACL=false;
    this.flageRAC = false;
    this.flageRAL = false;
    this.flageRAS = false;
    this.flageRAmsg = false;
    this.flageRADes = false;
    if(val === 'RACL'){
      this.flageRACL = true;
      this.getTableRACL(this.startDateFilter, this.endDateFilter);
    }
    if(val === 'RAC'){
      this.flageRAC = true;
      this.getTableRAC(this.startDateFilter, this.endDateFilter);
    }
    if(val === 'RAL'){
      this.flageRAL = true;
      this.getTableRAL(this.startDateFilter, this.endDateFilter);
    }
    if(val === 'RAS'){
      this.flageRAS = true;
      this.getTableRAS(this.startDateFilter, this.endDateFilter);
    }
    if(val === 'RAMSG'){
      this.flageRAmsg = true;
      this.getTableRAMsg(this.startDateFilter, this.endDateFilter);
    }
    if(val === 'RADES'){
      this.flageRADes = true;
      this.getTableRADes(this.startDateFilter, this.endDateFilter);
    }

  }

  getUserfromServer(){

    return this.http.get(this.urlUser, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.Obj = obj[0];
    })

  }


  getUser(id){
    let name ="";
    for (let index = 0; index < this.Obj.length; index++) {
      if(id === this.Obj[index].idUser){
       name = this.Obj[index].nameUser+' '+this.Obj[index].surnameUser
      }
    }
    return name;
  }

  getDriverfromServer(){

    return this.http.get(this.urlDriver, {headers: this.headerOptions}).subscribe(data => {
      const result = data['_body'];
      const jo = JSON.parse(result);
      const obj = Array.of(jo.data);
      this.ListDriver = obj[0];
    })

  }

  getDriver(id){
   let out = id.substring(2,id.length);
    let name ="";
    for (let index = 0; index < this.ListDriver.length; index++) {
      if(out === this.ListDriver[index].idDriver){
       name = this.ListDriver[index].nameDriver+' '+this.ListDriver[index].surnameDriver;
      }
    }
    return name;
  }
}
