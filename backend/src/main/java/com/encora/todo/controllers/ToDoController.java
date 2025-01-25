package com.encora.todo.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.encora.todo.models.ToDoModel;
import com.encora.todo.services.ToDoService;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:8080")
public class ToDoController {

    @Autowired
    ToDoService toDoService;

    @GetMapping
    public ArrayList<ToDoModel> getTodos() {
        return toDoService.getTodos();
    }

    @PostMapping
    public void addTodo(@RequestBody ToDoModel toDo) {
        toDoService.addTodo(toDo);
    }
}
