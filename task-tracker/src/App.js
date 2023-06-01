import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<TaskList />}></Route>
          <Route exact path="/create" element={<TaskForm />}></Route>
        </Routes>
    </Router>
  )
}

export default App;
