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

import com.encora.todo.models.MetricsModel;
import com.encora.todo.models.TodoModel;
import com.encora.todo.models.TodoResponse;
import com.encora.todo.services.TodoService;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:8080")
public class TodoController {

    @Autowired
    TodoService todoService;

    @GetMapping
    public TodoResponse getTodos(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String sortOrder,
        @RequestParam(required = false) String done,
        @RequestParam(required = false) String text,
        @RequestParam(required = false) String priority
    ) {
        List<TodoModel> todos = todoService.getTodos(page, size, sortBy, sortOrder, done, text, priority);
        MetricsModel metrics = todoService.getMetrics();
        TodoResponse response = new TodoResponse();
        response.setMetrics(metrics);
        response.setTodos(todos);
        return response;
    }

    @PostMapping
    public TodoModel addTodo(@RequestBody TodoModel toDo) {
        todoService.addTodo(toDo);
        return toDo;
    }

    @DeleteMapping("/{id}")
    public void deleteTodoById(@PathVariable Long id) {
        todoService.deleteTodoById(id);
    }

    @PutMapping("/{id}")
    public void updateTodoById(@PathVariable Long id, @RequestBody TodoModel toDo) {
        todoService.updateTodoById(id, toDo);
    }
}
