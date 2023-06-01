import React, {useState} from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

const TaskForm = ({onTaskCreate}) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleTitleChange = (event) => {
        setTaskTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            title: taskTitle,
            description: taskDescription,
        };

        fetch('http://localhost:8000/api/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTask),
        })
        .then((response) => response.json())
        .then((data) => {
          if (onTaskCreate) {
            onTaskCreate(data);
          }
          setTaskTitle('');
          setTaskDescription('');
        })
        .catch((error) => console.error(error));
    };

    return (
        <Container>
            <Typography variant="h2">Create Task</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                label="Title"
                value={taskTitle}
                onChange={handleTitleChange}
                fullWidth
                margin="normal"
                />
                <TextField
                label="Description"
                value={taskDescription}
                onChange={handleDescriptionChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                />
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </Container>
    );
};

export default TaskForm;