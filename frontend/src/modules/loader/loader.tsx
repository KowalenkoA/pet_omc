import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
    return (
        <div className='background_modal_loader background_modal_loader_pos loader'>
            <div className='bord'><div className='vent'></div></div>
        </div>
    );
    
}

export default Loader;

