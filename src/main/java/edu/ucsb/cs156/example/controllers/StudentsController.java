package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.collections.StudentCollection;
import edu.ucsb.cs156.example.documents.Student;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Api(description = "Students")
@RequestMapping("/api/students")
@RestController
@Slf4j
public class StudentsController extends ApiController {

    @Autowired
    StudentCollection studentCollection;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "List all students")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Student> allStudents() {
        Iterable<Student> students = studentCollection.findAll();
        return students;
    }

    @ApiOperation(value = "Add a Student to the collection")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public Student postStudent(
            @ApiParam("firstName") @RequestParam String firstName,
            @ApiParam("lastName") @RequestParam String lastName,
            @ApiParam("perm") @RequestParam int perm) {
        Student student = new Student();
        student.setFirstName(firstName);
        student.setLastName(lastName);
        student.setPerm(perm);

        // OR

        // Student student = Student.builder()
        //         .firstName(firstName)
        //         .lastName(lastName)
        //         .perm(perm)
        //         .build();

        Student savedStudent = studentCollection.save(student);
        return savedStudent;
    }

}
