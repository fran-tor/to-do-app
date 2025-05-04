import React, { createContext } from 'react';
import { TodosFilterAttributes } from '../types';

interface TodosFilterContextType {
  todosFilterAttributes: TodosFilterAttributes;
  setTodosFilterAttributes: React.Dispatch<React.SetStateAction<TodosFilterAttributes>>;
}

// Export the context so it can be imported in the hook file
export const TodosFilterContext = createContext<TodosFilterContextType>({
  todosFilterAttributes: {
    page: 0,
    size: 10,
    sortBy: '',
    sortOrder: '',
    done: null,
    text: '',
    priority: '',
  },
  setTodosFilterAttributes: () => {},
});
