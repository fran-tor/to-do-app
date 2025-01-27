export interface Todo {
  id: number;
  text: string;
  dueDate?: string;  // Optional
  done?: boolean;
  doneDate?: string; // Optional
  priority: string;
  creationDate: string;
}

export interface Metrics {
  
}

export interface TodosFilterAttributes {
  page: number;
  size: number;
  sortBy: string;
  sortOrder: string;
  done: boolean | null;
  name: string;
  priority: string;
}