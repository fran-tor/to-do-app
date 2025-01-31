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
    void testGetTodosWrongSortField() {
        List<TodoModel> todos = todoService.getTodos(0, 10, wrongField, "", "", "text", "");
        assert(todos == null);
    }
}
