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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
  public void createCommonsTest() throws Exception {
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

  @WithMockUser(roles = { "USER" })
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
}
