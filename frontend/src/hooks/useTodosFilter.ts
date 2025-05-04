import { useContext } from 'react';
import { TodosFilterContext } from '../context/TodosFilterContext';

export const useTodosFilter = () => {
  const context = useContext(TodosFilterContext);

  if (!context) {
    throw new Error('useTodosFilter must be used within a TodoListContextProvider');
  }

  return context;
};