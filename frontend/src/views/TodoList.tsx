import Metrics from './Metrics';
import TodosFilter from './TodosFilter';
import TodosTable from './TodosTable';
import {
  Box,
  Button,
} from '@mui/material';
import useFetch from '../hooks/useFetch';

const TodoList = () => {
  const { tasks, error } = useFetch('http://localhost:9090/todos');

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TodosFilter />
      <Button variant="contained" onClick={handleTaskAdd} style={{ maxWidth: '150px' }} sx={{ textTransform: 'capitalize' }}>
        + New To Do
      </Button>
      <TodosTable tasks={tasks} />
      <Metrics />
    </Box>
  );
};

export default TodoList;