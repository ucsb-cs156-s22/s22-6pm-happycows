package edu.ucsb.cs156.happiercows.services;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.models.CurrentUser;

public abstract class CurrentUserService {
  public abstract User getUser();
  public abstract CurrentUser getCurrentUser();
  public abstract Collection<? extends GrantedAuthority> getRoles();

  public final boolean isLoggedIn() {
    return getUser() != null;
  }

}
