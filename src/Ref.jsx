import { useRef, useEffect } from 'react'

export default function App(){
  const pRef = useRef(null);

  function increase(){
    if(pRef.current){
      pRef.current.innerText = Number(pRef.current.innerText) + 1;
      
    }
  }
  return (
    <>
      <p ref={pRef}>0</p>
      <button onClick={increase}>Click me to increase</button>
    </>
  )
}