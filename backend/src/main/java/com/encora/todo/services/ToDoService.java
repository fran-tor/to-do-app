package com.encora.todo.services;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.encora.todo.models.ToDoModel;
import com.encora.todo.repositories.ToDoRepository;

@Service
public class ToDoService {
    @Autowired
    ToDoRepository toDoRepository;

    private final AtomicLong counter = new AtomicLong();

    public ArrayList<ToDoModel> getTodos() {
        return (ArrayList<ToDoModel>) toDoRepository.getToDoList();
    }

    public void addTodo(ToDoModel toDo) {
        toDo.setId(counter.incrementAndGet());
        toDoRepository.setToDo(toDo);
    }

    public void deleteTodoById(Long id) {
        toDoRepository.deleteToDoById(id);
    }

    public void updateTodoById(Long id, ToDoModel toDo) {
        toDoRepository.updateToDoById(id, toDo);
    }
}