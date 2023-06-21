import { useState } from 'react';
import Button from "react-bootstrap/Button";
import ToDoForm from '../components/ToDoForm';

type ToDo = {
    id: number
    title: string
}

type HomeProps = {
    name: string
    handleClick: (e:React.MouseEvent) => void
}

export default function Home({ name, handleClick }: HomeProps) {
    const [todo, setToDo] = useState<ToDo[]>([]);
    const [newToDo, setNewToDo] = useState<ToDo>({ id: 1, title: ''})

    const handleFormSubmit = (event: React.FormEvent) : void => {
        event.preventDefault();

        setToDo([...todo, newToDo]);
        setNewToDo({ id: (todo.length + 2), title: ''})
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        console.log(event.target.name, event.target.value)
        setNewToDo({...newToDo, [event.target.name]: event.target.value})
    }

    return (
        <>
            <h1>Hello My Beautiful People{name.toUpperCase()}</h1>
            <Button variant="danger" onClick={handleClick}></Button>
            <ToDoForm handleSubmit={handleFormSubmit} newToDo={newToDo} handleChange={handleInputChange}/>
            {todo.map( p => <li key={p.id}>{p.title}</li>)}
            <Button variant='info' onClick={() => {setToDo([])}}>Clear All Lists</Button>
        </>
    )
}