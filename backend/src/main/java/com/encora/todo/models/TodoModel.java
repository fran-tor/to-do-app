package com.encora.todo.models;

import jakarta.validation.constraints.*;

public class TodoModel {

    private Long id;
    @NotBlank(message = "Text is required")
    @Size(max = 120, message = "Text cannot exceed 120 characters")
    private String text;

    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Due date must be in format YYYY-MM-DD")
    private String dueDate;

    private boolean done;

    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$", message = "Done date must be in ISO-8601 format (YYYY-MM-DDTHH:MM:SS.SSSZ)")
    private String doneDate;

    @NotNull(message = "Priority is required")
    @Pattern(regexp = "^(Low|Medium|High|)$", message = "Priority must be Low, Medium, High, or empty")
    private String priority;

    private String creationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(String doneDate) {
        this.doneDate = doneDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
}
