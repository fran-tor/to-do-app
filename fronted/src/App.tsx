import React from 'react'
import './App.css'
import TodoList from './TodoList'

function App() {
  return (
    <div className="App">
      <TodoList tasks={[]} onTaskAdd={function (task: Task): void {
        throw new Error('Function not implemented.')
      } } onTaskDelete={function (taskId: number): void {
        throw new Error('Function not implemented.')
      } } />
    </div>
  )
}

export default App
