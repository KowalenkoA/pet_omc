import React, { useState } from 'react';
import { IDataSet } from '../../App';
import './table.scss';
import { MdStar, MdStarBorder } from "react-icons/md";

interface tableLineProps {
    row: IDataSet;
    indx: number;
    str: string;
    setEditFavorite: (val: number) => void
}

let TableLine: React.FC<tableLineProps> = (props) => {

    const [fav, setFav] = useState<boolean>(props.row.favourite);

    const changeFavourite = () => {
        setFav(!fav);
        props.setEditFavorite(props.indx);
    }

    const ageStr = (num: number) => {
        let str = num.toString()
        //console.log(str[str.length - 1])
        let val = parseInt(str[str.length - 1])
        if (val === 0){
            return ('лет');
        }else if (val === 1){
            return ('год');
        }else if (val >= 2 && val <= 4){
            return ('года');
        }else if ( val >= 5){
            return ('лет')
        }
    }

    return(
        <div className='table_block dfr jcc wd1' id={'tr_' + props.indx}>
            <div className='tb_cell1 dfc jcc'><img className='table_img' src={"/images/"+props.row.image+".svg"} /></div>
            <label className='tb_cell2'>{props.row.name}</label>
            <label className='tb_cell3'>{props.row.age + ' ' + ageStr(props.row.age)} </label>
            <label className='tb_cell4'>{props.row.phone}</label>
            {/*<label className='tb_cell5' onClick={changeFavourite}>{fav ? 'TRUE' : 'FALSE'}</label>*/}
            <div className='tb_cell5' onClick={changeFavourite}>{fav ? <MdStar/> : <MdStarBorder/>}</div>
        </div>
    )
}

export default TableLine = React.memo(TableLine);