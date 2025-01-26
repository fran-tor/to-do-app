import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import * as React from 'react';

const TodosFilter: React.FC = () => {
  const [newTaskName, setNewTaskName] = React.useState('');
  const [newTaskPriority, setNewTaskPriority] = React.useState('Low');
  const [newTaskState, setNewTaskState] = React.useState('Done'); // Done, Undone

  return (
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
  )
}

export default TodosFilter;