import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

interface Task {
  name: string;
  priority: string;
  dueDate?: string;
}

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
        name: newTaskName,
        priority: newTaskPriority,
      };
      onTaskAdd(newTask);
      setNewTaskName('');
    }
  };

  // const handleTaskStateChange = (taskId: number, state: string) => {
  //   // onTaskStateChange(taskId, state);
  // }

  const handleTaskDelete = (taskId: number) => {
    onTaskDelete(taskId);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderColor: 'primary.main', border: 1, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <p>Name</p>
          <TextField
            label="Text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p>Priority</p>
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
            <p>State</p>
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
          <Button variant="contained" onClick={handleTaskAdd}>
            Add
          </Button>
        </Box>
      </Box>

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
              <TableCell>{task.name}</TableCell>
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

      {/* Average time to finish tasks */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Average time to finish tasks: 22:15 minutes</p>
        <div>
          <p>Average time to finish tasks by priority:</p>
          <ul>
            <li>Low: 10:25 mins</li>
            <li>Medium: 10:25 mins</li>
            <li>High: 10:25 mins</li>
          </ul>
        </div>
      </Box>
    </Box>
  );
};

export default TodoList;