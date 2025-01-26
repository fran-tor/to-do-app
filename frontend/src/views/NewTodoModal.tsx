import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const NewTodoModal: React.FC<Props> = ({ isOpen, handleClose }) => {
  const [newTodoText, setNewTodoText] = React.useState('');
  const [newTodoPriority, setNewTodoPriority] = React.useState('Low');
  const [newTodoDueDate, setNewTodoDueDate] = React.useState('');

  const handleCreate = () => {
    if (newTodoText.trim() !== '') {
      // const newTask: Task = {
      //   id: tasks.length + 1,
      //   text: newTaskName,
      //   dueDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
      //   done: newTaskState === 'Done',
      //   doneDate: newTaskState === 'Done' ? new Date().toISOString() : undefined,
      //   priority: newTaskPriority,
      //   creationDate: new Date().toISOString(),
      // };
      // onTaskAdd(newTask);
      setNewTodoText('');
    } else {
      alert('Task name cannot be empty');
    }
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new To Do
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Name</p>
            <TextField
              label="Text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Priority</p>
            <FormControl sx={{ width: '100%' }}>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={newTodoPriority}
                onChange={(e) => setNewTodoPriority(e.target.value as string)}
                label=""
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Due Date</p>
            <TextField
              type="date"
              value={newTodoDueDate}
              onChange={(e) => setNewTodoDueDate(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleCreate}>Create</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default NewTodoModal;