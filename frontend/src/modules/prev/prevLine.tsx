import React, { useEffect, useRef, useState } from 'react';
import { IDataSet } from '../../App';
import { MdStar, MdStarBorder } from "react-icons/md";

interface IPrevLineProps {
    row: IDataSet;
    str: string;
    addV: (key: string, y: number) => void;
    indx: number;
    num?: number;
    setEditFavorite: (val: number) => void
}


let y = 0;

let PrevLine: React.FC<IPrevLineProps> = (props) => {

    const [update, setUpdate] = useState<string>('');
    const [check, setCheck] = useState<boolean>(false);
    //const video = useRef<HTMLVideoElement>(null);
    const [fav, setFav] = useState<boolean>(props.row.favourite);
    let element: any;

    /*const scrollEvent = () => {
        let SH = document.body.scrollHeight;
        let CH = window.innerHeight;
        let CW = window.innerWidth;
        element= document.getElementById(props.str);
        let targetPosition;
        let windowPosition;
        if (element) {
            targetPosition = {
                top: window.pageYOffset + element.getBoundingClientRect().top,
                left: window.pageXOffset + element.getBoundingClientRect().left,
                right: window.pageXOffset + element.getBoundingClientRect().right,
                bottom: window.pageYOffset + element.getBoundingClientRect().bottom
            };
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

           
            if ((windowPosition.bottom - y) >= 550){
                //setY(windowPosition.bottom);
                y = windowPosition.bottom;
                console.log('Y: ' + y);
                console.log('BOTTOM : ' + windowPosition.bottom);
                console.log('TARGET : ' +targetPosition.top);
                if (targetPosition.top < windowPosition.bottom){
                   
                    console.log(windowPosition.bottom);
                    console.log(y);
                    console.log('---' + props.str)
                    setCheck(true)
                }
            }
            
        }
    }*/
    useEffect(() => {
        if (props.row.video){
            document.addEventListener('wheel', clickFunc, false);
            document.addEventListener('scroll', clickFunc, false);
        }
        
        return( () => {
            if (props.row.video){
                document.removeEventListener('wheel', clickFunc, false);
                document.removeEventListener('scroll', clickFunc, false);
            }
            
        }) 
    },[])

    const changeFavourite = () => {
        setFav(!fav);
        props.setEditFavorite(props.indx);
    }

    const clickFunc = () => {
        //console.log('click ' + props.idName);
        let video: any = document.getElementById('vi_' + props.str);
        if (props.row.video){
            if (video){
                //console.log(video.getBoundingClientRect().top + window.pageYOffset)
                //console.log((window.pageYOffset + document.documentElement.clientHeight))
                let height = document.documentElement.clientHeight / 2;
                let center = (window.pageYOffset + height);
                let videoTop = video.getBoundingClientRect().top + window.pageYOffset
                //console.log(center - videoTop)
                if ((center  - videoTop) < 250 && (center  - videoTop) > -250){
                    video.play();
                }else{
                    video.pause();
                }
            }
            
        }
        /*let SH = document.body.scrollHeight;
        let CH = window.innerHeight;
        let CW = window.innerWidth;
        element= document.getElementById(props.str);
        let targetPosition;
        let windowPosition;
        if (element) {
            targetPosition = {
                top: window.pageYOffset + element.getBoundingClientRect().top,
                left: window.pageXOffset + element.getBoundingClientRect().left,
                right: window.pageXOffset + element.getBoundingClientRect().right,
                bottom: window.pageYOffset + element.getBoundingClientRect().bottom
            };
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };
            console.log()
            console.log('WHEIGHT: ' + window.innerHeight)
            //console.log(element.getBoundingClientRect())
            console.log(targetPosition);
            console.log(windowPosition)
            console.log('----')
            if ((windowPosition.bottom + 100) > targetPosition.top){
                setCheck(true)
            }
        }*/
        
    }

    return(
             <div className='dfr prev_block ' id={'pr_' + props.indx} >
                <div  className='dfc prev_bio' >
                    <table className='wd1'>
                        <tbody>
                            <tr>
                                <td className='table_td1'>
                                <img className='table_img' src={"/images/"+props.row.image+".svg"} />
                                </td>
                                <td onClick={clickFunc}>
                                    {props.row.name}
                                </td>
                                <td className='table_td5'>
                                    {/*<div onClick={changeFavourite}>{fav ? 'TRUE' : 'FALSE'}</div>*/}
                                    <div className='tb_cell5' onClick={changeFavourite}>{fav ? <MdStar/> : <MdStarBorder/>}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <label>{props.row.age} age</label>
                    <label>{props.row.phone}</label>
                    <label>{props.row.phrase}</label>
                </div>
                {(props.row.video) && <div className='prev_video'>
                    <video id={'vi_' + props.str}  src={"/videos/"+props.row.video+".mp4"} controls  ></video>
                </div>}
                
            </div>
        
    )
}

const areEqual = (prevProps: any, nextProps: any) => true;

export default PrevLine = PrevLine;