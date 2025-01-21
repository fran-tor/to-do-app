import * as React from 'react';
import { Task } from '../types';
import Metrics from './Metrics';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

interface Props {
  tasks: Task[];
  onTaskAdd: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
}

const TodoList: React.FC<Props> = ({ tasks, onTaskAdd, onTaskDelete }) => {
  const [newTaskName, setNewTaskName] = React.useState('');
  const [newTaskPriority, setNewTaskPriority] = React.useState('Low');
  const [newTaskState, setNewTaskState] = React.useState('Done'); // Done, Undone

  const handleTaskAdd = () => {
    if (newTaskName.trim() !== '') {
      const newTask: Task = {
        id: tasks.length + 1,
        text: newTaskName,
        dueDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
        done: newTaskState === 'Done',
        doneDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
        priority: newTaskPriority,
        creationDate: new Date().toISOString(),
      };
      onTaskAdd(newTask);
      setNewTaskName('');
    }
  };

  const handleTaskDelete = (taskId: number) => {
    onTaskDelete(taskId);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderColor: 'primary.main', border: 1, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <p style={{ minWidth: '60px' }}>Name</p>
          <TextField
            label="Text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Priority</p>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as string)}
                label=""
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>State</p>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={newTaskState}
                onChange={(e) => setNewTaskState(e.target.value as string)}
                label=""
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="Undone">Undone</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

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