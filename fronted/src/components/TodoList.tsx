import * as React from 'react';
import { Task } from '../types';
import Metrics from './Metrics';
import TodosFilter from './TodosFilter';
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

interface Props {
  tasks: Task[];
  onTaskAdd: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
}

const TodoList: React.FC<Props> = ({ tasks, onTaskAdd, onTaskDelete }) => {
  const handleTaskAdd = () => {
    // if (newTaskName.trim() !== '') {
    //   const newTask: Task = {
    //     id: tasks.length + 1,
    //     text: newTaskName,
    //     dueDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
    //     done: newTaskState === 'Done',
    //     doneDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
    //     priority: newTaskPriority,
    //     creationDate: new Date().toISOString(),
    //   };
    //   onTaskAdd(newTask);
    //   setNewTaskName('');
    // }
  };

  const handleTaskDelete = (taskId: number) => {
    onTaskDelete(taskId);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TodosFilter />

      <Button variant="contained" onClick={handleTaskAdd} style={{ maxWidth: '150px' }} sx={{ textTransform: 'capitalize' }}>
        + New To Do
      </Button>
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
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>{task.text}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.dueDate || '-'}</TableCell>
              <TableCell>
                <Button variant="text" onClick={() => handleTaskDelete(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Metrics />
    </Box>
  );
};

export default TodoList;