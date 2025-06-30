import { useState } from "react";
import './Manager.css'

export default function Manager() {
  const [manageTasks, setManageTasks] = useState([]);
  const [newTasks, setNewTasks] = useState('');

  const handleInputChange = (event) => {
    setNewTasks(event.target.value);
  };

  const renderTasks = () => {
    if (newTasks.trim() !== '') {
      const tasksObject = {
        id: Date.now(),
        Text: newTasks,
        completed: false
      };
      setManageTasks([...manageTasks, tasksObject]);
      setNewTasks('');
    }
  };

  const toggleConclusion = (id) => {
    setManageTasks(manageTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    );
  };



  return (
    <div className="todo">
      <h1>Lista de Tarefas</h1>
      <div >

        <input type="text" value={newTasks} onChange={handleInputChange} placeholder="Digite uma nova tarefa" className="input" /> <br /> <br />
        <button id="task" onClick={renderTasks}>Adicionar Tarefa</button>

      </div>

      <ul id="list">
        {manageTasks.map((task) => (
          <li key={task.id}>

            <label>
              <input type="checkbox"
                checked={task.completed}
                onChange={() => toggleConclusion(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.Text}
              </span>

            </label>
            <button className="delete" onClick={() => {
              setManageTasks(
                manageTasks.filter(todo =>
                  todo.id !== task.id
                )
              )
            }}>
              Remover</button>
          </li>
        )
        )}
      </ul>
    </div>
  )
}