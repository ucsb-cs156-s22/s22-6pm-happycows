package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.ControllerTestCase;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.errors.EntityNotFoundException;

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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = UserCommonsController.class)
public class UserCommonsControllerTests extends ControllerTestCase {

  @MockBean
  UserCommonsRepository userCommonsRepository;

  @MockBean
  UserRepository userRepository;

  @MockBean
  CommonsRepository commonsRepository;

  @Autowired
  private ObjectMapper objectMapper;

  public static UserCommons dummyUserCommons(long id) {
    UserCommons userCommons = new UserCommons(id,1,1,1);
    return userCommons;
  }
  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void test_getUserCommonsById_exists_admin() throws Exception {
  
    UserCommons expectedUserCommons = dummyUserCommons(1);
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/?userId=1&commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));

    String expectedJson = mapper.writeValueAsString(expectedUserCommons);
    String responseString = response.getResponse().getContentAsString();

    assertEquals(expectedJson, responseString);
  }
  
  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void test_getUserCommonsById_nonexists_admin() throws Exception {
  
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc.perform(get("/api/usercommons/?userId=1&commonsId=1"))
        .andExpect(status().is(404)).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));
    
    String responseString = response.getResponse().getContentAsString();
    String expectedString = "{\"message\":\"UserCommons with commonsId 1 and userId 1 not found\",\"type\":\"EntityNotFoundException\"}";

    Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
    Map<String, Object> jsonResponse = responseToJson(response);
    assertEquals(expectedJson, jsonResponse);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void test_getUserCommonsById_exists() throws Exception {
  
    UserCommons expectedUserCommons = dummyUserCommons(1);
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/forcurrentuser?commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));

    String expectedJson = mapper.writeValueAsString(expectedUserCommons);
    String responseString = response.getResponse().getContentAsString();

    assertEquals(expectedJson, responseString);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_getUserCommonsById_nonexists() throws Exception {
  
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc.perform(get("/api/usercommons/forcurrentuser?commonsId=1"))
        .andExpect(status().is(404)).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));
    
    String responseString = response.getResponse().getContentAsString();
    String expectedString = "{\"message\":\"UserCommons with commonsId 1 and userId 1 not found\",\"type\":\"EntityNotFoundException\"}";
    Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
    Map<String, Object> jsonResponse = responseToJson(response);
    assertEquals(expectedJson, jsonResponse);
  }
}
