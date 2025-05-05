package com.encora.todo.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.encora.todo.models.MetricsModel;
import com.encora.todo.models.TodoModel;
import com.encora.todo.models.TodoResponse;
import com.encora.todo.repositories.TodoRepository;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    private final AtomicLong counter = new AtomicLong();
    private int pages = 0;
    private long avgTime = 0;
    private long avgTimeLow = 0;
    private long avgTimeMedium = 0;
    private long avgTimeHigh = 0;

    private final List<String> priorities = List.of("Low", "Medium", "High", "");
    private final List<String> statuses = List.of("true", "false", "");
    private final List<String> sortFields = List.of("priority", "dueDate", "");
    private final List<String> orderFields = List.of("asc", "desc", "");

    public TodoResponse getTodos(int page, int size, String sortBy, String sortOrder, String done, String text,
            String priority) {
        // Validate parameters - this could be moved to a validator class
        if (page < 0 || size < 0 ||
                (sortBy != null && !sortFields.contains(sortBy)) ||
                (sortOrder != null && !orderFields.contains(sortOrder)) ||
                (done != null && !statuses.contains(done)) ||
                text == null ||
                (priority != null && !priorities.contains(priority))) {
            return null;
        }

        List<TodoModel> todos = todoRepository.getTodoList();

        // Apply filters
        if (done != null && !done.isEmpty()) {
            boolean isDone = Boolean.parseBoolean(done);
            todos = todos.stream().filter(todo -> todo.isDone() == isDone).collect(Collectors.toList());
        }

        if (!text.isEmpty()) {
            todos = todos.stream().filter(todo -> todo.getText().toLowerCase().contains(text.toLowerCase()))
                    .collect(Collectors.toList());
        }

        if (priority != null && !priority.isEmpty()) {
            todos = todos.stream().filter(todo -> todo.getPriority().equalsIgnoreCase(priority))
                    .collect(Collectors.toList());
        }

        // Apply sorting
        if (sortBy != null && !sortBy.isEmpty()) {
            if (sortBy.equalsIgnoreCase("priority")) {
                todos = todos.stream().sorted((a, b) -> {
                    int comparison = Integer.compare(priorities.indexOf(a.getPriority()),
                            priorities.indexOf(b.getPriority()));
                    return sortOrder != null && sortOrder.equalsIgnoreCase("desc") ? -comparison : comparison;
                }).collect(Collectors.toList());
            } else if (sortBy.equalsIgnoreCase("dueDate")) {
                todos = todos.stream().sorted((a, b) -> {
                    String dueDateA = a.getDueDate() != null ? a.getDueDate() : "";
                    String dueDateB = b.getDueDate() != null ? b.getDueDate() : "";
                    int comparison = dueDateA.compareToIgnoreCase(dueDateB);
                    return sortOrder != null && sortOrder.equalsIgnoreCase("desc") ? -comparison : comparison;
                }).collect(Collectors.toList());
            }
        }

        // Apply pagination
        int totalItems = todos.size();
        int totalPages = size > 0 ? (int) Math.ceil((double) totalItems / size) : 0;
        this.pages = totalPages;

        int start = page * size;
        int end = Math.min(start + size, totalItems);

        List<TodoModel> paginatedTodos = start < totalItems ? todos.subList(start, end) : List.of();

        // Create response with metrics
        TodoResponse response = new TodoResponse();
        MetricsModel metrics = getMetrics();
        response.setMetrics(metrics);
        response.setTodos(paginatedTodos);

        return response;
    }

    public TodoModel addTodo(TodoModel todo) {
        // Fields are now validated with @Valid annotations
        todo.setId(counter.incrementAndGet());

        if (todo.getCreationDate() == null) {
            todo.setCreationDate(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        }

        todoRepository.setToDo(todo);
        return todo;
    }

    public boolean deleteTodoById(Long id) {
        return todoRepository.deleteToDoById(id);
    }

    public TodoModel updateTodoById(Long id, TodoModel todo) {
        // Fields are now validated with @Valid annotations
        return todoRepository.updateToDoById(id, todo);
    }

    public MetricsModel getMetrics() {
        calculateAvgTimeToFinishTodos();

        MetricsModel metrics = new MetricsModel();
        metrics.setPages(this.pages);
        metrics.setAvgTime(avgTime);
        metrics.setAvgTimeLow(avgTimeLow);
        metrics.setAvgTimeMedium(avgTimeMedium);
        metrics.setAvgTimeHigh(avgTimeHigh);

        return metrics;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public void calculateAvgTimeToFinishTodos() {
        List<TodoModel> todos = todoRepository.getTodoList();

        if (todos.isEmpty()) {
            avgTime = 0;
            avgTimeLow = 0;
            avgTimeMedium = 0;
            avgTimeHigh = 0;
            return;
        }

        long total = 0;
        long totalLow = 0;
        long totalMedium = 0;
        long totalHigh = 0;
        long count = 0;
        long countLow = 0;
        long countMedium = 0;
        long countHigh = 0;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");

        for (TodoModel todo : todos) {
            if (todo.isDone() && todo.getDoneDate() != null && !todo.getDoneDate().isEmpty()) {
                LocalDateTime creationDate = LocalDateTime.parse(todo.getCreationDate(), formatter);
                LocalDateTime doneDate = LocalDateTime.parse(todo.getDoneDate(), formatter);
                long duration = creationDate.until(doneDate, java.time.temporal.ChronoUnit.MINUTES);

                total += duration;
                count++;

                if (todo.getPriority().equalsIgnoreCase("Low")) {
                    totalLow += duration;
                    countLow++;
                } else if (todo.getPriority().equalsIgnoreCase("Medium")) {
                    totalMedium += duration;
                    countMedium++;
                } else if (todo.getPriority().equalsIgnoreCase("High")) {
                    totalHigh += duration;
                    countHigh++;
                }
            }
        }

        avgTime = count > 0 ? total / count : 0;
        avgTimeLow = countLow > 0 ? totalLow / countLow : 0;
        avgTimeMedium = countMedium > 0 ? totalMedium / countMedium : 0;
        avgTimeHigh = countHigh > 0 ? totalHigh / countHigh : 0;
    }
}