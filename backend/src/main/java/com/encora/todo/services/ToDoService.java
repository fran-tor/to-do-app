package com.encora.todo.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.encora.todo.models.ToDoModel;
import com.encora.todo.repositories.ToDoRepository;

@Service
public class ToDoService {
    @Autowired
    ToDoRepository toDoRepository;

    public ArrayList<ToDoModel> getTodos() {
        return (ArrayList<ToDoModel>) toDoRepository.getToDoList();
    }

    public void addTodo(ToDoModel toDo) {
        toDoRepository.setToDo(toDo);
    }
}