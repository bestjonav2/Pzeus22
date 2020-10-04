import { Component, OnInit } from '@angular/core';
import { LookService } from './look.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'LookAtTheEarth';
  dataSet: any[] = [];
  description = '';

  constructor(protected lookService: LookService) {}

  ngOnInit() {
    /*     this.lookService.getData().subscribe(
      (data) => {
        this.dataSet = data['results'];
        console.log(this.dataSet);
      },
      (error) => {
        console.error(error);
      }
    ); */
  }
}
