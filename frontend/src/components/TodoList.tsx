import { Task } from '../types';
import Metrics from './Metrics';
import TodosFilter from './TodosFilter';
import TodosTable from './TodosTable';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:9090/todos')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleTaskAdd = () => {
    // if (newTaskName.trim() !== '') {
    //   const newTask: Task = {
    //     id: tasks.length + 1,
    //     text: newTaskName,
    //     dueDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
    //     done: newTaskState === 'Done',
    //     doneDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
    //     priority: newTaskPriority,
    //     creationDate: new Date().toISOString(),
    //   };
    //   onTaskAdd(newTask);
    //   setNewTaskName('');
    // }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TodosFilter />

      <Button variant="contained" onClick={handleTaskAdd} style={{ maxWidth: '150px' }} sx={{ textTransform: 'capitalize' }}>
        + New To Do
      </Button>
      <TodosTable tasks={tasks} />
      <Metrics />
    </Box>
  );
};

export default TodoList;