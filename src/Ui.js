import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { v4 as uuidv4 } from 'uuid';
import { mainString } from "./components/mainString";

export default function Ui() {
  const [time, setTime] = useState({ minutes: "00", seconds: "00" });
  let [arrCheckIndex,setArrCheckIndex] = useState(0);
  let [typeValue,setTypeValue]= useState('');
  const [score,setScore] = useState(0);
  const [invisible,setInVisible] = useState(true);
  const [startWritting,setStartWritting] = useState(false);
  const [disableInput,setDisableInput] = useState(false);
  const [overlay,setOverlay]= useState(null);
  const [worngCount,setWrongCount] = useState(0);
  const [initial,setInitial] = useState(0);
  const [initVal,setInitVal]= useState(1);
  const [newStr,setNewStr] = useState([]);
  let typeString = mainString[Math.floor(Math.random()*3)];
  let newTypeString = typeString.split(' ').map((item,i)=>{
    return {
      value:item,
      error:undefined,
      correct:undefined
    }
  }); 
  useEffect(()=>{
    setNewStr(newTypeString);
  },[]);
  //-----------rendering text on screen------------//
  let newArr1 = newStr.map(({value,error,correct})=><span key={uuidv4()} className={error?'error':null || correct?'correct':null}>{value}</span>)
  let newArr = newArr1.slice(initial,(initial+17));
  //-------------//
  function handleKeyDown(e) {
    if(e.key===" "){
      if(newStr[arrCheckIndex].value===(typeValue.trim())){
        const arr = newStr.map((item,i)=>{
          if(i===arrCheckIndex){
            return {
              value:item.value,
              error:false,
              correct:true
            }}
          return item;
        })
        setNewStr(arr);
        setScore(prev=>prev+1);
      }
      else{
        setWrongCount(prevValue=>prevValue+1);
        const arr = newStr.map((item,i)=>{
          if(i===arrCheckIndex){
            return {
              value:item.value,
              error:true,
              correct:false
            }}
          return item;
        })
        setNewStr(arr);
      }
      setArrCheckIndex(prevValue=> prevValue+1);
      setTypeValue('');
      setInitVal(prev=>prev+1);
      if((initVal%17)===0){
        setInitial(initVal);
      }
    }
    else{
      setTypeValue(e.target.value);
    }
  };
  function handleChange(e){
    setTypeValue(e.target.value);
    if(e.target.value && (!startWritting)){
      setStartWritting(true);
       handleInterval(.1);
    }
  }
  let timeInterval;
  let seconds,minutes;
  //--------handle Interval----------//
  function handleInterval(putMinutes){
    let timeCount = putMinutes;
    let initialTime = timeCount*60000;
    
    timeInterval = setInterval(()=>{
      initialTime -=1000;
      seconds =(initialTime/1000)%60;
      minutes = Math.floor(initialTime/60000);
      if(minutes===0 && seconds===0){
        stopTimer(timeInterval);
      }
      if(seconds<10){
        seconds = '0'+ seconds;
      }
      if(minutes<10){
        minutes = '0'+minutes;
      }
      setTime({minutes:minutes,seconds:seconds});
    },1000);
  }
  function stopTimer(timeInterval){
    clearInterval(timeInterval);
    setInVisible(false);
    setTypeValue('');
    setDisableInput(true);
    setOverlay(true);
  }
  function closeModleHandler(){
    setInVisible(true);
    setDisableInput(false);
    setOverlay(false);
    setStartWritting(false);
    setScore(0);
    setArrCheckIndex(0);
    setWrongCount(0);
    setInitial(0);
    setInitVal(1);    
    const arr = newStr.map((item,i)=>{
        return {
          value:item.value,
          error:false,
          correct:false
        }
      
    });
    setNewStr(arr);
  }
  function handleClick() {
    window.location.reload();
  }
  
  return (
    <>
    <div className={`ui ${overlay && "overlay"}`}>
      <div className="content">{newArr}</div>
      <div className="inputDiv">
        <input
          type="text"
          onKeyDown={handleKeyDown}

          autoCorrect='off'
          onChange={handleChange}
          value = {typeValue}
          disabled ={disableInput}
        ></input>
        <div className="time">
          {time.minutes}:{time.seconds}
        </div>
        <div className="refresh" onClick={handleClick}>
          <BiRefresh className='icon'/>
        </div>
      </div>
    </div>
    <div title='Refresh page' className={`result ${invisible&& 'invisible'}`} ><button className='close-modal-btn' onClick={closeModleHandler}><RxCross2/></button><div className='inner-div'><div><p >SCORE: {score} WPM</p></div><div><p>WRONG: {worngCount}</p></div></div></div>
    </>
  );
}