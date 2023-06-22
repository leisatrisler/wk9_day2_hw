import React, { useState } from 'react';
import FlashMessage from './components/FlashMessage';
import Navigation from "./components/Navigation";
import './App.css';

type ToDo = {
  id: number;
  title: string;
  task?: string;
};

interface Message {
  title: string;
  description: string;
}


export default function App() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodo, setNewTodo] = useState<ToDo>({ id: 1, title: '', task: '' });
  const [selectedTodo, setSelectedTodo] = useState<ToDo | null>(null);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [flashMessages, setFlashMessages] = useState< Message[]>([]);
  const [isFlashMessageActive, setIsFlashMessageActive] = useState(false);


  const addFlashMessage = (title: string, description: string) => {
    const newMessage: Message = { title, description };
    setFlashMessages(prevMessages => [...prevMessages, newMessage]);

    setTimeout(() => {
      setFlashMessages(prevMessages => prevMessages.filter(msg => msg !== newMessage));
        setIsFlashMessageActive(false);
    }, 7000);
  };

  const handleFormSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      setIsTitleInvalid(true);
      return;
    }

    if (newTodo.title === 'codewars') {
      alert('Kevin said to do your codewars, right now!');
    }
    if(newTodo.title.toLowerCase() === "flash") {
      setIsFlashMessageActive(true);
    }

    if (newTodo.title.toLowerCase() === 'flash') {
      newTodo.title = "Hello Mr. Kevin!, you've found my easter egg."
    }

    setTodos([...todos, newTodo]);
    setNewTodo({ id: newTodo.id + 1, title: '', task: '' });
    setIsTitleInvalid(false);

    addFlashMessage('You Busy Bee', `"${newTodo.title}" list item has been added successfully!`);
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
    handleModalClose();
    addFlashMessage("you've successfully removed the list item.", "");
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };
  return (
    <>
    <div >
      {flashMessages.map((message, index) => (
        <FlashMessage key={index} title={message.title} description={message.description} />
      ))}
    </div>
    <div className={` ${isFlashMessageActive ? 'flash-message-active' : ''}`}>
      <Navigation isToDoList={true} handleToDoListClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
      <div className={`app-container }`}>
        <h1>Add Things To My ToDo List.</h1>

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
          {isTitleInvalid && <span className="required-indicator">Title is required</span>}
        </form>

        <ul className={` ${isFlashMessageActive ? 'list-color-change' : ''}`}>
          {todos.map((todo) => (
            <li key={todo.id} onClick={() => handleTodoClick(todo.id)}>
              <span>{todo.title}</span>
              <button onClick={() => handleTodoRemove(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
