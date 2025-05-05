package com.encora.todo.repositories;

import com.encora.todo.models.TodoModel;
import java.util.List;

/**
 * Repository interface for Todo operations
 * This allows for future implementation with different data stores
 */
public interface ITodoRepository {
    /**
     * Get all todos
     * @return List of todos
     */
    List<TodoModel> getTodoList();
    
    /**
     * Add a new todo
     * @param todo The todo to add
     */
    void setToDo(TodoModel todo);
    
    /**
     * Delete a todo by ID
     * @param id The ID of the todo to delete
     * @return true if deleted, false if not found
     */
    boolean deleteToDoById(Long id);
    
    /**
     * Update a todo by ID
     * @param id The ID of the todo to update
     * @param todo The updated todo data
     * @return The updated todo if found, null otherwise
     */
    TodoModel updateToDoById(Long id, TodoModel todo);
}