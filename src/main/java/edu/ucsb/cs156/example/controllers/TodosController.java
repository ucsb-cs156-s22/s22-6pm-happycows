package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.repositories.TodoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@Api(description = "Todos")
@RequestMapping("/api/todos")
@RestController
@Slf4j
public class TodosController extends ApiController {

    /**
     * This inner class helps us factor out some code for checking
     * whether todos exist, and whether they belong to the current user,
     * along with the error messages pertaining to those situations. It
     * bundles together the state needed for those checks.
     */
    public class TodoOrError {
        Long id;
        Todo todo;
        ResponseEntity<String> error;

        public TodoOrError(Long id) {
            this.id = id;
        }
    }

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "List all todos")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all")
    public Iterable<Todo> allUsersTodos() {
        Iterable<Todo> todos = todoRepository.findAll();
        return todos;
    }

    @ApiOperation(value = "List this user's todos")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Todo> thisUsersTodos() {
        CurrentUser currentUser = getCurrentUser();
        Iterable<Todo> todos = todoRepository.findAllByUserId(currentUser.getUser().getId());
        return todos;
    }

    @ApiOperation(value = "Get a single todo (if it belongs to current user)")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public ResponseEntity<String> getTodoById(
            @ApiParam("id") @RequestParam Long id) throws JsonProcessingException {
        TodoOrError toe = new TodoOrError(id);

        toe = doesTodoExist(toe);
        if (toe.error != null) {
            return toe.error;
        }
        toe = doesTodoBelongToCurrentUser(toe);
        if (toe.error != null) {
            return toe.error;
        }
        String body = mapper.writeValueAsString(toe.todo);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Get a single todo (no matter who it belongs to, admin only)")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<String> getTodoById_admin(
            @ApiParam("id") @RequestParam Long id) throws JsonProcessingException {
        TodoOrError toe = new TodoOrError(id);

        toe = doesTodoExist(toe);
        if (toe.error != null) {
            return toe.error;
        }

        String body = mapper.writeValueAsString(toe.todo);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Create a new Todo")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public Todo postTodo(
            @ApiParam("title") @RequestParam String title,
            @ApiParam("details") @RequestParam String details,
            @ApiParam("done") @RequestParam Boolean done) {
        CurrentUser currentUser = getCurrentUser();
        log.info("currentUser={}", currentUser);

        Todo todo = new Todo();
        todo.setUser(currentUser.getUser());
        todo.setTitle(title);
        todo.setDetails(details);
        todo.setDone(done);
        Todo savedTodo = todoRepository.save(todo);
        return savedTodo;
    }

    @ApiOperation(value = "Delete a Todo owned by this user")
    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("")
    public ResponseEntity<String> deleteTodo(
            @ApiParam("id") @RequestParam Long id) {
        TodoOrError toe = new TodoOrError(id);

        toe = doesTodoExist(toe);
        if (toe.error != null) {
            return toe.error;
        }

        toe = doesTodoBelongToCurrentUser(toe);
        if (toe.error != null) {
            return toe.error;
        }
        todoRepository.deleteById(id);
        return ResponseEntity.ok().body(String.format("todo with id %d deleted", id));

    }

    @ApiOperation(value = "Delete another user's todo")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/admin")
    public ResponseEntity<String> deleteTodo_Admin(
            @ApiParam("id") @RequestParam Long id) {
        TodoOrError toe = new TodoOrError(id);

        toe = doesTodoExist(toe);
        if (toe.error != null) {
            return toe.error;
        }

        todoRepository.deleteById(id);

        return ResponseEntity.ok().body(String.format("todo with id %d deleted", id));

    }

    @ApiOperation(value = "Update a single todo (if it belongs to current user)")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("")
    public ResponseEntity<String> putTodoById(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid Todo incomingTodo) throws JsonProcessingException {
        CurrentUser currentUser = getCurrentUser();
        User user = currentUser.getUser();

        TodoOrError toe = new TodoOrError(id);

        toe = doesTodoExist(toe);
        if (toe.error != null) {
            return toe.error;
        }
        toe = doesTodoBelongToCurrentUser(toe);
        if (toe.error != null) {
            return toe.error;
        }

        incomingTodo.setUser(user);
        todoRepository.save(incomingTodo);

        String body = mapper.writeValueAsString(incomingTodo);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Update a single todo (regardless of ownership, admin only, can't change ownership)")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin")
    public ResponseEntity<String> putTodoById_admin(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid Todo incomingTodo) throws JsonProcessingException {
        TodoOrError toe = new TodoOrError(id);

        toe = doesTodoExist(toe);
        if (toe.error != null) {
            return toe.error;
        }

        Todo oldTodo = toe.todo;
        oldTodo.setTitle(incomingTodo.getTitle());
        oldTodo.setDetails(incomingTodo.getDetails());
        oldTodo.setDone(incomingTodo.isDone());
        // do not change the user; even the admin is not allowed to do that.
        // note that for objects with no concept of "owner", this doesn't apply.

        todoRepository.save(oldTodo);

        String body = mapper.writeValueAsString(oldTodo);
        return ResponseEntity.ok().body(body);
    }

    /**
     * Pre-conditions: toe.id is value to look up, toe.todo and toe.error are null
     *
     * Post-condition: if todo with id toe.id exists, toe.todo now refers to it, and
     * error is null.
     * Otherwise, todo with id toe.id does not exist, and error is a suitable return
     * value to
     * report this error condition.
     */
    public TodoOrError doesTodoExist(TodoOrError toe) {

        Optional<Todo> optionalTodo = todoRepository.findById(toe.id);

        if (optionalTodo.isEmpty()) {
            toe.error = ResponseEntity
                    .badRequest()
                    .body(String.format("todo with id %d not found", toe.id));
        } else {
            toe.todo = optionalTodo.get();
        }
        return toe;
    }

    /**
     * Pre-conditions: toe.todo is non-null and refers to the todo with id toe.id,
     * and toe.error is null
     *
     * Post-condition: if todo belongs to current user, then error is still null.
     * Otherwise error is a suitable
     * return value.
     */
    public TodoOrError doesTodoBelongToCurrentUser(TodoOrError toe) {
        CurrentUser currentUser = getCurrentUser();
        log.info("currentUser={}", currentUser);

        Long currentUserId = currentUser.getUser().getId();
        Long todoUserId = toe.todo.getUser().getId();
        log.info("currentUserId={} todoUserId={}", currentUserId, todoUserId);

        if (todoUserId != currentUserId) {
            toe.error = ResponseEntity
                    .badRequest()
                    .body(String.format("todo with id %d not found", toe.id));
        }
        return toe;
    }

}
