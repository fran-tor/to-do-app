package com.encora.todo.models;

import java.util.List;

public class TodoResponse {
    private MetricsModel metrics;
    private List<ToDoModel> todos;

    public MetricsModel getMetrics() {
        return metrics;
    }

    public void setMetrics(MetricsModel metrics) {
        this.metrics = metrics;
    }

    public List<ToDoModel> getTodos() {
        return todos;
    }

    public void setTodos(List<ToDoModel> todos) {
        this.todos = todos;
    }
}
