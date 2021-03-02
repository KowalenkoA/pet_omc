import React, { useEffect, useRef, useState } from 'react';
import { IDataSet } from '../../App';
import './table.scss';
import TableLine from './tableLine';
import { v4 as uuid} from 'uuid';
import { act } from 'react-dom/test-utils';
import {setFilterDataset, setEditFavorite, setDataIn } from '../../store/dataSet/actions';
import {connect} from 'react-redux';

interface ITableProps {
    dataSet: Array<IDataSet>;
    setEditFavorite: (val: number) => void;
    setFilterDataset: (arr: Array<IDataSet>) => void;
}

let Table: React.FC<ITableProps> = (props) => {
    let kol: number = 0;
    console.log('render OSN');

    useEffect( () => {
        document.addEventListener('wheel', scrollEvent, false);
        document.addEventListener('scroll', scrollEvent, false);
        return( () => {
            document.removeEventListener('wheel', scrollEvent, false);
            document.removeEventListener('scroll', scrollEvent, false);
        }) 
        // eslint-disable-next-line
    },[]);

    useEffect( () => {
        kol = 0;
        showLine(); 
    },[props.dataSet])

    const scrollEvent = () => {
        if (((document.documentElement.scrollHeight - document.documentElement.scrollTop) - 100) <= document.documentElement.clientHeight){
            showLine();
        }
    }

    const showLine = async() => {
        for (let i = kol; i < (kol + 15); i++){
            let element= document.getElementById('tr_' + i);
            if (element){
                await sleep(100)
                //element.style.display = 'table-row';
                element.classList.add("table_block_active")
            }
        } 
        kol += 10;
    }

    const hideLine = async() => {
        console.log(kol)
        for (let i = 0; i <= kol; i++){
            let element= document.getElementById('tr_' + i);
            if (element){
                
                //element.style.display = 'table-row';
                element.classList.add("table_block_deact")
                await sleep(50)
            }
        } 
        kol += 5;
    }

    const sleep = (ms:number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    return(
        <div className='dfc jcc wd1'>
            <div className='dfc jcc wd1'>
                {props.dataSet.map( (row, indx )=> <TableLine key={uuid()} row={row} indx={indx} str={uuid()} setEditFavorite={props.setEditFavorite}/>)}
            </div>
        </div>
    )
}

/*const pushStateToProps = (state: any) => {
    return{
        dataSet: state.dataSet.dataSet,
        arhDataSet: state.dataSet.arhDataSet
    };
  };

const pushDispatchToProps = {
    setFilterDataset,
    setEditFavorite,
  };
  
export default connect(pushStateToProps, pushDispatchToProps)(Table);*/
export default Table //= React.memo(Table);