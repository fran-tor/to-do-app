package com.encora.todo.controllers;


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

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.encora.todo.exceptions.ApiResponse;
import com.encora.todo.models.TodoModel;
import com.encora.todo.models.TodoResponse;
import com.encora.todo.services.TodoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:8080")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<ApiResponse<TodoResponse>> getTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder,
            @RequestParam(required = false) String done,
            @RequestParam(required = false) String text,
            @RequestParam(required = false) String priority) {
        
        TodoResponse todoResponse = todoService.getTodos(page, size, sortBy, sortOrder, done, text, priority);
        
        if (todoResponse == null) {
            return ResponseEntity.badRequest().body(
                new ApiResponse<>(false, "Invalid parameters", null)
            );
        }
        
        return ResponseEntity.ok(
            new ApiResponse<>(true, "Todos retrieved successfully", todoResponse)
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TodoModel>> addTodo(@Valid @RequestBody TodoModel todo) {
        TodoModel savedTodo = todoService.addTodo(todo);
        
        if (savedTodo == null) {
            return ResponseEntity.badRequest().body(
                new ApiResponse<>(false, "Failed to create todo", null)
            );
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ApiResponse<>(true, "Todo created successfully", savedTodo)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TodoModel>> updateTodoById(
            @PathVariable Long id, 
            @Valid @RequestBody TodoModel todo) {
        
        todo.setId(id); // Ensure ID consistency
        
        TodoModel updatedTodo = todoService.updateTodoById(id, todo);
        
        if (updatedTodo == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(
            new ApiResponse<>(true, "Todo updated successfully", updatedTodo)
        );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTodoById(@PathVariable Long id) {
        boolean deleted = todoService.deleteTodoById(id);
        
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(
            new ApiResponse<>(true, "Todo deleted successfully", null)
        );
    }
}
