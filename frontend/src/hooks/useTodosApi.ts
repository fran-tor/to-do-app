import { useState, useCallback } from 'react';
import { todos } from '../api/todos';
import { Todo, TodosFilterAttributes } from '../types';

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
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await todos.getAll(filterAttributes);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError('Error fetching data');
      setIsLoading(false);
      throw err;
    }
  }, []);

  /**
   * Creates a new todo
   */
  const createTodo = useCallback(async (todo: Todo) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await todos.create(todo);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError('Error creating todo');
      setIsLoading(false);
      throw err;
    }
  }, []);

  /**
   * Updates an existing todo
   */
  const updateTodo = useCallback(async (todo: Todo) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await todos.update(todo);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError('Error updating todo');
      setIsLoading(false);
      throw err;
    }
  }, []);

  /**
   * Deletes a todo by ID
   */
  const deleteTodo = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await todos.delete(id);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError('Error deleting todo');
      setIsLoading(false);
      throw err;
    }
  }, []);

  return {
    isLoading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    clearError: () => setError(null)
  };
};