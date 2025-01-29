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
  pages: number;
}

export interface TodosResponse {
  metrics: Metrics;
  todos: Todo[];
}

export interface TodosFilterAttributes {
  page: number;
  size: number;
  sortBy: string;
  sortOrder: string;
  done: boolean | null;
  text: string;
  priority: string;
}