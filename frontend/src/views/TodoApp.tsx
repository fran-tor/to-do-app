import Metrics from './Metrics';
import TodosFilter from './TodosFilter';
import TodosTable from './TodosTable';
import { Box, Button } from '@mui/material';
import NewTodoModal from './NewTodoModal';
import { Todo } from '../types';
import EditTodoModal from './EditTodoModal';
import { useTodosFilter } from '../context/TodosFilterContext';
import TodosPagination from './Pagination';
import { useTodoState } from '../hooks/useTodoState';
import { useModalState } from '../hooks/useModalState';

/**
 * TodoApp is the main component for the Todo application.
 * It leverages custom hooks for API calls, state management, and modal handling.
 */
const TodoApp = () => {
  // Get filter attributes from context
  const { todosFilterAttributes } = useTodosFilter();

  // Use custom hooks to manage todos, API calls and modals
  const {
    todosList,
    metrics,
    todoToEdit,
    setTodoToEdit,
    refreshTodos,
    error
  } = useTodoState(todosFilterAttributes);

  const {
    isNewTodoModalOpen,
    isEditTodoModalOpen,
    openNewTodoModal,
    closeNewTodoModal,
    openEditTodoModal,
    closeEditTodoModal
  } = useModalState();

  /**
   * Handler for opening edit todo modal
   */
  const handleEditTodoModalOpen = (todo: Todo) => {
    setTodoToEdit(todo);
    openEditTodoModal();
  };

  /**
   * Handler for when todos list needs to be refreshed
   */
  const handleTodosListChange = async () => {
    await refreshTodos();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TodosFilter />
      <Button
        variant="contained"
        onClick={openNewTodoModal}
        style={{ maxWidth: '150px' }}
        sx={{ textTransform: 'capitalize' }}
      >
        + New To Do
      </Button>

      {error ? (
        <Box sx={{ color: 'red' }}>{error}</Box>
      ) : (
        <TodosTable
          todosList={todosList}
          onTodosListChange={handleTodosListChange}
          onTodoEdit={handleEditTodoModalOpen}
        />
      )}

      <TodosPagination pages={metrics.pages} />
      <Metrics metrics={metrics} />

      <NewTodoModal
        isOpen={isNewTodoModalOpen}
        handleClose={closeNewTodoModal}
        onTodoAdded={handleTodosListChange}
      />

      <EditTodoModal
        isOpen={isEditTodoModalOpen}
        handleClose={closeEditTodoModal}
        onTodoEdited={handleTodosListChange}
        todo={todoToEdit}
      />
    </Box>
  );
};

export default TodoApp;