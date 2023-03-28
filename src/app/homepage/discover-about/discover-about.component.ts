import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-about',
  templateUrl: './discover-about.component.html',
  styleUrls: ['./discover-about.component.css']
})
export class DiscoverAboutComponent implements OnInit {

  aboutShow: boolean = false;
  vacationRentalPerfect: boolean = false;

  constructor() { }

  showAbout(): void {
    this.aboutShow = true;
  
  }

  showvacationRentalPerfect(): void {
    this.vacationRentalPerfect = true;
  
  }


  ngOnInit(): void {
  }

}
