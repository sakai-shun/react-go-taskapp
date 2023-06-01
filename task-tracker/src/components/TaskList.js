import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/tasks').then((response) => response.json()).then((data) => setTasks(data));
  }, []);
  
  return (
    <Container>
      <Typography variant="h2">Task List</Typography>
      <List className="list-disc pl-4">
      {tasks.map((task) => (
        <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
        </ListItem>
      ))}
      </List>
    </Container>
  );
};

export default TaskList;