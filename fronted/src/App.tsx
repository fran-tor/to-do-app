import './App.css'
import TodoList from './components/TodoList'
import { Task } from './types'

const tasks: Task[] = [
  {
    id: 1,
    text: 'Task 1',
    dueDate: '2021-10-01T00:00:00.000Z',
    done: false,
    doneDate: undefined,
    priority: 'Low',
    creationDate: '2021-09-01T00:00:00.000Z',
  },
  {
    id: 2,
    text: 'Task 2',
    dueDate: '',
    done: true,
    doneDate: '2021-10-02T00:00:00.000Z',
    priority: 'Medium',
    creationDate: '2021-09-02T00:00:00.000Z',
  },
  {
    id: 3,
    text: 'Task 3',
    dueDate: '2021-10-03T00:00:00.000Z',
    done: false,
    doneDate: undefined,
    priority: 'High',
    creationDate: '2021-09-03T00:00:00.000Z',
  },
]

function App() {
  return (
    <div className="App">
      <TodoList tasks={tasks} onTaskAdd={function (task: Task): void {
        throw new Error('Function not implemented.')
      }} onTaskDelete={function (taskId: number): void {
        throw new Error('Function not implemented.')
      }} />
    </div>
  )
}

export default App
