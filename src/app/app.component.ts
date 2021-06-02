import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TempretureService } from './services/tempreture.service';
import { TempretureType} from './classes/enums.class'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'temp-conversion';
  fromSlectValue = "Celsius";
  toSlectValue =0;
  toList: any = [];
  convertedTemp?: number;
  selectTempList: any = ["Celsius","Kelvin","Fahrenheit"];
  TempretureType:typeof TempretureType = TempretureType;
  tempretureSubscription?:  Subscription;  

  constructor(
    private _tempretureService: TempretureService
  ){}

  ngOnInit() {
    this.setSelectList(this.fromSlectValue);
  }

  changeFrom(e: any) {
    let val = e.target.value;
    this.setSelectList(val);
  }

  setSelectList(val:any){
    this.toList = Object.assign([], this.selectTempList);
    const index = this.toList.indexOf(val);
    if (index > -1) {
      this.toList.splice(index, 1);
    }
    this.toSlectValue = this.toList[0];
  }

  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d*\.?\d{0,2}$/g;

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    let tempreturefrom = TempretureType.Celcius;
    let tempretureTo = TempretureType.Celcius;
    let tempretureValue = form.value.tempFrom;
    //get the from value
    if(form.value.selectFrom == "Kelvin")
      tempreturefrom = TempretureType.Kelvin
    else if (form.value.selectFrom == "Fahrenheit")
      tempreturefrom = TempretureType.Fahrenheit

    if(form.value.selectTo == "Kelvin")
      tempretureTo = TempretureType.Kelvin
    else if (form.value.selectTo == "Fahrenheit")
      tempretureTo = TempretureType.Fahrenheit

    this.tempretureSubscription = this._tempretureService.getConvertedTempreture(tempreturefrom,tempretureTo,tempretureValue)
                                  .subscribe((data:number)=>{
                                      console.log(data);
                                      this.convertedTemp = data;
                                  });
  }

  ngOnDestroy(){
    if (this.tempretureSubscription)
      this.tempretureSubscription.unsubscribe();
  }
}
