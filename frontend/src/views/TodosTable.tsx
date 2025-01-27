import React from "react";
import { Todo } from "../types";
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { todos } from "../api/todos";

interface Props {
  todosList: Todo[];
  onTodosListChange: () => void;
  onTodoEdit: (todo: Todo) => void;
}

const TodosTable: React.FC<Props> = ({ todosList, onTodosListChange, onTodoEdit }) => {
  const handleTodoDelete = async (todoId: number) => {
    await todos.delete(todoId).finally(async () => {
      onTodosListChange();
    });
  }

  const handleTodoEdit = (todo: Todo) => {
    onTodoEdit(todo);
  }

  const handleTodoStateChange = async (todo: Todo, checked: boolean) => {
    todo.done = checked;
    await todos.update(todo).finally(async () => {
      onTodosListChange();
    });
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todosList.map((todo, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={todo.done}
                onChange={(event) => { handleTodoStateChange(todo, event.target.checked) }}
              />
            </TableCell>
            <TableCell>{todo.text}</TableCell>
            <TableCell>{todo.priority}</TableCell>
            <TableCell>{todo.dueDate ? todos.getFormattedDate(todo.dueDate) : '-'}</TableCell>
            <TableCell>
              <Button variant="text" onClick={() => handleTodoEdit(todo)}>
                Edit
              </Button>
              <Button variant="text" onClick={() => handleTodoDelete(todo.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TodosTable;
