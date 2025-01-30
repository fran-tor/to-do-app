package com.encora.todo.models;

import java.util.List;

public class TodoResponse {
    private MetricsModel metrics;
    private List<TodoModel> todos;

    public MetricsModel getMetrics() {
        return metrics;
    }

    public void setMetrics(MetricsModel metrics) {
        this.metrics = metrics;
    }

    public List<TodoModel> getTodos() {
        return todos;
    }

    public void setTodos(List<TodoModel> todos) {
        this.todos = todos;
    }
}
