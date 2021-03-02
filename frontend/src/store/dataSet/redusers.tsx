import { IDataSet } from "../../App";


const defaultState = {
    dataSet: [{
        id: 0,
        favourite: false,
        name: 'string',
        age: 0,
        phone: 0,
        image: 'string',
        phrase: 'string',
        video: null,
    }],
    arhDataSet: [{
        id: 0,
        favourite: false,
        name: 'string',
        age: 0,
        phone: 0,
        image: 'string',
        phrase: 'string',
        video: null,
    }],
}

export const dataReducer = (state = defaultState, action: any) => {
    switch (action.type){
        case 'ADD_DATA_IN_DATASET':     {
            return {...state, dataSet: action.payload, arhDataSet: action.payload}
        };
        case 'EDIT_FAVORITE': {
            let data = state.dataSet.slice();
            let arhData = state.arhDataSet.slice();
            let val = !data[action.payload].favourite
            data[action.payload].favourite = val;
            arhData[action.payload].favourite = val;
            state.dataSet = data.slice();
            state.arhDataSet = arhData.slice();
            return (state)
            //return {...state, dataSet: data.slice(), arhDataSet: arhData}
        };
        case 'FILTER_DATASET': {
            return {...state, dataSet: action.payload}
        }
        default: { console.log('default'); return state};
    }
};