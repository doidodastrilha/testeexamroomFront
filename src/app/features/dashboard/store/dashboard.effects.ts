import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { ListService, filterObjects } from '../services/list.service';
import { DashboardActionsType } from './dashboard.actions';
 
@Injectable()
export class DashboardEffects {
 
  loadInformation$ = createEffect(() => this.actions$.pipe(
    ofType(DashboardActionsType.Load),
    mergeMap(() => this.listService.getData()
      .pipe(
        map(informations => ({ type: DashboardActionsType.LoadSucess, payload: filterObjects(informations) })),
        catchError(() => EMPTY)
      ))
    )
  );

 
  constructor(
    private actions$: Actions,
    private listService: ListService
  ) {}
}