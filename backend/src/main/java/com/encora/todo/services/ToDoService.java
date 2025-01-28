package com.encora.todo.services;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.encora.todo.models.ToDoModel;
import com.encora.todo.repositories.ToDoRepository;

@Service
public class ToDoService {
    @Autowired
    ToDoRepository toDoRepository;

    private final AtomicLong counter = new AtomicLong();

    public List<ToDoModel> getTodos(int page, int size, String sortBy, String sortOrder, String done, String text, String priority) {
        List<ToDoModel> todos = toDoRepository.getToDoList();

        // Filter by done/undone
        if (done != null && !done.isEmpty()) {
            boolean isDone = Boolean.parseBoolean(done);
            todos = todos.stream().filter(todo -> todo.isDone() == isDone).collect(Collectors.toList());
        }

        // Filter by name
        if (text != null && !text.isEmpty()) {
            todos = todos.stream().filter(todo -> todo.getText().toLowerCase().contains(text.toLowerCase())).collect(Collectors.toList());
        }

        // Filter by priority
        if (priority != null && !priority.isEmpty() && priority.matches("^(Low|Medium|High)$")) {
            todos = todos.stream().filter(todo -> todo.getPriority().equalsIgnoreCase(priority)).collect(Collectors.toList());
        }

        // Sort by priority or due date
        if (sortBy != null && !sortBy.isEmpty()) {
            if (sortBy.equalsIgnoreCase("priority")) {
                todos = todos.stream().sorted((a, b) -> {
                    int comparison = a.getPriority().compareToIgnoreCase(b.getPriority());
                    return sortOrder != null && sortOrder.equalsIgnoreCase("desc") ? -comparison : comparison;
                }).collect(Collectors.toList());
            } else if (sortBy.equalsIgnoreCase("dueDate")) {
                todos = todos.stream().sorted((a, b) -> {
                    int comparison = a.getDueDate().compareToIgnoreCase(b.getDueDate());
                    return sortOrder != null && sortOrder.equalsIgnoreCase("desc") ? -comparison : comparison;
                }).collect(Collectors.toList());
            }
        }

        // Pagination
        int start = page * size;
        int end = Math.min(start + size, todos.size());
        return todos.subList(start, end);
    }

    public void addTodo(ToDoModel toDo) {
        toDo.setId(counter.incrementAndGet());
        // Verify if dates are in the correct format (ISO-8601)
        if (toDo.getDueDate() != null && !toDo.getDueDate().isEmpty() && !toDo.getDueDate().matches("^\\d{4}-\\d{2}-\\d{2}$")) {
            throw new IllegalArgumentException("Received invalid date format " + toDo.getDueDate() + ". Please use the ISO-8601 format (YYYY-MM-DD).");
        }
        toDoRepository.setToDo(toDo);
    }

    public void deleteTodoById(Long id) {
        toDoRepository.deleteToDoById(id);
    }

    public void updateTodoById(Long id, ToDoModel toDo) {
        toDoRepository.updateToDoById(id, toDo);
    }
}