import { useState, useEffect } from 'react';
import './App.css';
import { use } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [rendered, setRendered] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({
    index: null,
    value: null
  });
  const [filtered, setFilterted] = useState({
    state: 'all',
    tasks: []
  });
  
  /* 
  when the component/ use effect run initially,  set the rendered to true to prevent accidentally deleting/clearing our localstorage
  */
  const updateLocalTasks = (task) => {
    let localTasks = JSON.stringify(task);
    localStorage.setItem('tasks', localTasks);
  }
  useEffect(function(){
    setRendered(true);
    let localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(localTasks);
    setFilterted(val => ({...val, tasks: localTasks}))
  }, []);
  useEffect(function(){
   if(rendered || tasks.length > 0){
      updateLocalTasks(tasks);
   }
  }, [tasks])
 
  
  const addToList = () => {
    if (inputValue.trim().length === 0) {
      alert('Cannot add an empty todo');
      return;
    }
    
    //updateLocalTasks([...tasks, { value: inputValue, completed: false }])
    setTasks([...tasks, { value: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleTaskCompletion = (index) => {
    let newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  const editTask = (index, newTaskValue) => {
    let newTasks = [...tasks];
    newTasks[index].value = newTaskValue;
    setTasks(newTasks);
    setCurrentEdit({index: null, value: null});
  };
  const filterTask = (state) => {
    if(state == 'complete'){
      setFilterted(val => ({state, tasks: tasks.filter(value => value.completed == true)}))
    } else if(state == 'uncomplete'){
      setFilterted(val => ({state, tasks: tasks.filter(value => value.completed != true)}))
   
    } else if(state == 'all'){
      setFilterted({
        state,
        tasks: tasks
      })
    }
    else {
      alert('Unknown filter')
    }
    return true
  }
  const clearList = () => {
    setTasks([]);
  };
  // filter (by completed tasks , uncompleted)
  // editing tasks
  const EditComponent = (index, currentValue) => {
    return (
      <div>
        <input value={currentEdit.value} onChange={(e) => setCurrentEdit({...currentEdit, value: e.target.value})}/>
        <button onClick={() => editTask(index, currentEdit.value)} >Done</button>
      </div>
    )
  }
  return (
    <div>
      <h1>Todo List</h1>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Add todo" 
      />
      <button className="btn-add" onClick={addToList}>
        Click me to add todo
      </button>

      <div>
        <ul>
          <button onClick={() => filterTask('complete')}>completed</button>
          <button onClick={() => filterTask('uncomplete')}>not completed</button>
          <button onClick={() => filterTask('all')}>all</button>
        </ul>
        <ul>
          {filtered.tasks.map((task, index) => (
            <li key={index} style={task.completed ? { textDecoration: 'line-through' } : {}}>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(index)}
              />
              {currentEdit.index != index ? task.value : EditComponent(index,task.value)}
              <button onClick={() => deleteTask(index)}>Delete</button>
              <button onClick={() => setCurrentEdit({index,value: task.value}) }>Edit</button>
            </li>
          ))}
        </ul>
        {tasks.length > 0 && (
      <button className="btn-clear" onClick={clearList}>
        Clear List
      </button>
        )}
      </div>
    </div>
  );
}

export default App