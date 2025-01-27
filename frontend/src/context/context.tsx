import { createContext, ReactNode, useContext, useState } from "react";
import { TodosFilterAttributes } from "../types";

interface TodoListContextProps {
  todosFilterAttributes: TodosFilterAttributes;
  setTodosFilterAttributes: (todosFilterAttributes: TodosFilterAttributes) => void;
}

const defaultFilterAttributes: TodosFilterAttributes = {
  page: 0,
  size: 10,
  sortBy: '',
  sortOrder: '',
  done: null,
  name: '',
  priority: 'All'
};

export const TodoListContext = createContext<TodoListContextProps | undefined>(undefined);

export function useTodoListContext() {
  const context = useContext(TodoListContext);
  if (context === undefined) {
    throw new Error('useTodoListContext must be used within a TodoListContextProvider');
  }
  return context;
}

interface TodoListContextProviderProps {
  children: ReactNode;
}

export const TodoListContextProvider: React.FC<TodoListContextProviderProps> = ({ children }) => {
  const [todosFilterAttributes, setTodosFilterAttributes] = useState<TodosFilterAttributes>(defaultFilterAttributes);

  return (
    <TodoListContext.Provider value={{ todosFilterAttributes, setTodosFilterAttributes }}>
      {children}
    </TodoListContext.Provider>
  );
};