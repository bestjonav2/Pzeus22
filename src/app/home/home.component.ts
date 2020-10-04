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
  dataSetMsg = '';
  categories: any[] = [];
  selectedCategory = 'wildfires';
  collapsedL = true;
  collapsedR = true;
  eventData: any;

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
        attribution: 'Project Zeus 22 | Icons by Flaticon',
        tms: true,
      }
    ).addTo(this.earth);

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

  toggleLeftSidebar() {
    this.collapsedL = !this.collapsedL;
    if (!this.collapsedL) {
      this.setEvents();
    }
  }

  toggleRightSidebar() {

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
        if (this.dataSet.length === 0){
          this.dataSetMsg = 'No active records found.';
        } else{
          this.dataSetMsg = 'Ok';
        }

        let icon = '../../assets/rec.png';
        if (this.selectedCategory === 'wildfires'){
          icon = '../../assets/fire.png';
        } else if (this.selectedCategory === 'volcanoes') {
          icon = '../../assets/volcano.png';
        } else if (this.selectedCategory === 'severeStorms') {
          icon = '../../assets/hurricane.png';
        }

        this.dataSet.forEach(element => {
          const coordinates = element.geometry[element.geometry.length - 1].coordinates;
          console.log(element.geometry);
          const marker = WE.marker([coordinates[1] , coordinates[0]], icon, 24, 24).addTo(this.earth);

          const dots = [];
          element.geometry.slice(0, element.geometry.length - 1).forEach(geoEl => {
            const geomarker = WE.marker([geoEl.coordinates[1], geoEl.coordinates[0]], '../../assets/dot.svg', 6, 6).addTo(this.earth);
            dots.push([geoEl.coordinates[1], geoEl.coordinates[0]]);
          });
          if (dots.length > 0) {
            const options = {color: '#90EE02', opacity: 1, fillColor: '#90EE02', fillOpacity: 0.1, weight: 3};
            WE.polygon([...dots, ...dots.reverse()], options).addTo(this.earth);
          }
        });

        // console.log(this.description);
        // console.log(this.dataSet);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClick(coord, title, id) {
    // TODO: Remove markers
    // var marker = WE.marker([coord['coordinates'][1] , coord['coordinates'][0]]).addTo(this.earth);
    // marker.bindPopup('<b>' + title + '</b>');
    this.earth.panTo([
      coord['coordinates'][1], coord['coordinates'][0]
    ]);

    this.lookService.filterEventByID(id).subscribe(
      (data) => {
        console.log(data);
        this.eventData = data;
        const size = 6;
        const row = Math.floor(((90 - coord['coordinates'][1]) * (2 ** size)) / 288 );
        const col = Math.floor(((180 + coord['coordinates'][0]) * (2 ** size)) / 288);
        this.eventData.img = 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2016-09-03/250m/' + size + '/' + row + '/' + col + '.jpg';
        //console.log(row, col);

        if (this.collapsedR){
          this.collapsedR = false;
        }

        /**
         * TODO: Added polygon/geometry
         *
         *
         */
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
