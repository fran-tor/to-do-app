import React, { useState } from 'react';
import { TodosFilterAttributes } from '../types';
import { TodosFilterContext } from './TodosFilterContext';

interface Props {
  children: React.ReactNode;
}

export const TodoListContextProvider: React.FC<Props> = ({ children }) => {
  const [todosFilterAttributes, setTodosFilterAttributes] = useState<TodosFilterAttributes>({
    page: 0,
    size: 10,
    sortBy: '',
    sortOrder: '',
    done: null,
    text: '',
    priority: '',
  });

  return (
    <TodosFilterContext.Provider value={{ todosFilterAttributes, setTodosFilterAttributes }}>
      {children}
    </TodosFilterContext.Provider>
  );
};
