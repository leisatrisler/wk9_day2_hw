import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


type ToDo = {
    id: number
    title: string
}

type ToDoFormProps = {
    handleSubmit: (e:React.FormEvent) => void
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
    newToDo: ToDo
}

export default function ToDoForm({ handleSubmit, handleChange, newToDo }: ToDoFormProps) {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label>List Of To Do</Form.Label>
            <Form.Control value={newToDo.title} name='title' onChange={handleChange} />
            <Button variant='warning' type='submit'>Create List</Button>
        </Form>
    )
}