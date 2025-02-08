import { useState } from 'react'
import './App.css'
function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue,setInputValue] = useState('');

  const addToList = () => {
    if(inputValue.length == 0){
      alert('Cant add empty todo');
      return;
    }
    setTasks([...tasks, {value: inputValue, completed: false}]);
    setInputValue('')
  }
  const completeTask = (index) => {
    let newTask = [...tasks];
    newTask[index].completed = !newTask[index].completed;
    setTasks(newTask);
  }
  const deleteTask = (index) => {
    let newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask)
  }
  return (
    <div>
      <h1>Todo list</h1>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Add todo'/>
      <button className='btn-add' onClick={addToList}>Click me to add todo</button>
      <div>
        <ul>
        {tasks.map((value, index) => {
          return (
            <>
          <li style={value.completed == true ? {textDecoration: 'line-through'} : {}} key={index}>
             {value.value}
          </li>
          <button onClick={() => completeTask(index)}>Complete</button>
          <button onClick={() => deleteTask(index)}>Delete</button>
          </>
          )
        })}
        </ul>
      </div>
    </div>
  )
}

export default App
