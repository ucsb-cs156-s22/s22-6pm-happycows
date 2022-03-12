package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.ControllerTestCase;
import edu.ucsb.cs156.happiercows.repositories.ProfitRepository;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.entities.Profit;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
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

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.parameters.P;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.beans.factory.annotation.Autowired;
import edu.ucsb.cs156.happiercows.testconfig.TestConfig;

@WebMvcTest(controllers = ProfitsController.class)
@Import(ProfitsController.class)
public class ProfitsControllerTests extends ControllerTestCase {
  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  ProfitRepository profitRepository;

  @MockBean
  UserCommonsRepository userCommonsRepository;

  @MockBean
  UserRepository userRepository;

  @MockBean
  CommonsRepository commonsRepository;

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_profits_admin() throws Exception {

    List<Profit> testProfits = new ArrayList<Profit>();

    UserCommons uc1 = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    UserCommons uc2 = UserCommons.builder().id(1).commonsId(2).userId(2).build();

    Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(uc1).build();
    Profit p2 = Profit.builder().id(43).profit(200).timestamp(12).userCommons(uc1).build();
    Profit p3 = Profit.builder().id(44).profit(300).timestamp(12).userCommons(uc2).build();

    testProfits.add(p1);
    testProfits.add(p2);
    testProfits.add(p3);
    when(profitRepository.findAll()).thenReturn(testProfits);

    MvcResult response = mockMvc.perform(get("/api/profits/admin/all")).andExpect(status().isOk()).andReturn();
    
    verify(profitRepository, times(1)).findAll();
    
    String responseString = response.getResponse().getContentAsString();
    List<Profit> actualProfits = objectMapper.readValue(responseString, new TypeReference<List<Profit>>() {});
    assertEquals(actualProfits, testProfits);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_profits_admin2() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Profit expectedProfit = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();
    when(profitRepository.findById(42L)).thenReturn(Optional.of(expectedProfit));

    MvcResult response = mockMvc.perform(get("/api/profits/admin?id=42")).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findById(42L);

    String responseString = response.getResponse().getContentAsString();
    Profit actualProfit = objectMapper.readValue(responseString, Profit.class);
    assertEquals(actualProfit, expectedProfit);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void get_profits() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Profit expectedProfit = Profit.builder().id(36L).profit(100).timestamp(12).userCommons(expectedUserCommons).build();
    when(profitRepository.findById(36L)).thenReturn(Optional.of(expectedProfit));

    MvcResult response = mockMvc.perform(get("/api/profits?id=36")).andExpect(status().isOk()).andReturn();
    verify(profitRepository, times(1)).findById(36L);

    String responseString = response.getResponse().getContentAsString();
    Profit actualProfit = objectMapper.readValue(responseString, Profit.class);
    assertEquals(actualProfit, expectedProfit);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void get_profits_user() throws Exception {

    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Profit expectedProfit = Profit.builder().id(36L).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    when(profitRepository.findById(36L)).thenReturn(Optional.of(expectedProfit));

    MvcResult response = mockMvc.perform(get("/api/profits?id=36")).andExpect(status().isNotFound()).andReturn();

    verify(profitRepository, times(1)).findById(36L);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Profit with id 36 not found", json.get("message"));
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void get_profits_not_found() throws Exception {
    MvcResult response = mockMvc.perform(get("/api/profits?id=36")).andExpect(status().isNotFound()).andReturn();

    verify(profitRepository, times(1)).findById(36L);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Profit with id 36 not found", json.get("message"));
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_profits_admin_user() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Profit expectedProfit = Profit.builder().id(36).profit(100).timestamp(12).userCommons(expectedUserCommons).build();
    when(profitRepository.findById(36L)).thenReturn(Optional.of(expectedProfit));

    MvcResult response = mockMvc.perform(get("/api/profits/admin?id=36")).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findById(36L);

    String responseString = response.getResponse().getContentAsString();
    Profit actualProfit = objectMapper.readValue(responseString, Profit.class);
    assertEquals(actualProfit, expectedProfit);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_profits_admin_not_found() throws Exception {
    MvcResult response = mockMvc.perform(get("/api/profits/admin?id=36")).andExpect(status().isNotFound()).andReturn();

    verify(profitRepository, times(1)).findById(36L);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Profit with id 36 not found", json.get("message"));
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void get_profits_all_commons() throws Exception {
    List<Profit> expectedProfits = new ArrayList<Profit>();
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    expectedProfits.add(p1);
    when(profitRepository.findAllByUserCommonsId(1L)).thenReturn(expectedProfits);
    when(userCommonsRepository.findById(1L)).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(get("/api/profits/all/commons?userCommonsId=1")).andDo(print()).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findAllByUserCommonsId(1L);

    String responseString = response.getResponse().getContentAsString();
    List<Profit> actualProfits = objectMapper.readValue(responseString, new TypeReference<List<Profit>>() {});
    assertEquals(actualProfits, expectedProfits);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void get_profits_all_commons_other_user() throws Exception {
    List<Profit> expectedProfits = new ArrayList<Profit>();
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(2).build();
    Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    when(profitRepository.findAllByUserCommonsId(1L)).thenReturn(expectedProfits);
    when(userCommonsRepository.findById(1L)).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(get("/api/profits/all/commons?userCommonsId=1").contentType("application/json")).andExpect(status().isNotFound()).andReturn();

    verify(userCommonsRepository, times(1)).findById(1L);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("UserCommons with id 1 not found", json.get("message"));
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void get_profits_all_commons_nonexistent() throws Exception {
    MvcResult response = mockMvc.perform(get("/api/profits/all/commons?userCommonsId=1").contentType("application/json")).andExpect(status().isNotFound()).andReturn();

    verify(userCommonsRepository, times(1)).findById(1L);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("UserCommons with id 1 not found", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_profits_admin_all_commons() throws Exception {
    List<Profit> expectedProfits = new ArrayList<Profit>();
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    expectedProfits.add(p1);
    when(profitRepository.findAllByUserCommonsId(1L)).thenReturn(expectedProfits);

    MvcResult response = mockMvc.perform(get("/api/profits/admin/all/commons?userCommonsId=1").contentType("application/json")).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findAllByUserCommonsId(1L);

    String responseString = response.getResponse().getContentAsString();
    List<Profit> actualProfits = objectMapper.readValue(responseString, new TypeReference<List<Profit>>() {});
    assertEquals(actualProfits, expectedProfits);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_profits_admin_all_commons_other_user() throws Exception {
    List<Profit> expectedProfits = new ArrayList<Profit>();
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(2).build();
    Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    expectedProfits.add(p1);
    when(profitRepository.findAllByUserCommonsId(1L)).thenReturn(expectedProfits);

    MvcResult response = mockMvc.perform(get("/api/profits/admin/all/commons?userCommonsId=1")).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findAllByUserCommonsId(1L);

    String responseString = response.getResponse().getContentAsString();
    List<Profit> actualProfits = objectMapper.readValue(responseString, new TypeReference<List<Profit>>() {});
    assertEquals(actualProfits, expectedProfits);
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void post_profits_admin_post() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Profit expectedProfit = Profit.builder().id(0).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    when(profitRepository.save(expectedProfit)).thenReturn(expectedProfit);
    when(userCommonsRepository.findById(1L)).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(post("/api/profits/admin/post?profit=100&timestamp=12&userCommonsId=1").with(csrf())).andDo(print()).andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findById(1L);
    verify(profitRepository, times(1)).save(expectedProfit);

    String expectedJson = mapper.writeValueAsString(expectedProfit);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void delete_profits_admin() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Profit p = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    when(profitRepository.findById(42L)).thenReturn(Optional.of(p));

    MvcResult response = mockMvc.perform(delete("/api/profits/admin?id=42").with(csrf())).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findById(42L);
    verify(profitRepository, times(1)).delete(p);

    Map<String, Object> json = responseToJson(response);
    assertEquals("Profit with id 42 deleted", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void delete_profits_admin_other_user() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Profit p = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    when(profitRepository.findById(42L)).thenReturn(Optional.of(p));

    MvcResult response = mockMvc.perform(delete("/api/profits/admin?id=42").with(csrf())).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findById(42L);
    verify(profitRepository, times(1)).delete(p);

    Map<String, Object> json = responseToJson(response);
    assertEquals("Profit with id 42 deleted", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void put_profits_admin() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Profit p = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    String requestBody = mapper.writeValueAsString(p);
    String expectedReturn = mapper.writeValueAsString(p);

    when(profitRepository.findById(42L)).thenReturn(Optional.of(p));

    MvcResult response = mockMvc.perform(put("/api/profits/admin?id=42").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody).with(csrf())).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findById(42L);
    verify(profitRepository, times(1)).save(p);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedReturn, responseString);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void put_profits_admin_other_user() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Profit p = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

    String requestBody = mapper.writeValueAsString(p);
    String expectedReturn = mapper.writeValueAsString(p);

    when(profitRepository.findById(42L)).thenReturn(Optional.of(p));

    MvcResult response = mockMvc.perform(put("/api/profits/admin?id=42").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody).with(csrf())).andExpect(status().isOk()).andReturn();

    verify(profitRepository, times(1)).findById(42L);
    verify(profitRepository, times(1)).save(p);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedReturn, responseString);
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void put_profits_admin_not_found() throws Exception {
    UserCommons expectedUC = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Profit profit = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUC).build();

    String requestBody = mapper.writeValueAsString(profit);

    MvcResult response = mockMvc.perform(put("/api/profits/admin?id=42").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody).with(csrf())).andExpect(status().isNotFound()).andReturn();

    verify(profitRepository, times(1)).findById(42L);
    verify(profitRepository, times(0)).save(profit);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Profit with id 42 not found", json.get("message"));
  }

  


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void delete_profits_admin_not_found() throws Exception {
    MvcResult response = mockMvc.perform(delete("/api/profits/admin?id=42").with(csrf())).andExpect(status().isNotFound()).andReturn();

    verify(profitRepository, times(1)).findById(42L);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Profit with id 42 not found", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void post_profits_admin_post_not_found() throws Exception {
    MvcResult response = mockMvc.perform(post("/api/profits/admin/post?profit=100&timestamp=12&userCommonsId=1").with(csrf())).andDo(print()).andExpect(status().isNotFound()).andReturn();

    verify(userCommonsRepository, times(1)).findById(1L);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("UserCommons with id 1 not found", json.get("message"));
  }
}

