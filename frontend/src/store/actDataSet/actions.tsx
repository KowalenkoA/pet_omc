import { IDataSet } from "../../App";

export const INIT_DATA_IN_ACTDATASET = 'INIT_DATA_IN_ACTDATASET';

export const initData = (arr: Array<IDataSet>) => ({
    type: 'INIT_DATA_IN_ACTDATASET',
    payload: arr
});