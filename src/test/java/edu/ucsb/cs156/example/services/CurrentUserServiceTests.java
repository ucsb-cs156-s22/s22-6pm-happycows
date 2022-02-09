package edu.ucsb.cs156.example.services;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;

import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.User;

class CurrentUserServiceTests extends ControllerTestCase {

  @Test
  void test_isLoggedIn_returns_false() {
    CurrentUserService currentUserService = mock(CurrentUserService.class);
    when(currentUserService.getUser()).thenReturn(null);
    assertFalse(currentUserService.isLoggedIn());
  }

  @Test
  void test_isLoggedIn_returns_true() {
    CurrentUserService currentUserService = mock(CurrentUserService.class);
    when(currentUserService.getUser()).thenReturn(User.builder().build());
    assertTrue(currentUserService.isLoggedIn());
  }

}
