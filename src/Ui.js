
import React,{useState} from 'react';
import { BiRefresh } from "react-icons/bi";

export default function Ui() {
    const typeString = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa ipsa incidunt ab aperiam id! Architecto, accusamus!';
    let val=0;
    const [time,setTime]= useState({minutes:'00',seconds:'00'});
    function handleChange(e){
        val +=1;
        console.log(val);
        let tenMinuteExtraTime = new Date().getTime()+600000;
        setInterval(()=>{
        // let minutes = Math.floor(tenMinute/60);//9
        // let newSecond= tenMinute;
        // let seconds = Math.floor(((newSecond)/10)%60);//59
        // newSecond= tenMinute-9;
        // setTime({minutes:minutes,seconds:seconds});
        // console.log("hello")
        // tenMinute -=1
        let netSeconds =tenMinuteExtraTime - new Date();
        let minutes= netSeconds
        },1000)
    }
    function handleClick(e){
      window.location.reload();
    }
  return (
    <div className='ui'>
      <div className='content'>{typeString}</div>
      <div className='inputDiv'><input type='text' onChange={handleChange}></input><div className='time'>{time.minutes}:{time.seconds}</div><div className='refresh' onClick={handleClick}><BiRefresh/></div></div>
    </div>
  )
}
