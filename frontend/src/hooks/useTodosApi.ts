import { useState, useCallback } from 'react';
import { todos } from '../api/todos';
import { Todo, TodosFilterAttributes } from '../types';
import { createApiRequest } from '../api/utils';

/**
 * Custom hook that encapsulates API interactions for todos
 */
export const useTodosApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Fetches todos based on filter attributes
   */
  const fetchTodos = useCallback(async (filterAttributes: TodosFilterAttributes) => {
    return createApiRequest(
      () => todos.getAll(filterAttributes),
      setIsLoading,
      setError,
      'Error fetching data'
    )();
  }, []);

  /**
   * Creates a new todo
   */
  const createTodo = useCallback(async (todo: Todo) => {
    return createApiRequest(
      () => todos.create(todo),
      setIsLoading,
      setError,
      'Error creating todo'
    )();
  }, []);

  /**
   * Updates an existing todo
   */
  const updateTodo = useCallback(async (todo: Todo) => {
    return createApiRequest(
      () => todos.update(todo),
      setIsLoading,
      setError,
      'Error updating todo'
    )();
  }, []);

  /**
   * Deletes a todo by ID
   */
  const deleteTodo = useCallback(async (id: number) => {
    return createApiRequest(
      () => todos.delete(id),
      setIsLoading,
      setError,
      'Error deleting todo'
    )();
  }, []);

  return {
    isLoading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo
  };
};