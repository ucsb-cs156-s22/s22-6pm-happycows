package edu.ucsb.cs156.example.services;

import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Slf4j
@Service("currentUser")
public class CurrentUserServiceImpl extends CurrentUserService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  GrantedAuthoritiesService grantedAuthoritiesService;

  @Value("${app.admin.emails}")
  final private List<String> adminEmails = new ArrayList<String>();

  public CurrentUser getCurrentUser() {
    CurrentUser cu = CurrentUser.builder()
      .user(this.getUser())
      .roles(this.getRoles())
      .build();
    log.info("getCurrentUser returns {}",cu);
    return cu;
  }

  
  public User getOAuth2AuthenticatedUser(SecurityContext securityContext, Authentication authentication) {
    OAuth2User oAuthUser = ((OAuth2AuthenticationToken) authentication).getPrincipal();
    String email = oAuthUser.getAttribute("email");
    String googleSub = oAuthUser.getAttribute("sub");
    String pictureUrl = oAuthUser.getAttribute("picture");
    String fullName = oAuthUser.getAttribute("name");
    String givenName = oAuthUser.getAttribute("given_name");
    String familyName = oAuthUser.getAttribute("family_name");
    boolean emailVerified = oAuthUser.getAttribute("email_verified");
    String locale = oAuthUser.getAttribute("locale");
    String hostedDomain = oAuthUser.getAttribute("hd");

    java.util.Map<java.lang.String,java.lang.Object> attrs = oAuthUser.getAttributes();
    log.info("attrs={}",attrs);

    Optional<User> ou = userRepository.findByEmail(email);
    if (ou.isPresent()) {
      User u = ou.get();
      if (adminEmails.contains(email) && !u.isAdmin()) {
        u.setAdmin(true);
        userRepository.save(u);
      }
      return u;
    }

    User u = User.builder()
        .googleSub(googleSub)
        .email(email)
        .pictureUrl(pictureUrl)
        .fullName(fullName)
        .givenName(givenName)
        .familyName(familyName)
        .emailVerified(emailVerified)
        .locale(locale)
        .hostedDomain(hostedDomain)
        .admin(adminEmails.contains(email))
        .build();
    userRepository.save(u);
    return u;
  }

  public User getUser() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();

    if (authentication instanceof OAuth2AuthenticationToken) {
      return getOAuth2AuthenticatedUser(securityContext, authentication);
    }
    return null;
  }

  public Collection<? extends GrantedAuthority> getRoles() {
   return grantedAuthoritiesService.getGrantedAuthorities();
  }
}
