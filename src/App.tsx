import { useState } from 'react';
import Navigation from './components/Navigation';

type ToDo = {
  id: number;
  title: string;
  task?: string;
};

export default function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodo, setNewTodo] = useState<ToDo>({ id: 1, title: '', task: '' });
  const [selectedTodo, setSelectedTodo] = useState<ToDo | null>(null);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);

  const handleFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      setIsTitleInvalid(true);
      return;
    }

    if (newTodo.title === 'codewars') {
      alert('Kevin said to do your codewars, right now!');
    }

    setTodos([...todos, newTodo]);
    setNewTodo({ id: newTodo.id + 1, title: '', task: '' });
    setIsTitleInvalid(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({ ...newTodo, [event.target.name]: event.target.value });
  };

  const handleTodoClick = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setSelectedTodo(todo);
    }
  };

  const handleTodoRemove = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="app-container">
      <Navigation isToDoList={true} />
      <div className="content-container">
        <h1>Add Things To My ToDo List.</h1>

        <div className="card">
          <button onClick={handleFormSubmit}>Add Item</button>
          {isTitleInvalid && <span className="required-indicator">Title is required</span>}
          <p>Total Items: {todos.length}</p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
            placeholder="Enter title"
          />
          <input
            type="text"
            name="task"
            value={newTodo.task}
            onChange={handleInputChange}
            placeholder="Enter task"
          />
          <button type="submit">Add Todo</button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id} onClick={() => handleTodoClick(todo.id)}>
              <span>{todo.title}</span>
              <button onClick={() => handleTodoRemove(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>

        {selectedTodo && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedTodo.title}</h2>
              <p>{selectedTodo.task}</p>
              <button onClick={handleModalClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
