import { Component, OnInit } from '@angular/core';
import { LookService } from './../look.service';

declare var WE: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  earth: any;
  dataSet: any[] = [];
  description = '';
  collapsed = true;

  constructor(protected lookService: LookService) {}

  ngOnInit(): void {
    this.earth = new WE.map('earth_div');
    this.earth.setView([46.8011, 8.2266], 2);
    //https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2012-07-09/250m/{z}/{x}/{y}.jpg
    //https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg

    this.lookService.filterByCategory('wildfires').subscribe(
      (data) => {
        this.description = data['description'];
        this.dataSet = data['events'];
        console.log(this.description);
        console.log(this.dataSet);
      },
      (error) => {
        console.log(error);
      }
    );

    WE.tileLayer(
      'https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg',
      {
        tileSize: 256,
        bounds: [
          [-85, -180],
          [85, 180],
        ],
        minZoom: 1,
        maxZoom: 16,
        attribution: 'Project Zeus 22',
        tms: true,
      }
    ).addTo(this.earth);
  }

  toggleRightSidebar() {
    this.collapsed = !this.collapsed;
  }
}
