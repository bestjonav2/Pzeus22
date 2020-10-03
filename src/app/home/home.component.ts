import { Component, OnInit } from '@angular/core';

declare var WE: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  earth: any;
  constructor() { }

  ngOnInit(): void {
    this.earth = new WE.map("earth_div");
    this.earth.setView([46.8011, 8.2266], 2);
    WE.tileLayer(
      "https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg",
      {
        tileSize: 256,
        bounds: [
          [-85, -180],
          [85, 180],
        ],
        minZoom: 0,
        maxZoom: 16,
        attribution: "WebGLEarth example",
        tms: true,
      }
    ).addTo(this.earth);
  }

}
