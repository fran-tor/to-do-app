import './App.css'
import { TodoListContextProvider } from './context/context'
import TodoApp from './views/TodoApp'

function App() {
  return (
    <div className="App">
      <TodoListContextProvider>
        <TodoApp />
      </TodoListContextProvider>
    </div>
  )
}

export default App
