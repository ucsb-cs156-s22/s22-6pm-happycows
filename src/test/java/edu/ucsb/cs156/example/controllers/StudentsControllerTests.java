package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.collections.StudentCollection;
import edu.ucsb.cs156.example.documents.Student;
import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.TodoRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = StudentsController.class)
@Import(TestConfig.class)
public class StudentsControllerTests extends ControllerTestCase {

        @MockBean
        StudentCollection studentCollection;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/students/all

        @Test
        public void api_students_all__logged_out__returns_403() throws Exception {
                mockMvc.perform(get("/api/students/all"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void api_students_all__user_logged_in__returns_ok() throws Exception {
                mockMvc.perform(get("/api/students/all"))
                                .andExpect(status().isOk());
        }

        // Authorization tests for /api/students/post

        @Test
        public void api_students_post__logged_out__returns_403() throws Exception {
                mockMvc.perform(post("/api/students/post"))
                                .andExpect(status().is(403));
        }

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void api_students_all__user_logged_in__returns_a_student_that_exists() throws Exception {

                // arrange

                Student s = Student.builder().perm(1234567).firstName("Chris").lastName("Gaucho").id("7").build();
                ArrayList<Student> students = new ArrayList<>();
                when(studentCollection.findAll()).thenReturn(students);

                // act
                MvcResult response = mockMvc.perform(get("/api/students/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(studentCollection, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(students);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void api_students_post__user_logged_in__creates_a_student() throws Exception {

                Student expectedStudent = Student.builder()
                                .perm(1234567)
                                .firstName("Chris")
                                .lastName("Gaucho")
                                .build();

                when(studentCollection.save(eq(expectedStudent))).thenReturn(expectedStudent);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/students/post?perm=1234567&firstName=Chris&lastName=Gaucho")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(studentCollection, times(1)).save(expectedStudent);
                String expectedJson = mapper.writeValueAsString(expectedStudent);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);

        }

}
