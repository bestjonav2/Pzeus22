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
  categories: any[] = [];
  selectedCategory = 'wildfires';
  collapsed = true;
  firstRun = true;

  constructor(protected lookService: LookService) {}

  ngOnInit(): void {
    this.earth = new WE.map('earth_div');
    this.earth.setView([46.8011, 8.2266], 2);
    //https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2012-07-09/250m/{z}/{x}/{y}.jpg
    //https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg

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
    if (this.firstRun) {
      this.lookService.getCategories().subscribe(
        (data) => {
          this.categories = data['categories'];
          //console.log(this.categories);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    if (!this.collapsed) {
      this.setEvents();
    }
  }

  changeCategory(newValue) {
    console.log(newValue);
    this.selectedCategory = newValue;
    this.setEvents();
  }

  setEvents() {
    this.lookService.filterByCategory(this.selectedCategory).subscribe(
      (data) => {
        this.dataSet = data['events'];
        //console.log(this.description);
        //console.log(this.dataSet);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClick(coord, title, id) {
    // TODO: Remove markers
    var marker = WE.marker([coord['coordinates'][1] , coord['coordinates'][0]]).addTo(this.earth);
    marker.bindPopup('<b>'+ title+'</b>');

    this.earth.panTo([
      coord['coordinates'][1], coord['coordinates'][0]
    ]);

    this.lookService.filterEventByID(id).subscribe(
      (data) => {
        console.log('ALV: ' +id );
        console.log(data);
        /**
         * TODO: Added polygon/geometry
         *
         *  */
      },
      (error) => {
        console.log(error)
      }
    );

  }
}
