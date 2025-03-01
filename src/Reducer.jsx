import { useReducer, useState } from "react";
const initialState = {
  todos: []
};
const reducer = (state, action) => {
  switch(action.type){
    case 'ADD_TODO':
      if(action.payload.length < 1) return { todos: state.todos };
      return { todos: [...state.todos, action.payload]};
      break;
    case 'REMOVE_TODO':
      return { todos: state.todos.filter((_, index) => index !== action.payload)};
      break;
    default: 
      return { todos: [...state.todos, action.payload]};
      break;
  }
}
export default function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');
  const ADD_TODO = (payload) => ({
    type: 'ADD_TODO',
    payload
  });
  const REMOVE_TODO = (payload) => ({
    type: 'REMOVE_TODO',
    payload
  })
  return (
    <>
      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your todo" />
        <button onClick={() => {
          
          dispatch(ADD_TODO(input));
          setInput('')
        }}>Add todo</button>
      </div>
      {state.todos.map((text, index) => (
        <div>
          <p>{text}</p>
          <button onClick={() => dispatch(REMOVE_TODO(index))}>Remove</button>
        </div>
      ))}
    </>
  )
}