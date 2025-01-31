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
import com.encora.todo.repositories.TodoRepository;

@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;

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

    private boolean validateID(Long id) {
        if (id == null || id < 0) {
            System.out.println("Invalid ID " + id + ". Use a number greater than or equal to 0.");
            return false;
        }
        return true;
    }

    private boolean validateTodoFields(TodoModel todo) {
        if (!validateID(todo.getId())) {
            return false;
        }

        if (todo.getText() == null || todo.getText().isEmpty()) {
            System.out.println("Invalid text field. Use a valid string.");
            return false;
        }

        // Verify if dates are in the correct format (ISO-8601)
        if (todo.getDueDate() != null && !todo.getDueDate().isEmpty() && !todo.getDueDate().matches("^\\d{4}-\\d{2}-\\d{2}$")) {
            System.out.println("Received invalid date format " + todo.getDueDate() + ". Please use the ISO-8601 format (YYYY-MM-DD).");
            return false;
        }

        if (todo.getDoneDate() != null && !todo.getDoneDate().isEmpty() && !todo.getDoneDate().matches("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$")) {
            System.out.println("Received invalid date format " + todo.getDoneDate() + ". Please use the ISO-8601 format (YYYY-MM-DDTHH:MM:SS.SSSZ).");
            return false;
        }

        if (todo.getPriority() == null || !priorities.contains(todo.getPriority())) {
            System.out.println("Invalid priority field. Use one of: " + priorities);
            return false;
        }

        return true;
    }

    public List<TodoModel> getTodos(int page, int size, String sortBy, String sortOrder, String done, String text, String priority) {
        List<TodoModel> todos = todoRepository.getTodoList();

        if (page < 0) {
            System.out.println("Invalid page number. Use a number greater than or equal to 0.");
            return null;
        }

        if (size < 0) {
            System.out.println("Invalid size number. Use a number greater than or equal to 0.");
            return null;
        }

        if (sortBy != null && !sortFields.contains(sortBy)) {
            System.out.println("Invalid sortBy field. Use one of: " + sortFields);
            return null;
        }

        if (sortOrder != null && !orderFields.contains(sortOrder)) {
            System.out.println("Invalid sortOrder field. Use one of: " + orderFields);
            return null;
        }

        if (done != null && !statuses.contains(done)) {
            System.out.println("Invalid done field. Use one of: " + statuses);
            return null;
        }

        if (text == null) {
            System.out.println("Invalid text field. Use a valid string.");
            return null;
        }

        if (priority != null && !priorities.contains(priority)) {
            System.out.println("Invalid priority field. Use one of: " + priorities);
            return null;
        }

        // Filter by done/undone
        if (done != null && !done.isEmpty() && statuses.contains(done)) {
            boolean isDone = Boolean.parseBoolean(done);
            todos = todos.stream().filter(todo -> todo.isDone() == isDone).collect(Collectors.toList());
        }

        // Filter by name
        if (!text.isEmpty()) {
            todos = todos.stream().filter(todo -> todo.getText().toLowerCase().contains(text.toLowerCase())).collect(Collectors.toList());
        }

        // Filter by priority
        if (priority != null && !priority.isEmpty() && priorities.contains(priority)) {
            todos = todos.stream().filter(todo -> todo.getPriority().equalsIgnoreCase(priority)).collect(Collectors.toList());
        }

        // Sort by priority or due date
        if (sortBy != null && !sortBy.isEmpty()) {
            if (sortBy.equalsIgnoreCase(sortFields.get(0))) {
                todos = todos.stream().sorted((a, b) -> {
                    int comparison = Integer.compare(priorities.indexOf(a.getPriority()), priorities.indexOf(b.getPriority()));
                    return sortOrder != null && sortOrder.equalsIgnoreCase("desc") ? -comparison : comparison;
                }).collect(Collectors.toList());
            } else if (sortBy.equalsIgnoreCase(sortFields.get(1))) {
                todos = todos.stream().sorted((a, b) -> {
                    String dueDateA = a.getDueDate() != null ? a.getDueDate() : "";
                    String dueDateB = b.getDueDate() != null ? b.getDueDate() : "";
                    int comparison = dueDateA.compareToIgnoreCase(dueDateB);
                    return sortOrder != null && sortOrder.equalsIgnoreCase("desc") ? -comparison : comparison;
                }).collect(Collectors.toList());
            }
        }

        // Pagination
        int start = page * size;
        int end = Math.min(start + size, todos.size());
        setPages((int) Math.ceil((double) todos.size() / size));
        return todos.subList(start, end);
    }

    public boolean addTodo(TodoModel todo) {
        if (!validateTodoFields(todo)) {
            return false;
        }
        todo.setId(counter.incrementAndGet());
        todoRepository.setToDo(todo);
        return true;
    }

    public void deleteTodoById(Long id) {
        todoRepository.deleteToDoById(id);
    }

    public void updateTodoById(Long id, TodoModel todo) {
        todoRepository.updateToDoById(id, todo);
    }

    public MetricsModel getMetrics() {
        MetricsModel metrics = new MetricsModel();
        calculateAvgTimeToFinishTodos();
        metrics.setPages(getPages());
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