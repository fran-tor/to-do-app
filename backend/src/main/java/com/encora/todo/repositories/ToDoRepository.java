package com.encora.todo.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.encora.todo.models.ToDoModel;

@Repository
public class ToDoRepository {
    private final List<ToDoModel> toDoList = new ArrayList<>();

    public List<ToDoModel> getToDoList() {
        return toDoList;
    }

    public void setToDo(ToDoModel toDo) {
        toDoList.add(toDo);
    }

    public void deleteToDoById(Long id) {
        toDoList.removeIf(toDo -> toDo.getId().equals(id));
    }

    public void updateToDoById(Long id, ToDoModel toDo) {
        toDoList.stream()
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
