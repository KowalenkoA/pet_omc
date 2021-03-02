import react, { useEffect, useState } from 'react'
import { IDataSet } from '../../App';
import { ILangState } from '../../store/lang/redusers';
import './sort.scss'

interface ISortProps {
    setDataIn: (arr: Array<IDataSet>) => void;
    dataRedux: Array<IDataSet>;
    langData: ILangState
}

const Sort: React.FC<ISortProps> = (props) => {
    const [sortInd, setSortInd] = useState<boolean>(false);
    const [actData, setActData] = useState<Array<IDataSet>>([]);

    useEffect(() => {
      console.log('asdsad')
    },[props.langData])

    const sortTable = (val: string) => {
        if (val === 'id'){
          if (sortInd){
            let arr = props.dataRedux.sort((a, b) => a.id > b.id ? 1: -1).slice();
            props.setDataIn(arr);
            setActData(arr.slice(0, actData.length))
          }else{
            let arr = props.dataRedux.sort((a, b) => a.id > b.id ? -1: 1).slice();
            props.setDataIn(arr);
            setActData(arr.slice(0, actData.length))
          }
        }else if (val === 'name'){
          if (sortInd){
            let arr = props.dataRedux.sort((a, b) => a.name > b.name ? 1: -1).slice();
            props.setDataIn(arr);
            setActData(arr.slice(0, actData.length))
          }else{
            let arr = props.dataRedux.sort((a, b) => a.name > b.name ? -1: 1).slice();
            props.setDataIn(arr);
            setActData(arr.slice(0, actData.length))
          }
        }else if (val === 'age'){
          if (sortInd){
            let arr = props.dataRedux.sort((a, b) => a.age > b.age ? 1: -1).slice();
            props.setDataIn(arr);
            setActData(arr.slice(0, actData.length))
          }else{
            let arr = props.dataRedux.sort((a, b) => a.age > b.age ? -1: 1).slice();
            props.setDataIn(arr);
            setActData(arr.slice(0, actData.length))
          }
        }
        
      }
    
      const changeSort = (val: boolean) => {
        setSortInd(val);
      }
    return (
        <div className='dfc sort_buttons'>
            <label>{props.langData.language.sortName}</label>
            <div className='dfr jcc wd1'>
                <div className='button sort_buttons_fl' onClick={() => sortTable('id')}>{props.langData.language.sortData.id}</div>
                <div className='button sort_buttons_fl' onClick={() => sortTable('name')}>{props.langData.language.sortData.name}</div>
                <div className='button sort_buttons_fl' onClick={() => sortTable('age')}>{props.langData.language.sortData.age}</div>
            </div>
            <div className='dfr jcc wd1'>
                {/*<div className={('button sort_buttons_sl ' + (props.sortInd ? 'button_green': ''))}>По возрастанию</div>
                <div className={('button sort_buttons_sl ' + (props.sortInd ? '' : 'button_green'))}>По убыванию</div>*/}
                <div className={('button sort_buttons_sl ' + (sortInd ? '': 'button_green'))} onClick={() => changeSort(false)}>{props.langData.language.sortData.upButton}</div>
                <div className={('button sort_buttons_sl ' + (sortInd ? 'button_green' : ''))} onClick={() => changeSort(true)}>{props.langData.language.sortData.downButton}</div>
            </div>
        </div>
    )
}

export default Sort;