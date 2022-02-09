package edu.ucsb.cs156.example.controllers;

import org.springframework.context.annotation.Profile;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Profile("development")
@Api(description = "CSRF (enabled only in development; can be used with Postman to test APIs)")
@RestController
public class CSRFController {
  @ApiOperation(value = "Get a CSRF Token")
  @GetMapping("/csrf")
  public CsrfToken csrf(CsrfToken token) {
    return token;
  }
}
