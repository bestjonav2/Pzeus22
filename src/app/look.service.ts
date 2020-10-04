import { importType } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookService {

  constructor(protected http: HttpClient) { }

  filterByCategory(category) {
    return this.http.get('https://eonet.sci.gsfc.nasa.gov/api/v3/categories/' + category);
  }

  getCategories() {
    return this.http.get('https://eonet.sci.gsfc.nasa.gov/api/v3/categories');
  }

  filterEventByID(id) {
    return this.http.get('https://eonet.sci.gsfc.nasa.gov/api/v3/events/' + id);
  }
}
