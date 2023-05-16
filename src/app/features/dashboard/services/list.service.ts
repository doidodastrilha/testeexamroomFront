import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informations } from '../model/Information';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { 
    
  }
  getData(): Observable<Informations>{
    return this.http.get<Informations>('https://examroomteste.azurewebsites.net/api/GetData');
  }
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

export function filterObjects(objects: Informations): Informations {
  const filteredObjects: Informations = [];

  objects.forEach(obj => {
    if (isValidDate(obj.UpdateDate)) {
      const existingObjects = filteredObjects.filter(item => item.Telephone == obj.Telephone || item.Email == obj.Email);
      if (existingObjects.length > 0) {

        existingObjects.forEach(exisObj => {
          let index = filteredObjects.indexOf(exisObj);
          if ((new Date(obj.UpdateDate)) > (new Date(exisObj.UpdateDate))) {
            filteredObjects.splice(index, 1);
            filteredObjects.push(obj);
          }
          else{
            filteredObjects.splice(index, 1);
          }
        })
      }
     else {
      filteredObjects.push(obj);
    }
  }
  });
  const filteredObjects2: Informations = [];

  filteredObjects.forEach(obj => {


      const existingObjects = filteredObjects.filter(item => item.Telephone == obj.Telephone || item.Email == obj.Email);
      if (existingObjects.length > 1) {
        
        existingObjects.forEach(exisObj => {

          let index = filteredObjects.indexOf(exisObj);
      
            filteredObjects.splice(index, 1);

        })
        filteredObjects2.push(existingObjects[0]);
      }
     else {
      filteredObjects2.push(obj);
    }
  });
return filteredObjects2;

}