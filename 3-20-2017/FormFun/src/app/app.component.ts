import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ff-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  form;
  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.compose([this.nameValidate, Validators.required])),
      lastName: new FormControl('', Validators.compose([this.nameValidate, Validators.required])),
      sex: new FormControl('',Validators.pattern('[m|M|f|F]')),
      Dob: new FormControl('',Validators.compose([Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}'), this.yearValidate])),
    });
  }

  onSubmit(item){
    console.log(item);
  }

  nameValidate(control) {
    if(control.value.trim().length === 0){
      return null;
    }
    let name = control.value;
    let charA = [];
    for(var letter in name){
      let inchar = name[letter].search(/[^a-zA-Z]/);
      if(inchar != -1){
        charA.push(name[letter]);
      }
    }
    if(charA.length > 0){
      return { "invalid" : {
        "char" : charA
        }
      };
    } else {
      return null;
    }
  }

  yearValidate(control) {
    if(control.value.trim().length === 0) {
      return null;
    }
    let month = parseInt(control.value.slice(0,2));
    let day = parseInt(control.value.slice(3,5));
    let year = parseInt(control.value.slice(6,10));
    let miny = 1910;
    let maxy = 2017;
    let maxd = 31;
    let mind = 1;
    let maxm = 12;
    let minm = 1;
    if(year > maxy || year < miny && year.toString().length > 3){
      return { "Dob": true};
    } 
    if (day > maxd || day < mind){
      return { "Dob": true };
    }
    if ( month > maxm || month < minm){
      return { "Dob" : true};
    } else {
      return null;
    }
  }
}
