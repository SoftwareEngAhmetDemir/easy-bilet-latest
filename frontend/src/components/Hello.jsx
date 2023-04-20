import React, { useEffect, useState } from 'react'

function Hello() {
    let s = "HerKese Merhaba!!! Easy ticket Site Hayatınızı kolaylaştıracaktır...";
    const[msg,setMessage] =useState("");
    useEffect(()=>{
        let xs = 0;
       let st = "";
        const t =    setInterval(() => {
            st=s[xs]
            setMessage((prev)=>prev+st);
            xs++;
            if(xs>=s.length)
            clearInterval(t);
           }, 100);
        
    },[])
  return (
    <div className='writer'>{msg}</div>
  )
}

export default Hello