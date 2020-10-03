import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookService {

  constructor(protected http: HttpClient) { }

  getData() {
    return this.http.get('https://randomuser.me/api/?results=25');
  }

  filterByCategory(category) {
    return this.http.get('https://eonet.sci.gsfc.nasa.gov/api/v3/categories/' + category);
  }
}
