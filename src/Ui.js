import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';

export default function Ui() {
  const [time, setTime] = useState({ minutes: "00", seconds: "00" });
  let [arrCheckIndex,setArrCheckIndex] = useState(0);
  let [typeValue,setTypeValue]= useState('');
  const [score,setScore] = useState(0);
  const [visible,setVisible] = useState(true);
  const [startWritting,setStartWritting] = useState(false);
  const [disableInput,setDisableInput] = useState(false);
  const [overlay,setOverlay]= useState(null);
  const [worngCount,setWrongCount] = useState(0);
  const typeString =
    "Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your";
  const newTypeString = typeString.split(' ').map((item,i)=>{
    return {
      value:item,
      error:undefined,
      correct:undefined
    }
  }); 
  const [newStr,setNewStr] = useState(newTypeString);

  //-----------rendering text on screen------------//
  const newArr = newStr.map(({value,error,correct})=><span key={uuidv4()} className={error?'error':null || correct?'correct':null}>{value}</span>)
  //----------------//

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
    }
    else{
      setTypeValue(e.target.value);
    }
  };
  
  function handleChange(e){
    setTypeValue(e.target.value);
    if(e.target.value && (!startWritting)){
      setStartWritting(true);
       handleInterval(1);
    }
  }
  let mit;
  function handleInterval(putMinutes){
    let timeCount = putMinutes;
    let initialTime = timeCount*60000;
    let seconds,minutes;
    mit = setInterval(()=>{
      initialTime -=1000;
      seconds =(initialTime/1000)%60;
      minutes = Math.floor(initialTime/60000);
      if(minutes===0 && seconds===0){
        stopTimer(mit);
      }
      if(seconds<10){
        seconds = '0'+ seconds;
      }
      if(minutes<10){
        minutes = '0'+minutes;
      }
      setTime({minutes:minutes,seconds:seconds})
    },1000);
  }
  function stopTimer(mit){
    clearInterval(mit);
    setVisible(false);
    setTypeValue('');
    setDisableInput(true);
    setOverlay(true);
  }
  function closeModleHandler(){
    setVisible(true);
    setDisableInput(false);
    setOverlay(false);
    setStartWritting(false);
    setScore(0);
    setArrCheckIndex(0);
    //-----------
    const arr = newStr.map((item,i)=>{
        return {
          value:item.value,
          error:false,
          correct:false
        }
      
    });
    setNewStr(arr);
  }
  function handleClick(e) {
    clearInterval(mit);
  }
  
  return (
    <>
    <div className={`ui ${overlay && "overlay"}`}>
      {/* <div className="content">{newArr}</div> */}
      <div className="content">{newArr}</div>
      <div className="inputDiv">
        <input
          type="text"
          onKeyDown={handleKeyDown}
          // onFocus={handleFocus}
          autoCorrect='off'
          onChange={handleChange}
          value = {typeValue}
          // style={{outline:visible?null:'none'}}
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
    <div className='result' style={{display:visible?'none':null}}><button className='close-modal' onClick={closeModleHandler}><ImCross/></button><div><h2 >SCORE: {score} WPM</h2><h2>WRONG: {worngCount}</h2></div></div>
    </>
  );
}