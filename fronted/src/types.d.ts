export interface Task {
  id: number;
  text: string;
  dueDate?: string;  // Optional
  done?: boolean;
  doneDate?: string; // Optional
  priority: string;
  creationDate: string;
}