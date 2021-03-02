export interface ILanguage {
    sortName: string,
        sortData: {
            upButton: string,
            downButton: string,
            id: string,
            name: string,
            age: string
        },
        filterData: {
            fName: string,
            lName: string,
            button: string
        },
        switchData: {
            table: string,
            prev: string
        },
        lang: string
}

const langData = {
    russian: {
        sortName: 'Сортировка',
        sortData: {
            upButton: 'По возрастанию',
            downButton: 'По убыванию',
            id: 'ID',
            name: 'Имя',
            age: 'Возраст'
        },
        filterData: {
            fName: 'Имя',
            lName: 'Фамилия',
            button: 'Фильтровать'
        },
        switchData: {
            table: 'Таблица',
            prev: 'Превью'
        },
        lang: 'Включить английский'
    },
    english: {
        sortName: 'SORT',
        sortData: {
            upButton: 'Sort up',
            downButton: 'Sort down',
            id: 'ID',
            name: 'Name',
            age: 'Age'
        },
        filterData: {
            fName: 'First Name',
            lName: 'Last Name',
            button: 'Filter'
        },
        switchData: {
            table: 'Table',
            prev: 'Prev'
        },
        lang: 'Swtich to Russian'
    }
}

export interface ILangState {
    stateLang: boolean;
    language: ILanguage
}

const defaultState: ILangState = {
    stateLang: false,
    language: langData.russian
}

export const langReducer = (state = defaultState, action: any) => {
    switch (action.type){
        case 'CHANGE_LANGUAGE': {
            /*let data = state.dataSet.slice();
            let arhData = state.arhDataSet.slice();
            let val = !data[action.payload].favourite
            data[action.payload].favourite = val;
            arhData[action.payload].favourite = val;
            state.dataSet = data.slice();
            state.arhDataSet = arhData.slice();*/
            //console.log('tt')
            if (!state.stateLang){
                state.stateLang = !state.stateLang;
                state.language = langData.english;
            }else{
                state.stateLang = !state.stateLang;
                state.language = langData.russian;
            }
            return (state)
            //return {...state, dataSet: data.slice(), arhDataSet: arhData}
        };
        default: return state;
    }
};