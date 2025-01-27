import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { todos } from '../api/todos';
import { Todo } from '../types';
import { ActionType } from '../constants';
import { useEffect } from 'react';

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
  onTodoActionDone: () => void;
  actionType: ActionType;
  todo?: Todo;
}

const BaseModal: React.FC<Props> = ({ isOpen, handleClose, onTodoActionDone, actionType, todo }) => {
  const titleText = actionType === ActionType.CREATE ? 'Create a new To Do' : 'Edit To Do';
  const actionButtonText = actionType === ActionType.CREATE ? 'Create' : 'Edit';
  const [todoText, settodoText] = React.useState('');
  const [todoPriority, settodoPriority] = React.useState('Low');
  const [todoDueDate, setTodoDueDate] = React.useState('');

  useEffect(() => {
    if (todo && actionType === ActionType.EDIT) {
      settodoText(todo.text);
      settodoPriority(todo.priority);
      setTodoDueDate(todo.dueDate || '');
    }
  }, [todo, actionType]);

  const handleCreate = () => {
    if (todoText.trim() !== '') {
      const newTodo: Todo = {
        id: 0,
        text: todoText,
        dueDate: todoDueDate,
        done: false,
        doneDate: undefined,
        priority: todoPriority,
        creationDate: new Date().toISOString(),
      };
      console.log('due date', todoDueDate);
      todos.create(newTodo).finally(() => {
        // Resets values and closes modal after the request is done
        settodoText('');
        settodoPriority('Low');
        setTodoDueDate('');
        handleClose();
        onTodoActionDone();
      });
    } else {
      alert('Task name cannot be empty');
    }
  }

  const handleEdit = () => {
    if (todoText.trim() !== '') {
      const editedTodo: Todo = {
        ...todo,
        id: todo?.id ?? 0,
        text: todoText,
        dueDate: todoDueDate,
        priority: todoPriority,
        creationDate: todo?.creationDate ?? new Date().toISOString(),
      };
      todos.update(editedTodo).finally(() => {
        // Resets values and closes modal after the request is done
        settodoText('');
        settodoPriority('Low');
        setTodoDueDate('');
        handleClose();
        onTodoActionDone();
      });
    } else {
      alert('Task name cannot be empty');
    }
  }

  const handleAction = () => {
    if (actionType === ActionType.CREATE) {
      handleCreate();
    } else {
      handleEdit();
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
            {titleText}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Name</p>
            <TextField
              label="Text"
              value={todoText}
              onChange={(e) => settodoText(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Priority</p>
            <FormControl sx={{ width: '100%' }}>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={todoPriority}
                onChange={(e) => settodoPriority(e.target.value as string)}
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
              value={todoDueDate}
              onChange={(e) => setTodoDueDate('27-10-2021')}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAction}>{actionButtonText}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default BaseModal;