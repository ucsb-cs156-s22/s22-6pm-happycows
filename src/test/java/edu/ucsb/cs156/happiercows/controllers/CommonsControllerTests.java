package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.ControllerTestCase;
import edu.ucsb.cs156.happiercows.controllers.CommonsController;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.services.CurrentUserService;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebMvcTest(controllers = CommonsController.class)
public class CommonsControllerTests extends ControllerTestCase {

  @MockBean
  UserCommonsRepository userCommonsRepository;

  @MockBean
  UserRepository userRepository;

  @MockBean
  CommonsRepository commonsRepository;

  @Autowired
    private ObjectMapper objectMapper;

  @WithMockUser(roles={"ADMIN"})
  @Test
  public void createCommonsTest() throws Exception {
    Commons expectedCommons = Commons.builder().name("TestCommons").build();
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedCommons);
    when(commonsRepository.save(any())).thenReturn(expectedCommons);

    MvcResult response = mockMvc
    .perform(post("/api/commons/new?name=TestCommons").with(csrf()).contentType(MediaType.APPLICATION_JSON)
    .characterEncoding("utf-8").content(requestBody))
    .andExpect(status().isOk()).andReturn();

    verify(commonsRepository, times(1)).save(expectedCommons);

    String responseString = response.getResponse().getContentAsString();
    Commons actualCommons = objectMapper.readValue(responseString, Commons.class);
    assertEquals(actualCommons, expectedCommons);
  }

  @WithMockUser(roles={"USER"})
  @Test
  public void getCommonsTest() throws Exception {
    List<Commons> expectedCommons = new ArrayList<Commons>();
    Commons Commons1 = Commons.builder().name("TestCommons1").build();

    expectedCommons.add(Commons1);
    when(commonsRepository.findAll()).thenReturn(expectedCommons);
    MvcResult response = mockMvc.perform(get("/api/commons").contentType("application/json"))
    .andExpect(status().isOk()).andReturn();

    verify(commonsRepository, times(1)).findAll();

    String responseString = response.getResponse().getContentAsString();
    List<Commons> actualCommons = objectMapper.readValue(responseString, new TypeReference<List<Commons>>() {
    });
    assertEquals(actualCommons, expectedCommons);
  }

  @WithMockUser(roles={"USER"})
  @Test
  public void joinCommonsTest() throws Exception {
    User u = currentUserService.getCurrentUser().getUser();
    Commons commons = Commons.builder().name("TestCommons").id(1).users(new ArrayList<>()).build();
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(commons);
    when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(commons));
    when(commonsRepository.save(eq(commons))).thenReturn(commons);

    MvcResult response = mockMvc
    .perform(post("/api/commons/join/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
    .characterEncoding("utf-8").content(requestBody))
    .andExpect(status().isOk()).andReturn();

    verify(commonsRepository, times(1)).save(commons);
    assertTrue(commons.getUsers().contains(u));
  }

  
}
