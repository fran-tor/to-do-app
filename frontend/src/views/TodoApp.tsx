import Metrics from './Metrics';
import TodosFilter from './TodosFilter';
import TodosTable from './TodosTable';
import {
  Box,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import NewTodoModal from './NewTodoModal';
import { todos } from '../api/todos';
import { Todo } from '../types';

const TodoApp = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);

  useEffect(() => {
    todos.getAll()
      .then((data) => setTodosList(data))
      .catch(() => setServerError('Error fetching data'));
  });

  const handleNewTodoModalOpen = () => {
    setIsNewTodoModalOpen(true);
  }

  const handleNewTodoModalClose = () => {
    setIsNewTodoModalOpen(false);
    setServerError(null);
    todos.getAll()
      .then((data) => setTodosList(data))
      .catch(() => setServerError('Error fetching data'));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TodosFilter />
      <Button variant="contained" onClick={handleNewTodoModalOpen} style={{ maxWidth: '150px' }} sx={{ textTransform: 'capitalize' }}>
        + New To Do
      </Button>
      {serverError ? (
        <Box sx={{ color: 'red' }}>{serverError}</Box>
      ) : (
        <TodosTable todosList={todosList} />
      )}
      <Metrics />
      <NewTodoModal isOpen={isNewTodoModalOpen} handleClose={handleNewTodoModalClose} />
    </Box>
  );
};

export default TodoApp;