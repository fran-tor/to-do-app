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

    TodoModel getTodo() {
        TodoModel todo = new TodoModel();
        todo.setId(1L);
        todo.setText("Test");
        todo.setDueDate("2025-01-31");
        todo.setDone(true);
        todo.setDoneDate("2025-01-31T03:30:31.631Z");
        todo.setPriority("Low");
        todo.setCreationDate("2025-01-31T03:27:04.275Z");
        return todo;
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

    @Test
    void testAddTodo() {
        TodoModel todo = getTodo();
        assert(todoService.addTodo(todo));
    }

    @Test
    void testAddTodoWrongID() {
        TodoModel todo = getTodo();
        todo.setId(-1L);
        assert(!todoService.addTodo(todo));
    }

    @Test
    void testAddTodoWrongText() {
        TodoModel todo = getTodo();
        todo.setText(null);
        assert(!todoService.addTodo(todo));
    }

    @Test
    void testAddTodoWrongDueDate() {
        TodoModel todo = getTodo();
        todo.setDueDate(wrongField);
        assert(!todoService.addTodo(todo));
    }

    @Test
    void testAddTodoWrongDoneDate() {
        TodoModel todo = getTodo();
        todo.setDoneDate(wrongField);
        assert(!todoService.addTodo(todo));
    }

    @Test
    void testAddTodoWrongPriority() {
        TodoModel todo = getTodo();
        todo.setPriority(wrongField);
        assert(!todoService.addTodo(todo));
    }
}
