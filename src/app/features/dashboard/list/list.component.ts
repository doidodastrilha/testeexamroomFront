import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Informations, Information } from '../model/Information';
import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DashboardActionsType } from '../store/dashboard.actions';

@Directive({
  selector: '[themeBackground]'
})
export class ThemeBackgroundDirective implements OnChanges {
  @Input('themeBackground') theme: string | undefined;

  constructor(private elementRef: ElementRef) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme']) {
      const el = this.elementRef.nativeElement;
      el.style.backgroundColor = this.theme === 'light' ? '#FFFFFF' : '#000000';
      el.style.color = this.theme === 'light' ? '#000000' : '#FFFFFF';
    }
  }
}



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public informations$: Observable<any> | undefined; // = this.store.select((state: { data: Informations; }) => state.data);
  selectedTheme: string = 'light';
  constructor(private store: Store<any>) {

  }
  ngOnInit(): void {
    this.setThemeBasedOnPrefersColorScheme();
    this.store.dispatch({ type: DashboardActionsType.Load});
    this.informations$ = this.store.select('Dashboard');
   }

  changeTheme(theme: string) {
    this.selectedTheme = theme;
  }

  setThemeBasedOnPrefersColorScheme() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (darkModeMediaQuery.matches) {
      this.selectedTheme = 'dark';
    } else {
      this.selectedTheme = 'light';
    }
  }
  displayedColumns: string[] = ['Name', 'Email', 'Telephone', 'UpdateDate'];

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
        console.log(existingObjects);
        console.log(obj);
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
  console.log('lsafljnas.df.jnnj');
  const filteredObjects2: Informations = [];

  filteredObjects.forEach(obj => {


      const existingObjects = filteredObjects.filter(item => item.Telephone == obj.Telephone || item.Email == obj.Email);
      if (existingObjects.length > 1) {
        console.log(existingObjects);
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


