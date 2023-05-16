import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Informations } from '../model/Information';
import { HttpClient } from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { filterObjects } from './list.service';
describe('ListComponent', () => {

  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule ]
    });
    
    httpClient = TestBed.inject(HttpClient);
  });

  
  it('should filter objects and keep the one with the most recent UpdateDate', () => {
    const objects: Informations = [
      {
        Name: 'John',
        Email: 'john@example.com',
        Telephone: '123456789',
        UpdateDate: '2023-05-01',
      },
      {
        Name: 'Bob 2',
        Email: 'bob@example.com',
        Telephone: '2544',
        UpdateDate: '2023-05-03',
      },
      {
        Name: 'Bob',
        Email: 'bob@example.com',
        Telephone: '123',
        UpdateDate: '2023-05-05',
      },
      {
        Name: 'Bob 3',
        Email: 'bob@example.com',
        Telephone: '1234',
        UpdateDate: '2023-05-06',
      },
      {
        Name:'Bharath23',
        Email:'Bharath23@gmail.com',
        Telephone:'12',
        UpdateDate: '2021-05-14T12:00:00.105',
      },
      {
        Name:'Bharath48',
        Email:'Bharath12@gmail.com',
        Telephone:'12',
        UpdateDate: '2021-05-15T00:30:00.23',
      }
    ];

    const filteredObjects = filterObjects(objects);

    expect(filteredObjects.length).toEqual(3);

  });

  it('should handle invalid dates and exclude objects with invalid dates', () => {
    const objects: Informations = [
      {
        Name: 'John',
        Email: 'john@example.com',
        Telephone: '123456789',
        UpdateDate: '2023-05-01',
      },
      {
        Name: 'Alice',
        Email: 'alice@example.com',
        Telephone: '987654321',
        UpdateDate: 'invalid-date',
      },
      {
        Name: 'Bob',
        Email: 'bob@example.com',
        Telephone: '1234567845',
        UpdateDate: '2023-05-05',
      },
    ];

    const filteredObjects = filterObjects(objects);

    expect(filteredObjects.length).toEqual(2);
 
  });

});







