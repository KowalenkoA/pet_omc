import { IDataSet } from "../../App";


const defaultState = {
    dataSet: []
}

export const actDataReducer = (state = defaultState, action: any) => {
    switch (action.type){
        case 'ADD_DATA_IN_DATASET':     {
            return {...state, dataSet: action.payload}
        };
        default: return state;
    }
};