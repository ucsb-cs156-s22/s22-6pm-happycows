package edu.ucsb.cs156.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.services.CurrentUserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class ApiController {
  @Autowired
  private CurrentUserService currentUserService;

  protected CurrentUser getCurrentUser() {
    return currentUserService.getCurrentUser();
  }
}
