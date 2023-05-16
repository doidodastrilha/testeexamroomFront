import { Informations } from '../model/Information';
import { DashboardActionsType } from './dashboard.actions';

export interface IProductState{
    data:Informations;
    loading: boolean;
    error:string | undefined;
}
const initialState: IProductState = {
    data: [],
    loading: false,
    error: undefined
};
export function reducer(
    state = initialState,
    action: { type: DashboardActionsType; payload: any; }) {
    switch (action.type) {
        case DashboardActionsType.Add:
            const newData = [...state.data, action.payload];
            return {
                ...state, data: newData
            };
        case DashboardActionsType.LoadSucess:
            return{
                ...state, data: action.payload, loading:false
            };
        default:
            return state;
    }
}
