package edu.ucsb.cs156.happiercows.controllers;

import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.models.CreateCommonsParams;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Api(description = "Commons")
@RequestMapping("/api/commons")
@RestController
public class CommonsController extends ApiController {

  @Autowired
  private CommonsRepository commonsRepository;

  @Autowired
  private UserCommonsRepository userCommonsRepository;

  @Autowired
  ObjectMapper mapper;

  @ApiOperation(value = "Get a list of all commons")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("")
  public ResponseEntity<String> getCommons() throws JsonProcessingException {
    log.info("getCommons()...");
    Iterable<Commons> users = commonsRepository.findAll();
    String body = mapper.writeValueAsString(users);
    return ResponseEntity.ok().body(body);
  }

  @ApiOperation(value = "Create a new commons")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping(value = "/new", produces = "application/json")
  public ResponseEntity<String> createCommons(@ApiParam("name of commons") @RequestBody CreateCommonsParams params)
      throws JsonProcessingException {
    log.info("name={}", params.getName());
    Commons c = Commons.builder().name(params.getName()).build();
    Commons savedCommons = commonsRepository.save(c);
    String body = mapper.writeValueAsString(savedCommons);
    log.info("body={}", body);
    return ResponseEntity.ok().body(body);
  }

  @ApiOperation(value = "Join a common")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PostMapping(value = "/join/{commonsId}", produces = "application/json")
  public ResponseEntity<String> joinCommon(@PathVariable("commonsId") Long commonsId) throws Exception {
    Optional<Commons> c = commonsRepository.findById(commonsId);
    if (c.isEmpty()) {
      throw new Exception("Commons not found.");
    }
    User u = getCurrentUser().getUser();
    c.get().getUsers().add(u);
    Commons savedCommons = commonsRepository.save(c.get());
    String body = mapper.writeValueAsString(savedCommons);
    return ResponseEntity.ok().body(body);
  }

  @ApiOperation("Delete a user from a commons")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/{commonsId}/users/{userId}")
  public ResponseEntity<Commons> deleteUserFromCommon(@PathVariable("commonsId") Long commonsId,
      @PathVariable("userId") Long userId) throws Exception {

    Optional<UserCommons> uc = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId);
    UserCommons userCommons = uc.orElseThrow(() -> new Exception(
        String.format("UserCommons with commonsId=%d and userId=%d not found.", commonsId, userId)));

    userCommonsRepository.deleteById(userCommons.getId());
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}