import { useState, useContext, createContext, useMemo } from "react";

const ThemeContext = createContext();
export default function App(){
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Home />
    </ThemeContext.Provider>
  )
}
function Home(){
  const { theme, setTheme } = useContext(ThemeContext);
  const [number, setNumber] = useState(1);
  const [input, setInput] = useState(1);
  const factorial = useMemo(() => {
    console.log(' running for ' + number + '' + input);
    let result = 1;
    for(let i=2; i<= number; i++) result*=i;
    return result;
  }, [number]);
  return (
    <>
      <p>{theme}</p>
      <button onClick={() => setTheme(theme == 'dark' ? 'white' : 'dark')}>Toggle theme</button>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setNumber(input)} >Click me</button>
      <p>{factorial}</p>
    </>
  )
}