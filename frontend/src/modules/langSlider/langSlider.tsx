import React, { useState } from 'react';
import { ILangState, ILanguage } from '../../store/lang/redusers';

interface ILangSliderProps {
    langData: ILangState;
    setLanguage: () => void;
}

const langSlider: React.FC<ILangSliderProps> = (props) => {

    const [stat, setStat] = useState(false);

    const changeStat = () => {
        setStat(!stat);
        props.setLanguage()
    }
    return (
        <div>
            <input type='checkbox' checked={stat} onChange={changeStat}></input>
            <label>{props.langData.language.lang}</label>
        </div>
    )
}

export default langSlider;