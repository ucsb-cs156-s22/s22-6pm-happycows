package edu.ucsb.cs156.happiercows.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.ucsb.cs156.happiercows.ControllerTestCase;
import edu.ucsb.cs156.happiercows.entities.jobs.Job;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.repositories.jobs.JobsRepository;
import edu.ucsb.cs156.happiercows.services.jobs.JobService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@WebMvcTest(controllers = JobsController.class)
@Import(JobService.class)
@AutoConfigureDataJpa
public class JobsControllerTests extends ControllerTestCase {

  @MockBean
  JobsRepository jobsRepository;

  @MockBean
  UserRepository userRepository;

  @Autowired
  JobService jobService;

  @Autowired
  ObjectMapper objectMapper;

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void admin_can_get_all_jobs() throws Exception {

    // arrange

    Job job1 = Job.builder().log("this is job 1").build();
    Job job2 = Job.builder().log("this is job 1").build();

    ArrayList<Job> expectedJobs = new ArrayList<>();
    expectedJobs.addAll(Arrays.asList(job1, job2));

    when(jobsRepository.findAll()).thenReturn(expectedJobs);

    // act
    MvcResult response = mockMvc.perform(get("/api/jobs/all"))
        .andExpect(status().isOk()).andReturn();

    // // assert

    verify(jobsRepository, times(1)).findAll();
    String expectedJson = mapper.writeValueAsString(expectedJobs);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void admin_can_launch_test_job() throws Exception {

    // arrange

    Job expectedJob = Job.builder()
        .id(0L)
        .createdAt(null)
        .updatedAt(null)
        .status("complete")
        .log("Hello World! from test job")
        .build();

    String expectedJSON = mapper.writeValueAsString(expectedJob);

    // act
    MvcResult response = mockMvc.perform(get("/api/jobs/launch/testjob"))
        .andExpect(status().isOk()).andReturn();

    // // assert
    String responseString = response.getResponse().getContentAsString();
    log.info("responseString={}", responseString);
    assertEquals(expectedJSON, responseString);

  }
}