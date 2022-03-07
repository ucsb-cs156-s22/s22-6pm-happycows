package edu.ucsb.cs156.happiercows.controllers;

import java.time.LocalDateTime;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.errors.EntityNotFoundException;
import edu.ucsb.cs156.happiercows.models.CreateCommonsParams;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;

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
  @GetMapping("/all")
  public ResponseEntity<String> getCommons() throws JsonProcessingException {
    log.info("getCommons()...");
    Iterable<Commons> users = commonsRepository.findAll();
    String body = mapper.writeValueAsString(users);
    return ResponseEntity.ok().body(body);
  }

  @ApiOperation(value = "Get a specific commons")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("")
  public Commons getCommonsById(
      @ApiParam("id") @RequestParam Long id) throws JsonProcessingException {

    Commons commons = commonsRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(Commons.class, id));

    return commons;
  }

  @ApiOperation(value = "Create a new commons")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping(value = "/new", produces = "application/json")
  public ResponseEntity<String> createCommons(
    @ApiParam("request body") @RequestBody CreateCommonsParams params
    ) throws JsonProcessingException
  {
    log.info("name={}", params.getName());

    Commons commons = Commons.builder()
      .name(params.getName())
      .cowPrice(params.getCowPrice())
      .milkPrice(params.getMilkPrice())
      .startingBalance(params.getStartingBalance())
      .startingDate(params.getStartingDate())
      .build();

    Commons saved = commonsRepository.save(commons);
    String body = mapper.writeValueAsString(saved);

    log.info("body={}", body);

    return ResponseEntity.ok().body(body);
  }

  @ApiOperation(value = "Join a commons")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PostMapping(value = "/join", produces = "application/json")
  public ResponseEntity<String> joinCommon(
      @ApiParam("commonsId") @RequestParam Long commonsId) throws Exception {

    User u = getCurrentUser().getUser();
    Long userId = u.getId();

    Optional<UserCommons> userCommonsLookup = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId);

    if (userCommonsLookup.isPresent()) {
      // user is already a member of this commons
      Commons joinedCommons = commonsRepository.findById(commonsId).orElseThrow( ()->new EntityNotFoundException(Commons.class, commonsId));
      String body = mapper.writeValueAsString(joinedCommons);
      return ResponseEntity.ok().body(body);
    }

    UserCommons uc = UserCommons.builder()
        .commonsId(commonsId)
        .userId(userId)
        .totalWealth(0)
        .build();

    userCommonsRepository.save(uc);

    Commons joinedCommons = commonsRepository.findById(commonsId).orElseThrow( ()->new EntityNotFoundException(Commons.class, commonsId));
    String body = mapper.writeValueAsString(joinedCommons);
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
