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
import EditTodoModal from './EditTodoModal';
// import { TodoListContext, TodoListContextProvider } from '../context/context';

const TodoApp = () => {
  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const [todosFilterAttributes, setTodosFilterAttributes] = useState({
    page: 0,
    size: 10,
    sortBy: '',
    sortOrder: '',
    done: null,
    text: '',
    priority: '',
  });

  const fetchTodos = async () => {
    await todos.getAll()
      .then((data) => setTodosList(data))
      .catch(() => setServerError('Error fetching data'));
  };

  useEffect(() => {
    fetchTodos();
  }, [todosFilterAttributes]);

  const handleNewTodoModalOpen = () => {
    setIsNewTodoModalOpen(true);
  };

  const handleNewTodoModalClose = async () => {
    setIsNewTodoModalOpen(false);
    setServerError(null);
  };

  const handleEditTodoModalOpen = (todo: Todo) => {
    setIsEditTodoModalOpen(true);
    setTodoToEdit(todo);
  }

  const handleEditTodoModalClose = () => {
    setIsEditTodoModalOpen(false);
  }

  const handleTodosListChange = async () => {
    await fetchTodos();
  }

  return (
    // <TodoListContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TodosFilter />
        <Button variant="contained" onClick={handleNewTodoModalOpen} style={{ maxWidth: '150px' }} sx={{ textTransform: 'capitalize' }}>
          + New To Do
        </Button>
        {serverError ? (
          <Box sx={{ color: 'red' }}>{serverError}</Box>
        ) : (
          <TodosTable todosList={todosList} onTodosListChange={handleTodosListChange} onTodoEdit={handleEditTodoModalOpen} />
        )}
        <Metrics />
        <NewTodoModal isOpen={isNewTodoModalOpen} handleClose={handleNewTodoModalClose} onTodoAdded={handleTodosListChange} />
        <EditTodoModal isOpen={isEditTodoModalOpen} handleClose={handleEditTodoModalClose} onTodoEdited={handleTodosListChange} todo={todoToEdit} />
      </Box>
    // </TodoListContextProvider>
  );
};

export default TodoApp;