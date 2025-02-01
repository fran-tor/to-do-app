package com.encora.todo.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.encora.todo.models.TodoModel;

@Repository
public class TodoRepository {
    private final List<TodoModel> todoList = new ArrayList<>();

    public List<TodoModel> getTodoList() {
        return todoList;
    }

    public void setToDo(TodoModel toDo) {
        todoList.add(toDo);
    }

    public void deleteToDoById(Long id) {
        todoList.removeIf(toDo -> toDo.getId().equals(id));
    }

    public void updateToDoById(Long id, TodoModel toDo) {
        todoList.stream()
                .filter(todo -> todo.getId().equals(id))
                .forEach(todo -> {
                    todo.setText(toDo.getText());
                    todo.setDueDate(toDo.getDueDate());
                    todo.setDone(toDo.isDone());
                    todo.setDoneDate(toDo.getDoneDate());
                    todo.setPriority(toDo.getPriority());
                });
    }
}
