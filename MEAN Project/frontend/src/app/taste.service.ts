import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasteService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getemp() {
    return this.http.get(`${this.uri}/Tastes`);
  }

  getempById(id) {
    return this.http.get(`${this.uri}/Tastes/${id}`);
  }

  addemp(food,type,rating,review) {
    const taste = {
      food: food,
      type: type,
      rating:rating,
      review: review
    };
    return this.http.post(`${this.uri}/Tastes/add`, taste);
  }

  updateemp(id, food,type,rating,review) {
    const taste = {
      food: food,
      type: type,
      rating:rating,
      review: review
    };
    return this.http.post(`${this.uri}/Tastes/update/${id}`, taste);
  }

  deleteemp(id) {
    return this.http.get(`${this.uri}/Tastes/delete/${id}`);
  }
}





  

