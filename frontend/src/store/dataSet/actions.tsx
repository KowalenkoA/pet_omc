import { IDataSet } from "../../App";

export const ADD_DATA_IN_DATASET = 'ADD_DATA_IN_DATASET';
export const EDIT_FAVORITE = 'EDIT_FAVORITE';
export const FILTER_DATASET = 'FILTER_DATASET';

export const setDataIn = (val: Array<IDataSet>) => ({
    type: 'ADD_DATA_IN_DATASET',
    payload: val
});

export const setEditFavorite = (val: number) => ({
    type: 'EDIT_FAVORITE',
    payload: val
});

export const setFilterDataset = (val: Array<IDataSet>) => ({
    type: 'FILTER_DATASET',
    payload: val
});
