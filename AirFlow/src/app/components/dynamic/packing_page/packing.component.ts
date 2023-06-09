import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Packinglist } from '../../models/PackingList';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/Trip';
import { FlightReserveService } from '../../services/flight-reserve.service';
import { Flight } from '../../models/Flight';
import { PackinglistService } from '../../services/packinglist.service';



@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss']
})
export class PackingComponent {
  toDisplay = false;
  packingForm: FormGroup
  allTrip!: Trip[];
  allflights!:Flight[];

  isDisplayed=false;
  tripname : String;

constructor(private tripService:TripService, private flightService: FlightReserveService,private packingService:PackinglistService){

}

  ngOnInit(){
    this.packingForm = this.createFormGroup();
  }

  toggleData() {
    this.toDisplay = !this.toDisplay;
  }


  createFormGroup():FormGroup{
    return new FormGroup({
      tripname: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  toDate(thing:any):Date{
    const dt = new Date(thing);
    return dt;
  }

  submit(formData:Pick<Packinglist,"tripname"|"destination">):void{
    this.tripname = formData.tripname;
    this.tripService.fetchAll().subscribe(posts =>{
      this.allTrip=posts;
      this.flightService.fetchAll().subscribe(posts=>{
        this.allflights=posts;
        this.isDisplayed=true;
      });
      

    });


    this.packingForm.reset();
  }

  typesOfItems: string[] = ['Boarding pass', 'Wallet', 'Drivers License','Cellphone','Laptop/Tablet', 'Optional: Passport', "Electronic Chargers", 'Outlet Adapter'];
  typesOfClothes: string[] = ['Shirt', 'Jacket', 'Dress','Jeans','Swim Shorts', 'Hats', 'Suits', 'Ties', 'Hiking Boots', 'Skirts'];


}
