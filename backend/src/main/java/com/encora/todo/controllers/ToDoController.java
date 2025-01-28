package com.encora.todo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public List<ToDoModel> getTodos(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String sortOrder,
        @RequestParam(required = false) String done,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String priority
    ) {
        return toDoService.getTodos(page, size, sortBy, sortOrder, done, name, priority);
    }

    @PostMapping
    public ToDoModel addTodo(@RequestBody ToDoModel toDo) {
        toDoService.addTodo(toDo);
        List<ToDoModel> todos = toDoService.getTodos(0, 0, null, null, null, null, null);
        return todos.get(todos.size());
    }

    @DeleteMapping("/{id}")
    public void deleteTodoById(@PathVariable Long id) {
        toDoService.deleteTodoById(id);
    }

    @PutMapping("/{id}")
    public void updateTodoById(@PathVariable Long id, @RequestBody ToDoModel toDo) {
        toDoService.updateTodoById(id, toDo);
    }
}
