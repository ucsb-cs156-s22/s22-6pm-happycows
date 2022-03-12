package edu.ucsb.cs156.happiercows.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import edu.ucsb.cs156.happiercows.ControllerTestCase;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.models.CreateCommonsParams;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;

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

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void createCommonsTest() throws Exception
  {
    LocalDateTime someTime = LocalDateTime.parse("2022-03-05T15:50:10");

    Commons commons = Commons.builder()
      .name("Jackson's Commons")
      .cowPrice(500.99)
      .milkPrice(8.99)
      .startingBalance(1020.10)
      .startingDate(someTime)
      .build();

    CreateCommonsParams parameters = CreateCommonsParams.builder()
      .name("Jackson's Commons")
      .cowPrice(500.99)
      .milkPrice(8.99)
      .startingBalance(1020.10)
      .startingDate(someTime)
      .build();

    String requestBody = objectMapper.writeValueAsString(parameters);
    String expectedResponse = objectMapper.writeValueAsString(commons);

    when(commonsRepository.save(commons))
      .thenReturn(commons);

    MvcResult response = mockMvc
      .perform(post("/api/commons/new").with(csrf())
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(requestBody))
      .andExpect(status().isOk())
      .andReturn();

    verify(commonsRepository, times(1)).save(commons);

    String actualResponse = response.getResponse().getContentAsString();
    assertEquals(expectedResponse, actualResponse);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void getCommonsTest() throws Exception {
    List<Commons> expectedCommons = new ArrayList<Commons>();
    Commons Commons1 = Commons.builder().name("TestCommons1").build();

    expectedCommons.add(Commons1);
    when(commonsRepository.findAll()).thenReturn(expectedCommons);
    MvcResult response = mockMvc.perform(get("/api/commons/all").contentType("application/json"))
        .andExpect(status().isOk()).andReturn();

    verify(commonsRepository, times(1)).findAll();

    String responseString = response.getResponse().getContentAsString();
    List<Commons> actualCommons = objectMapper.readValue(responseString, new TypeReference<List<Commons>>() {
    });
    assertEquals(actualCommons, expectedCommons);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void updateCommonsTest() throws Exception
  {
    LocalDateTime someTime = LocalDateTime.parse("2022-03-05T15:50:10");

    CreateCommonsParams parameters = CreateCommonsParams.builder()
      .name("Jackson's Commons")
      .cowPrice(500.99)
      .milkPrice(8.99)
      .startingBalance(1020.10)
      .startingDate(someTime)
      .build();

    Commons commons = Commons.builder()
      .name("Jackson's Commons")
      .cowPrice(500.99)
      .milkPrice(8.99)
      .startingBalance(1020.10)
      .startingDate(someTime)
      .build();

    String requestBody = objectMapper.writeValueAsString(parameters);

    when(commonsRepository.save(commons))
      .thenReturn(commons);

    mockMvc
      .perform(put("/api/commons/update?id=0").with(csrf())
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(requestBody))
      .andExpect(status().isCreated());

    verify(commonsRepository, times(1)).save(commons);

    parameters.setMilkPrice(parameters.getMilkPrice() + 3.00);
    commons.setMilkPrice(parameters.getMilkPrice());

    requestBody = objectMapper.writeValueAsString(parameters);

    when(commonsRepository.findById(0L))
      .thenReturn(Optional.of(commons));

    when(commonsRepository.save(commons))
      .thenReturn(commons);

    mockMvc
      .perform(put("/api/commons/update?id=0").with(csrf())
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(requestBody))
      .andExpect(status().isNoContent());

    verify(commonsRepository, times(1)).save(commons);
  }

  //This common SHOULD be in the repository
  @WithMockUser(roles = { "USER" })
  @Test
  public void getCommonsByIdTest_valid() throws Exception {
    Commons Commons1 = Commons.builder()
      .name("TestCommons2")
      .id(18L)
      .build();

    when(commonsRepository.findById(eq(18L))).thenReturn(Optional.of(Commons1));

    MvcResult response = mockMvc.perform(get("/api/commons?id=18"))
        .andExpect(status().isOk()).andReturn();

    verify(commonsRepository, times(1)).findById(eq(18L));
    String expectedJson = mapper.writeValueAsString(Commons1);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }

  //This common SHOULD NOT be in the repository
  @WithMockUser(roles = { "USER" })
  @Test
  public void getCommonsByIdTest_invalid() throws Exception {

    when(commonsRepository.findById(eq(18L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc.perform(get("/api/commons?id=18"))
        .andExpect(status().is(404)).andReturn();

    verify(commonsRepository, times(1)).findById(eq(18L));

    Map<String, Object> responseMap = responseToJson(response);

    assertEquals(responseMap.get("message"), "Commons with id 18 not found");
    assertEquals(responseMap.get("type"), "EntityNotFoundException");
  }

  @WithMockUser(roles = { "USER"})
  @Test
  public void joinCommonsTest() throws Exception {

    Commons c = Commons.builder()
      .id(2L)
      .name("Example Commons")
      .build();

    UserCommons uc = UserCommons.builder()
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    UserCommons ucSaved = UserCommons.builder()
        .id(17L)
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    String requestBody = mapper.writeValueAsString(uc);

    when(userCommonsRepository.findByCommonsIdAndUserId(anyLong(),anyLong())).thenReturn(Optional.empty());
    when(userCommonsRepository.save(eq(uc))).thenReturn(ucSaved);
    when(commonsRepository.findById(eq(2L))).thenReturn(Optional.of(c));

    MvcResult response = mockMvc
        .perform(post("/api/commons/join?commonsId=2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(2L, 1L);
    verify(userCommonsRepository, times(1)).save(uc);

    String responseString = response.getResponse().getContentAsString();
    String cAsJson = mapper.writeValueAsString(c);

    assertEquals(responseString, cAsJson);
  }

  @WithMockUser(roles = { "USER"})
  @Test
  public void already_joined_common_test() throws Exception {

    Commons c = Commons.builder()
      .id(2L)
      .name("Example Commons")
      .build();

    UserCommons uc = UserCommons.builder()
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    String requestBody = mapper.writeValueAsString(uc);

    //Instead of returning empty, we instead say that it already exists. We shouldn't create a new entry.
    when(userCommonsRepository.findByCommonsIdAndUserId(2L,1L)).thenReturn(Optional.of(uc));
    when(userCommonsRepository.save(eq(uc))).thenReturn(uc);

    when(commonsRepository.findById(eq(2L))).thenReturn(Optional.of(c));

    MvcResult response = mockMvc
        .perform(post("/api/commons/join?commonsId=2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(2L, 1L);

    String responseString = response.getResponse().getContentAsString();
    String cAsJson = mapper.writeValueAsString(c);

    assertEquals(responseString, cAsJson);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void user_commons_exists_but_commons_doesnt_test() throws Exception {
    UserCommons uc = UserCommons.builder()
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    String requestBody = mapper.writeValueAsString(uc);

    //UserCommons exists, but somehow the commons it was linked to has been deleted.
    when(userCommonsRepository.findByCommonsIdAndUserId(2L,1L)).thenReturn(Optional.of(uc));
    when(userCommonsRepository.save(eq(uc))).thenReturn(uc);

    when(commonsRepository.findById(eq(2L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc
        .perform(post("/api/commons/join?commonsId=2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody))
        .andExpect(status().is(404)).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(2L, 1L);

    Map<String, Object> responseMap = responseToJson(response);

    assertEquals(responseMap.get("message"), "Commons with id 2 not found");
    assertEquals(responseMap.get("type"), "EntityNotFoundException");
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void join_and_create_userCommons_for_nonexistent_commons() throws Exception {
    UserCommons uc = UserCommons.builder()
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    UserCommons ucSaved = UserCommons.builder()
        .id(17L)
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    String requestBody = mapper.writeValueAsString(uc);

    when(userCommonsRepository.findByCommonsIdAndUserId(2L,1L)).thenReturn(Optional.empty());
    when(userCommonsRepository.save(eq(uc))).thenReturn(ucSaved);
    when(commonsRepository.findById(eq(2L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc
        .perform(post("/api/commons/join?commonsId=2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody))
        .andExpect(status().is(404)).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(2L, 1L);
    verify(userCommonsRepository, times(1)).save(uc);

    Map<String, Object> responseMap = responseToJson(response);

    assertEquals(responseMap.get("message"), "Commons with id 2 not found");
    assertEquals(responseMap.get("type"), "EntityNotFoundException");
  }

    @WithMockUser(roles = { "ADMIN" })
  @Test
  public void deleteCommons_test_admin_exists() throws Exception {
      LocalDateTime someTime = LocalDateTime.parse("2022-03-05T15:50:10");
      Commons c = Commons.builder()
        .name("Jackson's Commons")
        .cowPrice(500.99)
        .milkPrice(8.99)
        .startingBalance(1020.10)
        .startingDate(someTime)
        .build();
      
      when(commonsRepository.findById(eq(2L))).thenReturn(Optional.of(c));
      doNothing().when(commonsRepository).deleteById(2L);
      
      MvcResult response = mockMvc.perform(
              delete("/api/commons?id=2")
                      .with(csrf()))
              .andExpect(status().is(200)).andReturn();
      
      verify(commonsRepository, times(1)).findById(2L);
      verify(commonsRepository, times(1)).deleteById(2L);
      
      String responseString = response.getResponse().getContentAsString();
      
      String expectedString = "{\"message\":\"commons with id 2 deleted\"}"; 

      assertEquals(expectedString, responseString);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void deleteCommons_test_admin_nonexists() throws Exception {
      
      when(commonsRepository.findById(eq(2L))).thenReturn(Optional.empty());
      
      MvcResult response = mockMvc.perform(
              delete("/api/commons?id=2")
                      .with(csrf()))
              .andExpect(status().is(404)).andReturn();
      
      verify(commonsRepository, times(1)).findById(2L);
      

      String responseString = response.getResponse().getContentAsString();
      
      String expectedString = "{\"message\":\"Commons with id 2 not found\",\"type\":\"EntityNotFoundException\"}";
      
      Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
      Map<String, Object> jsonResponse = responseToJson(response);
      assertEquals(expectedJson, jsonResponse);
  }
  
  
  @WithMockUser(roles = {"ADMIN"})
  @Test
  public void deleteUserFromCommonsTest() throws Exception {
    UserCommons uc = UserCommons.builder()
        .id(16L)
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    String requestBody = mapper.writeValueAsString(uc);

    when(userCommonsRepository.findByCommonsIdAndUserId(2L,1L)).thenReturn(Optional.of(uc));

    MvcResult response = mockMvc
        .perform(delete("/api/commons/2/users/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody))
        .andExpect(status().is(204)).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(2L, 1L);
    verify(userCommonsRepository, times(1)).deleteById(16L);

    String responseString = response.getResponse().getContentAsString();

    assertEquals(responseString, "");
  }

  @WithMockUser(roles = {"ADMIN"})
  @Test
  public void deleteUserFromCommonsTest_nonexistent_userCommons() throws Exception {
    UserCommons uc = UserCommons.builder()
        .id(16L)
        .userId(1L)
        .commonsId(2L)
        .totalWealth(0)
        .build();

    String requestBody = mapper.writeValueAsString(uc);

    when(userCommonsRepository.findByCommonsIdAndUserId(2L,1L)).thenReturn(Optional.empty());

    MvcResult response;
    try{
      response = mockMvc
        .perform(delete("/api/commons/2/users/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody))
        .andExpect(status().is(204)).andReturn();

    //The way this works is very interesting. The error message is sent as the value of a nested exception.
    }catch(Exception e){
      assertEquals(e.toString(),
      "org.springframework.web.util.NestedServletException: Request processing failed; nested exception is java.lang.Exception: UserCommons with commonsId=2 and userId=1 not found.");
    }
  }
}
