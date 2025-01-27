import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import * as React from 'react';

interface Props {
  onTodosListChange: () => void;
}

const TodosFilter: React.FC = () => {
  const [newTodoText, setNewTodoText] = React.useState('');
  const [newTodoPriority, setNewTodoPriority] = React.useState('All');
  const [newTodoState, setNewTodoState] = React.useState('All');

  // handleSearch = async () => {
  //   await todos.getAll(newTodoText, newTodoPriority, newTodoState)
  //     .then((data) => setTodosList(data))
  //     .catch(() => setServerError('Error fetching data'));
  // }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderColor: 'primary.main', border: 1, p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <p style={{ minWidth: '60px' }}>Name</p>
        <TextField
          label="Text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
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
              value={newTodoPriority}
              onChange={(e) => setNewTodoPriority(e.target.value as string)}
              label=""
            >
              <MenuItem value="All">All</MenuItem>
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
              value={newTodoState}
              onChange={(e) => setNewTodoState(e.target.value as string)}
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
  )
}

export default TodosFilter;