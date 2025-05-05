import { useState, useEffect, useCallback } from 'react';
import { Todo, TodosFilterAttributes, TodosMetrics } from '../types';
import { useTodosApi } from './useTodosApi';

/**
 * Custom hook that manages todo state and integrates with the API
 */
export const useTodoState = (filterAttributes: TodosFilterAttributes) => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [metrics, setMetrics] = useState<TodosMetrics>({ 
    pages: 0, 
    avgTime: 0, 
    avgTimeLow: 0, 
    avgTimeMedium: 0, 
    avgTimeHigh: 0 
  });
  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);
  
  // Import API functions from our API hook
  const { 
    fetchTodos, 
    error,
    isLoading
  } = useTodosApi();

  /**
   * Fetches todos from the API and updates state
   */
  const loadTodos = useCallback(async () => {
    try {
      const data = await fetchTodos(filterAttributes);
      setTodosList(data.todos);
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // Error is handled in the useTodosApi hook
      setTodosList([]);
    }
  }, [fetchTodos, filterAttributes]);

  // Load todos when filter attributes change
  useEffect(() => {
    loadTodos();
  }, [loadTodos, filterAttributes]);

  return {
    todosList,
    metrics,
    todoToEdit,
    setTodoToEdit,
    refreshTodos: loadTodos,
    error,
    isLoading,
  };
};