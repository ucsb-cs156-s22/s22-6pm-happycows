package edu.ucsb.cs156.happiercows.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

import static org.awaitility.Awaitility.await;

import static java.util.concurrent.TimeUnit.SECONDS;

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
import edu.ucsb.cs156.happiercows.entities.User;
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
    Job job2 = Job.builder().log("this is job 2").build();

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

    User user = currentUserService.getUser();

    Job jobStarted = Job.builder()
        .id(0L)
        .createdBy(user)
        .createdAt(null)
        .updatedAt(null)
        .status("running")
        .log("Hello World! from test job!")
        .build();

    Job jobCompleted = Job.builder()
        .id(0L)
        .createdBy(user)
        .createdAt(null)
        .updatedAt(null)
        .status("complete")
        .log("Hello World! from test job!\nGoodbye from test job!")
        .build();

    when(jobsRepository.save(any(Job.class))).thenReturn(jobStarted).thenReturn(jobCompleted);

    // act
    MvcResult response = mockMvc.perform(get("/api/jobs/launch/testjob?fail=false&sleepMs=2000"))
        .andExpect(status().isOk()).andReturn();

    // assert
    String responseString = response.getResponse().getContentAsString();
    Job jobReturned = objectMapper.readValue(responseString, Job.class);

    assertEquals("running", jobReturned.getStatus());

    await().atMost(1, SECONDS)
        .untilAsserted(() -> verify(jobsRepository, times(2)).save(eq(jobStarted)));
    await().atMost(10, SECONDS)
        .untilAsserted(() -> verify(jobsRepository, times(4)).save(eq(jobCompleted)));
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void admin_can_launch_test_job_that_fails() throws Exception {

    // arrange

    User user = currentUserService.getUser();

    Job jobStarted = Job.builder()
        .id(0L)
        .createdBy(user)
        .createdAt(null)
        .updatedAt(null)
        .status("running")
        .log("Hello World! from test job!")
        .build();

    Job jobFailed = Job.builder()
        .id(0L)
        .createdBy(user)
        .createdAt(null)
        .updatedAt(null)
        .status("error")
        .log("Hello World! from test job!\nFail!")
        .build();

    when(jobsRepository.save(any(Job.class))).thenReturn(jobStarted).thenReturn(jobFailed);

    // act
    MvcResult response = mockMvc.perform(get("/api/jobs/launch/testjob?fail=true&sleepMs=4000"))
        .andExpect(status().isOk()).andReturn();

    String responseString = response.getResponse().getContentAsString();
    Job jobReturned = objectMapper.readValue(responseString, Job.class);

    assertEquals("running", jobReturned.getStatus());

    await().atMost(1, SECONDS)
        .untilAsserted(() -> verify(jobsRepository, times(2)).save(eq(jobStarted)));

    await().atMost(10, SECONDS)
        .untilAsserted(() -> verify(jobsRepository, times(3)).save(eq(jobFailed)));
  }
}