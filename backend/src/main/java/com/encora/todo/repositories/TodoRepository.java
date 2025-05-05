package com.encora.todo.repositories;

import com.encora.todo.models.TodoModel;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class TodoRepository implements ITodoRepository {
    private final List<TodoModel> todoList = new ArrayList<>();

    @Override
    public List<TodoModel> getTodoList() {
        return new ArrayList<>(todoList); // Return a defensive copy
    }

    @Override
    public void setToDo(TodoModel todo) {
        todoList.add(todo);
    }

    @Override
    public boolean deleteToDoById(Long id) {
        int initialSize = todoList.size();
        todoList.removeIf(todo -> todo.getId().equals(id));
        return todoList.size() < initialSize;
    }

    @Override
    public TodoModel updateToDoById(Long id, TodoModel updatedTodo) {
        Optional<TodoModel> existingTodo = todoList.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst();
        
        if (existingTodo.isPresent()) {
            TodoModel todo = existingTodo.get();
            todo.setText(updatedTodo.getText());
            todo.setDueDate(updatedTodo.getDueDate());
            todo.setDone(updatedTodo.isDone());
            todo.setDoneDate(updatedTodo.getDoneDate());
            todo.setPriority(updatedTodo.getPriority());
            return todo;
        }
        
        return null;
    }
}