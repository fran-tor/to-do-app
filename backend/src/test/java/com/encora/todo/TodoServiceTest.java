package com.encora.todo;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.encora.todo.models.TodoModel;
import com.encora.todo.repositories.TodoRepository;
import com.encora.todo.services.TodoService;

public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;
    private final String wrongField = "hola";

    @InjectMocks
    private TodoService todoService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetTodos() {
        List<TodoModel> todos = todoService.getTodos(0, 10, "", "", "", "", "");
        assert(todos != null);
    }

    @Test
    void testGetTodosWrongPage() {
        List<TodoModel> todos = todoService.getTodos(-1, 10, "", "", "", "", "");
        assert(todos == null);
    }

    @Test
    void testGetTodosWrongPageSize() {
        List<TodoModel> todos = todoService.getTodos(0, -1, "", "", "", "", "");
        assert(todos == null);
    }

    @Test
    void testGetTodosWrongSortBy() {
        List<TodoModel> todos = todoService.getTodos(0, 10, wrongField, "", "", "", "");
        assert(todos == null);
    }

    @Test
    void testGetTodosWrongSortOrder() {
        List<TodoModel> todos = todoService.getTodos(0, 10, "", wrongField, "", "", "");
        assert(todos == null);
    }

    @Test
    void testGetTodosWrongDone() {
        List<TodoModel> todos = todoService.getTodos(0, 10, "", "", wrongField, "", "");
        assert(todos == null);
    }

    @Test
    void testGetTodosWrongText() {
        List<TodoModel> todos = todoService.getTodos(0, 10, "", "", "", null, "");
        assert(todos == null);
    }

    @Test
    void testGetTodosWrongPriority() {
        List<TodoModel> todos = todoService.getTodos(0, 10, "", "", "", "", wrongField);
        assert(todos == null);
    }
}
