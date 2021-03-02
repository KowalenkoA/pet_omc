import React, { useState } from 'react'
import { IDataSet } from '../../App';

interface IFilterProps {
    dataSet: Array<IDataSet>;
    arhDataSet: Array<IDataSet>;
    setFilterDataset: (arr: Array<IDataSet>) => void;
}

let Filter: React.FC<IFilterProps> = (props) => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('')

    const dataFilter = async () => {
        let fName: string = firstName;
        let lName: string = lastName;

        let strArr: Array<string> = [];
        let dataSet: Array<IDataSet> = [];
        if ((fName !== '') || (lName !== '')){
            props.arhDataSet.forEach( (row, indx) => {
                strArr = row.name.split(' ');
                let f = strArr[0].toUpperCase().indexOf(fName.toUpperCase());
                let l = strArr[1].toUpperCase().indexOf(lName.toUpperCase());
                if ((f !== -1) && (l !== -1)){
                    dataSet.push(row)
                }
            });
            props.setFilterDataset(dataSet.slice())
        }else{
            props.setFilterDataset(props.arhDataSet.slice())
        }

    }
    return(
        <table>
            <tbody>
                <tr>
                    <td><label>First Name</label></td>
                    <td><input onChange={(e) => setFirstName(e.target.value)} value={firstName} /></td>
                </tr>
                <tr>
                    <td><label>Last Name</label></td>
                    <td><input onChange={(e) => setLastName(e.target.value)} value={lastName} ></input></td>
                </tr>
                <tr>
                    <td colSpan={2}><button className='button' onClick={dataFilter}>FILTER</button></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Filter = React.memo(Filter);