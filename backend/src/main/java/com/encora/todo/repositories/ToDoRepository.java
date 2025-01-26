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
}
