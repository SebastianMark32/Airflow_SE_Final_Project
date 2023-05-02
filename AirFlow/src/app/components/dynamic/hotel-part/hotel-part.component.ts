import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Hotel } from '../../models/Hotel';
import { HotelReserveService } from '../../services/hotel-reserve.service';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-hotel-part',
  templateUrl: './hotel-part.component.html',
  styleUrls: ['./hotel-part.component.scss']
})
export class HotelPartComponent {

  hotelForm: FormGroup
  @Output() create: EventEmitter<any> = new EventEmitter();
  ngOnInit(){
    this.hotelForm = this.createFormGroup();
  }

  constructor(private HotelService: HotelReserveService,private authService:AuthService){}

  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(5)]),
      hotel: new FormControl("", [Validators.required, Validators.minLength(1)]),
      checkin: new FormControl("",[Validators.required]),
      checkin2: new FormControl("",[Validators.required]),
      checkout: new FormControl("",[Validators.required]),
      checkout2: new FormControl("",[Validators.required]),
      cost:new FormControl("",[Validators.required, Validators.pattern(/^[0-9]+$/)]),
      
    })
  }

  
  submit(formData: Hotel):void{
    this.HotelService.createHotel(formData,this.authService.userId).pipe(first()).subscribe(()=>{
      this.create.emit(null);
    });
   
   //console.log(formData.time1.getFullYear()+"-"+(formData.time1.getUTCMonth()+1) +"-"+formData.time1.getDate() +" "+formData.time12+":00");

   this.hotelForm.reset();
 }
}
