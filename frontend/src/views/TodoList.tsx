import Metrics from './Metrics';
import TodosFilter from './TodosFilter';
import TodosTable from './TodosTable';
import {
  Box,
  Button,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import NewTodoModal from './NewTodoModal';

const TodoList = () => {
  const { tasks, error } = useFetch('http://localhost:9090/todos');
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);

  const handleNewTodoModalOpen = () => {
    setIsNewTodoModalOpen(true);
  }

  const handleNewTodoModalClose = () => {
    setIsNewTodoModalOpen(false);
  }

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
    //   onTaskAdd(newTask);+

    //   setNewTaskName('');
    // }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TodosFilter />
      <Button variant="contained" onClick={handleNewTodoModalOpen} style={{ maxWidth: '150px' }} sx={{ textTransform: 'capitalize' }}>
        + New To Do
      </Button>
      <TodosTable tasks={tasks} />
      <Metrics />
      <NewTodoModal isOpen={isNewTodoModalOpen} handleClose={handleNewTodoModalClose} />
    </Box>
  );
};

export default TodoList;